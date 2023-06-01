import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Request } from './entity/request.entity';
import { ItemService } from 'src/modules/item/item.service';
import { UpdateItemDto } from 'src/modules/item/dtos/update-item.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { AssiginItemDto } from 'src/modules/item/dtos/assign-item.dto';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
    private itemService: ItemService,
  ) {}

  async createRequest(createRequestDto: CreateRequestDto, user: User) {
    const { description, requestType, itemId } = createRequestDto;
    const request = this.requestRepository.create({
      ...createRequestDto,
      userId: user.id,
    });
    try {
      if (requestType === 'Faulty') {
        const item = await this.itemService.getItem(itemId, user);

        await this.itemService.updateItem(
          itemId,
          { ...item, faulty: true },
          user,
        );
      }
      return await this.requestRepository.save(request);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getRequests(user: User, type) {
    const id = user.roles.role == 'employee' ? user.id : null;
    return await this.requestRepository.find({
      relations: ['item', 'item.category.parent', 'user'], //'vendor.categories'
      where: {
        item: { category: { organizationId: user.organizationId } },
        requestType: type,
        user: { id },
      },
      order: { created_at: 'DESC' },
    });
  }

  async getRequest(id: number, user: User) {
    return await this.requestRepository.findOne({
      relations: ['item', 'item.category.parent', 'user'], //'vendor.categories'
      where: { id },
    });
  }

  async updateRequest(id: number, attrs: UpdateRequestDto, currentUser: User) {
    attrs.action_by = currentUser.name;
    const request = await this.requestRepository.findOneBy({ id });
    if (!request) {
      throw new NotFoundException('request Not Found');
    }
    Object.assign(request, attrs);
    if (request.requestType == 'Acquisition' && attrs.status == 'Approved') {
      const body: AssiginItemDto = {
        userId: request.userId,
      };
      await this.itemService.assiginItem(request.itemId, body, currentUser);
    }
    if (request.requestType == 'Faulty' && attrs.status == 'Approved' && attrs.type=='Replace') {
      await this.itemService.unAssiginItem(request.itemId, currentUser);
    }
    return {
      item: await this.requestRepository.save(request),
      message: 'request Updated',
    };
  }
}
