import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entity/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private roleRepository: Repository<RoleEntity>,
  ) {}

  async getRole(role: string) {
    const currentRole = await this.roleRepository.findOne({
      where: { role }, // user: { role: role, organizationId }
    });
    if (!currentRole) throw new NotFoundException('role Not Found');
    return currentRole.id;
  }
}
