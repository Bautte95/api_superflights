import { Document } from 'mongoose';
import { IPassenger } from './passenger.interface';

export interface IFlight extends Document {
  pilot: string;
  airplane: string;
  destinationCity: string;
  flightDate: Date;
  passengers: Array<IPassenger>;
}
