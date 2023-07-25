import { IsString, IsNotEmpty } from 'class-validator';
import { UpdatePasswordModel } from 'src/users/model/UpdatePasswordModel';
export class UpdatePasswordDto implements UpdatePasswordModel {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
