//@Transform(({obj})=>obj.user.id)

import { Expose, Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class GetCategoriesDto {
  @Transform(({ obj }) => obj.id) //
  @Expose()
  @IsNumber()
  id: number;

  @Transform(({ obj }) => obj?.name)
  @IsNotEmpty()
  @Expose()
  name: string;

  @Transform(({ obj }) => {
    let subcat = 0;
    obj.children.map((item) => {
      subcat = subcat + 1;
    });
    return subcat;
  })
  @Expose()
  numberOfSubcat: number;

  @Transform(({ obj }) => {
    let v = 0;
    let vendorArr = [];
    obj.children.map((item) => {
      item.vendors.map((a) => {
        if (!vendorArr.includes(a.name)) {
          v = v + 1;
          vendorArr.push(a.name);
        }
      });
    });
    return v;
  })
  @Expose()
  numberOfvendors: number;

  @Transform(({ obj }) => {
    let arr = [];
    obj.children.map((subCat) => {
      let v_name = '';
      let itemCount = 0;
      let assigined = 0;
      let unAssigned = 0;
      let faulty = 0;
      //let id=null
      subCat.vendors.map((vendor) => {
        v_name = vendor.name + ', ' + v_name;
      });
      subCat.items.map((item) => {
        itemCount = itemCount + 1;

        if (item.assigned_to == true) {
          assigined = assigined + 1;
        }
        if (item.faulty == true) {
          faulty = faulty + 1;
        }
      });
      const obj = {
        name: subCat.name,
        vendorName: v_name,
        quantity: itemCount,
        assigined,
        unAssigned: itemCount - assigined,
        faulty,
        id: subCat.id,
      };
      arr.push(obj);
    });

    return arr;
  })
  @Expose()
  subCat: [];
}
