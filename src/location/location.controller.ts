import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Location } from './entities/location.entity';
import { LocationService } from './location.service';
import { CreateLocationRequestDto } from './dtos/create-location-request.dto';
import { UpdateLocationRequestDto } from './dtos/update-location-request.dto';
import { FormatResponseInterceptor } from 'src/format-response.interceptor';

@Controller('locations')
@UsePipes(ValidationPipe)
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  @UseInterceptors(FormatResponseInterceptor)
  getAll(): Promise<Location[]> {
    return this.locationService.getAll();
  }

  @Post()
  @UseInterceptors(FormatResponseInterceptor)
  create(
    @Body()
    createLocationRequestDto: CreateLocationRequestDto,
  ): Promise<Location> {
    return this.locationService.create(createLocationRequestDto);
  }

  @Get(':id')
  @UseInterceptors(FormatResponseInterceptor)
  getById(@Param('id', ParseIntPipe) id: number): Promise<Location> {
    return this.locationService.getById(id);
  }

  @Get('children/:id')
  @UseInterceptors(FormatResponseInterceptor)
  getAllChildren(@Param('id', ParseIntPipe) id: number): Promise<Location[]> {
    return this.locationService.getAllChildren(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLocationRequestDto: UpdateLocationRequestDto,
  ): Promise<{ message: string }> {
    return this.locationService.update(id, updateLocationRequestDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.locationService.delete(id);
  }
}
