import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetCategoryDto {
  @Transform(({ obj }) => obj.id) //
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj?.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => obj?.parent?.name)
  @IsNotEmpty()
  @Expose()
  parent: string;

  @Transform(({ obj }) => {
    let arr = [];

    let v_name = '';
    let itemCount = 0;
    let assigined = 0;
    let faulty = 0;
    obj.vendors.map((vendor) => {
      v_name = vendor.name + ', ' + v_name;
    });
    obj.items.map((item) => {
      itemCount = itemCount + 1;

      if (item.assigned_to == true) {
        assigined = assigined + 1;
      }
      if (item.faulty == true) {
        faulty = faulty + 1;
      }
    });
    const data = {
      quantity: itemCount,
      assigined,
      unAssigned: itemCount - assigined,
      faulty,
    };

    return data;
  })
  @Expose()
  count: {};

  @Transform(({ obj }) => obj?.vendors) //
  @Expose()
  vendors: [];

  @Transform(({ obj }) => obj?.children) //
  @Expose()
  subcategories: [];
}
