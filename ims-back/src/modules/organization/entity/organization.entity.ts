import { IsEmail } from 'class-validator';
import { Category } from 'src/modules/category/entity/category.entity';
import { Department } from 'src/modules/department/entity/department.entity';
import { Photo } from 'src/modules/photo/entity/photo.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
//@Unique(['name'])
  name: string;

  @Column()
  @Unique(['email'])
  @IsEmail()
  email: string;

  @Column()
  repName: string;

  @Column()
  //@Unique(['repContactNo'])
  repContactNo: string;

  @Column()
  address: string;
  @Column()
  city: string;
  @Column()
  zip: string;
  @Column()
  country: string;
  @Column()
  bio: string;
  @OneToOne(() => Photo, (photo) => photo.organization, {
    eager: true,
  })
   @JoinColumn()
 image: Photo;
//  @Column({nullable:true})
//  imageId:number
  @OneToMany(() => User, (user) => user.organization)
  users: User[];
  @OneToMany(() => Department, (department) => department.organization)
  departments: Department[];

  @OneToMany(() => Category, (category) => category.organization, { eager: false })
  categories: Category[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;

}
//crete org dto

// taskEntity
// @ManyToOne(()=>User,(user)=>user.tasks,{eager:false})
// user:User
// //using function ()=>Report
// //as result of circular dependency

// @Column()
// userId:number

// // userENtity
// @OneToMany(()=>Task,(task)=>task.user,{eager:true})
// tasks:Task[]
