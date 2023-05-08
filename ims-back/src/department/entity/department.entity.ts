import { Category } from 'src/category/entity/category.entity';
import { Organization } from 'src/organization/entity/organization.entity';
import { User } from 'src/user/entity/user.entity';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  contactNo: string;

  @ManyToOne(() => Organization, (organization) => organization.departments, {
    eager: false,
  })
  organization: Organization;

  @Column()
  organizationId: number;

  @OneToMany(() => User, (user) => user.department, {
    eager: false,
    onDelete: 'CASCADE',
  }) //onDelete: 'CASCADE'
  users: User[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
