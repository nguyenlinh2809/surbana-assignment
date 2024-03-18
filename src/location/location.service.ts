import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Repository } from 'typeorm';
import { CreateLocationRequestDto } from './dtos/create-location-request.dto';
import { UpdateLocationRequestDto } from './dtos/update-location-request.dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async getAll(): Promise<Location[]> {
    this.logger.log('getAll is triggered');
    this.locationRepository.find();
    return await this.locationRepository.find();
  }

  async create(
    createLocationRequestDto: CreateLocationRequestDto,
  ): Promise<Location> {
    this.logger.log(
      `create location is triggered, body: ${JSON.stringify(createLocationRequestDto)}`,
    );
    return this.locationRepository.save(createLocationRequestDto);
  }

  async getById(id: number): Promise<Location> {
    this.logger.log('getById is triggered');
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      this.logger.error(`Location with id: ${id} is not found!`);
      throw new NotFoundException(`Location with id: ${id} is not found!`);
    }
    return location;
  }

  async getAllChildren(id: number): Promise<Location[]> {
    this.logger.log(`getAllChildren is triggered with id: ${id}`);
    const query = `WITH RECURSIVE cte AS (
      SELECT *
      FROM "location" AS al 
      WHERE id = $1
      UNION ALL
      SELECT loc.*
      FROM "location" AS loc
      JOIN cte on cte.id = loc."parentId"
    )
    SELECT * FROM cte`;
    return await this.locationRepository.query(query, [id]);
  }

  async update(
    id: number,
    updateLocationRequestDto: UpdateLocationRequestDto,
  ): Promise<{ message: string }> {
    this.logger.log(
      `update location with ${id} is triggered, body: ${JSON.stringify(updateLocationRequestDto)}`,
    );
    const location = await this.locationRepository.findOne({ where: { id } });
    if (!location) {
      this.logger.error(`Location with id: ${id} is not found!`);
      throw new NotFoundException(`Location with id: ${id} is not found!`);
    }

    const result = await this.locationRepository.update(
      id,
      updateLocationRequestDto,
    );
    if (result.affected >= 1) {
      this.logger.log(`Update location with id ${id} successfully!`);
      return { message: `Update location with id ${id} successfully!` };
    }
    this.logger.error(`Update location with id ${id} failed!`);
    throw new InternalServerErrorException();
  }

  async delete(id: number) {
    this.logger.log('delete is triggered');
    const locationWithChildren = await this.getAllChildren(id);
    if (locationWithChildren.length) {
      await this.locationRepository.remove(locationWithChildren);
      this.logger.log(`Delete location with id ${id} successfully!`);
      return { message: `Delete location with id ${id} successfully!` };
    }
    this.logger.error(`Delete location with id ${id} failed!`);
    throw new InternalServerErrorException();
  }
}
