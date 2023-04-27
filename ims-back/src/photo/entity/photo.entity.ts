import { Category } from 'src/category/entity/category.entity';
import { Complaint } from 'src/complaint/entity/complaint.entity';
import { Organization } from 'src/organization/entity/organization.entity';
import { User } from 'src/user/entity/user.entity';
import { Vendor } from 'src/vendor/entity/vendor.entity';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @OneToOne(() => User, (user) => user.image, {
    eager: false,onDelete: 'CASCADE'
  })
 user: User;

 @OneToOne(() => Organization, (organization) => organization.image, {
    eager: false,
  })
 organization: Organization;
 @ManyToOne(() => Complaint, (complaint) => complaint.images, {
    eager: false,onDelete: 'CASCADE'
  })
  complaint:Complaint;
//   @Column()
//  UserId: number;

}
