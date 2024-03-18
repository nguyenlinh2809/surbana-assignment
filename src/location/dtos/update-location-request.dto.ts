import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationRequestDto } from './create-location-request.dto';

export class UpdateLocationRequestDto extends PartialType(
  CreateLocationRequestDto,
) {}
