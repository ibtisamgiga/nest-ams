import { Item } from 'src/modules/item/entity/item.entity';
import { Organization } from 'src/modules/organization/entity/organization.entity';
import { Request } from 'src/modules/request/entity/request.entity';
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
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  @ManyToOne(() => Category, (category) => category.children,{onDelete: 'CASCADE'})
  parent: Category;

  @ManyToOne(() => Organization, (organization) => organization.categories, {
    eager: false,onDelete:'CASCADE'
  })
  organization: Organization;

  @Column()
  organizationId: number;

  @ManyToMany(() => Vendor, (vendor) => vendor.categories)
  @JoinTable()
  vendors: Vendor[];

  @OneToMany(() => Item, (item) => item.category, { eager: false })
  items: Item[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
