import { Category } from 'src/category/entity/category.entity';
import { Request } from 'src/request/entity/request.entity';
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
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  serialNumber: string;

  @Column()
  description: string;

  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.items, {
    eager: false,
  })
  vendor: Vendor;

  @Column({nullable:true})
  vendorId: number;

  @ManyToOne(() => Category, (category) => category.items, {
    eager: false,
    onDelete: 'CASCADE',
  })
  category: Category;

  @Column()
  categoryId: number;

  @ManyToOne(() => User, (user) => user.items, {
    eager: false,
  })
  user: User;

  @Column({ nullable: true })
  userId: number;

  @Column({ default: false, nullable: true })
  assigned_to: boolean;

  @Column({ default: false})
  faulty: boolean;

  @Column({ nullable: true })
  assigned_by: string;

  @Column({ type: 'date', nullable: true })
  assigined_at: Date;

  @OneToMany(() => Request, (request) => request.item,{
    onDelete: 'CASCADE',
  })
  requests: Request[];
  
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
