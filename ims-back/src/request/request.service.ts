import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Request } from './entity/request.entity';
import { ItemService } from 'src/item/item.service';
import { UpdateItemDto } from 'src/item/dtos/update-item.dto';
import { UpdateRequestDto } from './dtos/update-request.dto';
import { AssiginItemDto } from 'src/item/dtos/assign-item.dto';

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
      itemId,
      description,
      requestType,
      userId: user.id,
    });

    try {
      if (requestType == 'Faulty') {
        const item = await this.itemService.getItemById(itemId, user);
        const body: UpdateItemDto = {
          name: item.name,
          serialNumber: item.serialNumber,
          description: item.description,
          vendorId: item.vendorId,
          categoryId: item.categoryId,
          price: item.price,
          faulty: true,
        };
        await this.itemService.updateItem(itemId, body, user);
        return await this.requestRepository.save(request);
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
    });
  }
  async getReturns(user: User) {
    return await this.requestRepository.find({
      relations: ['item', 'item.category.parent', 'user'], //'vendor.categories'
      where: {
        item: { category: { organizationId: user.organizationId } },
        requestType: 'aulty',
      },
    });
  }
  async getRequestById(id: number, user: User) {
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

    return {
      item: await this.requestRepository.save(request),
      message: 'request Updated',
    };
  }
}
