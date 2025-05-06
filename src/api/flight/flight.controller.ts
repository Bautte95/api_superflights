import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { AddPassengerDto } from './dto/add-passanger.dto';

@Controller('api/flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(id);
  }

  @Post(':id')
  addPassenger(
    @Param('id') id: string,
    @Body() addPassengerDto: AddPassengerDto,
  ) {
    return this.flightService.addPassenger(id, addPassengerDto);
  }
}
