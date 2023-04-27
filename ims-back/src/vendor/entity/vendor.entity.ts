import { Category } from 'src/category/entity/category.entity';
import { Item } from 'src/item/entity/item.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactNumber:string
  
  @ManyToMany(() => Category, category => category.vendors)
  categories: Category[];

  @OneToMany(() => Item, (item) => item.vendor, { eager: false })
  items: Item[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;


}
