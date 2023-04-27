import { Item } from 'src/item/entity/item.entity';
import { Organization } from 'src/organization/entity/organization.entity';
import { Request } from 'src/request/entity/request.entity';
import { User } from 'src/user/entity/user.entity';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  role: string;

  @OneToMany(() => User, (user) => user.roles, { eager: false })
  users: User[];
 
}
