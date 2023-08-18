import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AccessDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'string' })
  accessToken: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'string' })
  refreshToken: string;
}
