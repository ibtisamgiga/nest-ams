import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './entity/photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async createPhoto(createPhotoDto) {
    console.log(createPhotoDto)
    //const img = this.photoRepository.create(createPhotoDto); 
    return await this.photoRepository.save(createPhotoDto);
  }

  async updatePhoto(updatePhotoDto) {
   const {id,image}=updatePhotoDto
  try{
    const photo=await this.photoRepository.findOne({where:{id}})
    photo.image=image
    return await this.photoRepository.save(photo);}
    catch(error){
      console.log(error)
    }
    //const img = this.photoRepository.create(createPhotoDto); 
    //return await this.photoRepository.save(updatePhotoDto);
  }

}
