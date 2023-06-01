import {
  IsNotEmpty,
  IsPhoneNumber,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUniqueContactNo', async: false })
export class IsUniqueContactNo implements ValidatorConstraintInterface {
  validate(contactNo: string, args: ValidationArguments) {
    // Add your logic to check if the contactNo is unique
    // You can perform a database query or any other method of checking uniqueness

    const isUnique = true; // Replace this with your actual uniqueness check

    if (!isUnique) {
      // Set a custom error message if the contactNo is not unique
      args.constraints[0].message = 'Contact number must be unique.';
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Contact number must be unique.';
  }
}
