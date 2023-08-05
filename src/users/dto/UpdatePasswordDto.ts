import { IsString, IsNotEmpty } from 'class-validator';
import { UpdatePasswordModel } from '../model/UpdatePasswordModel';
import { ApiProperty } from '@nestjs/swagger';
export class UpdatePasswordDto implements UpdatePasswordModel {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'oldPassword' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'newPassword' })
  newPassword: string;
}
