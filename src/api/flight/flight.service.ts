import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { PassengerService } from '../passenger/passenger.service';
import { AddPassengerDto } from './dto/add-passanger.dto';

@Injectable()
export class FlightService {
  constructor(
    @InjectModel(FLIGHT.name) private readonly model: Model<IFlight>,
    private readonly passengersService: PassengerService,
  ) {}

  async create(createFlightDto: CreateFlightDto): Promise<IFlight> {
    const newFlight = new this.model(createFlightDto);
    return await newFlight.save();
  }

  async findAll(): Promise<Array<IFlight>> {
    return await this.model.find().populate('passengers');
  }

  async findOne(id: string): Promise<IFlight | null> {
    return await this.model.findById(id).populate('passengers');
  }

  async update(
    id: string,
    updateFlightDto: UpdateFlightDto,
  ): Promise<IFlight | null> {
    return this.model.findByIdAndUpdate(id, updateFlightDto, { new: true });
  }

  async remove(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'Registro eliminado con éxito.',
    };
  }

  async addPassenger(
    flightId: string,
    { passengerId }: AddPassengerDto,
  ): Promise<IFlight | null> {
    const passenger = await this.passengersService.findOne(passengerId);

    console.log('passenger :>> ', passenger);
    if (!passenger)
      throw new HttpException(
        'El pasajero no fue encontrado',
        HttpStatus.NOT_FOUND,
      );

    return await this.model
      .findByIdAndUpdate(
        flightId,
        { $addToSet: { passengers: passengerId } },
        { new: true },
      )
      .populate('passengers');
  }
}
