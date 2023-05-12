import { IsEmail } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/modules/organization/entity/organization.entity';
import { Complaint } from 'src/modules/complaint/entity/complaint.entity';
import { Item } from 'src/modules/item/entity/item.entity';
import { Request } from 'src/modules/request/entity/request.entity';
import { Role } from '../decorators/user-role.decorator';
import { RoleEntity } from 'src/modules/role/entity/role.entity';
import { Exclude } from 'class-transformer';
import { Photo } from 'src/modules/photo/entity/photo.entity';
import { Department } from 'src/modules/department/entity/department.entity';

@Entity()
// @Unique(['email','privateEmail'])
//@Index(['email','privateEmail'], { unique: true })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Unique(['email'])
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Photo, (photo) => photo.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  image: Photo;

  // @Column({ nullable: true })
  // image: string;

  @Column({ nullable: true })
  // @Unique(['privateEmail'])
  @IsEmail()
  privateEmail: string;

  @Column({ nullable: true })
  @Unique(['contactNo'])
  contactNo: string;
  @ManyToOne(() => Organization, (organization) => organization.users, {
    eager: false,
    onDelete: 'CASCADE',
  })
  organization: Organization;

  @Column({ nullable: true })
  organizationId: number;
  //^[0-9]+$
  // @Column()
  // role: string;
  @Column({ default: '-' })
  education: string;

  @Column({ default: '-' })
  designation: string;

  @Column({ default: '-' })
  totalExp: string;

  @Column({ default: '-' })
  compExp: string;

  @ManyToOne(() => RoleEntity, (role) => role.users, {
    eager: true,
    onDelete: 'CASCADE',
  })
  roles: RoleEntity;

  @Column({ nullable: true })
  rolesId: number;

  @OneToMany(() => Complaint, (complaint) => complaint.user, {
    eager: false,
    onDelete: 'CASCADE',
  })
  compalints: Complaint[];

  @OneToMany(() => Item, (item) => item.user, {
    eager: false,
    onDelete: 'CASCADE',
  })
  items: Item[];

  @OneToMany(() => Request, (request) => request.user, {
    eager: false,
    onDelete: 'CASCADE',
  })
  requests: Request[];

  @ManyToOne(() => Department, (department) => department.users, {
    onDelete: 'CASCADE',
  })
  department: Department;

  @Column({ nullable: true })
  departmentId: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  //function to validate encrypted password
  async validatePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}

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
