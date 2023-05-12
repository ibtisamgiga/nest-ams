import { Item } from 'src/modules/item/entity/item.entity';
import { Organization } from 'src/modules/organization/entity/organization.entity';
import { Request } from 'src/modules/request/entity/request.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Vendor } from 'src/modules/vendor/entity/vendor.entity';
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
