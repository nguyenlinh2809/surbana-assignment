import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateLocationRequestDto {
  @IsString()
  @IsNotEmpty()
  building: string;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsString()
  @IsNotEmpty()
  locationNumber: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsOptional()
  @IsNotEmpty()
  parentId: number;
}
