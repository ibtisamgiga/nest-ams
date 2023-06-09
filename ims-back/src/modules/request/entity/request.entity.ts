import { Category } from 'src/modules/category/entity/category.entity';
import { Item } from 'src/modules/item/entity/item.entity';
import { User } from 'src/modules/user/entity/user.entity';
import { Vendor } from 'src/modules/vendor/entity/vendor.entity';
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
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  requestType: string;

  @Column({ default: '-'  })
  type: string;

  @Column({ default: '-' })
  action_by: string;

  @Column({ default: 'Pending' })
  status: string;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => User, (user) => user.requests, {
    eager: false,onDelete:'CASCADE'
  })
  user: User;
  @Column()
  userId: number;

  @ManyToOne(() => Item, (item) => item.requests, {
    eager: false,
    onDelete: 'CASCADE'
  })
  item: Item;
  @Column()
  itemId: number;
}
