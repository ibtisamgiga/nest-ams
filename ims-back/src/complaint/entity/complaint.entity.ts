import { IsEmail } from 'class-validator';
import { Photo } from 'src/photo/entity/photo.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @CreateDateColumn({type:'date'})
  submissionDate: Date;

  @Column({default:'some-title'})
  title: string;

  @Column({default:'Pending'})
  status: string;
  // @Column()
  // images: string;
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.compalints, {
    eager:false,onDelete: 'CASCADE'
  })
  user:User;
  
  @Column()
  userId: number;

  @OneToMany(() =>Photo, (photo) => photo.complaint, { eager: false ,onDelete: 'CASCADE'})
  images: Photo[];

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP'})
  created_at: Date;
}
