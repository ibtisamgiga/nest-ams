import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetVendorDto {
  @Transform(({ obj }) => obj.id) //
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => obj.contactNumber)
  @IsNotEmpty()
  @Expose()
  contactNo: string;
  @Transform(({ obj }) => {
    let category = '';
    obj.categories.map((cat) => {
      category = cat.parent.name;
    });
    return category;
  })
  @Expose()
  category: string;

  @Transform(({ obj }) => {
    let sub = '';
    obj.categories.map((cat) => {
      sub = sub + ' ' + cat.name;
    });
    return sub;
  })
  @Expose()
  subCategory: string;

  @Transform(({ obj }) => {
    let spend = 0;
    obj.items.map((item) => {
      spend = spend + parseInt(item.price);
    });
    return spend;
  })
  @Expose()
  totalSpending: number;
}
