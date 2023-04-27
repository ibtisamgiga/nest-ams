import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateRequestDto } from './dtos/create-request.dto';
import { Request } from './entity/request.entity';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,
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
      return await this.requestRepository.save(request);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
  async getRequests(user: User) {
    return await this.requestRepository.find({
      relations: ['item', 'item.category.parent', 'user'], //'vendor.categories'
      where: { item: { category: { organizationId: user.organizationId } } },
    });
  }
  async getRequestById(id: number, user: User) {
    return await this.requestRepository.findOne({
      relations: ['category', 'category.parent', 'user'], //'vendor.categories'
      where: { id },
      //where: {id, category: { organizationId: user.organizationId } },
    });
  }
}
