import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlightDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  pilot: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  airplane: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  destinationCity: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  flightDate: Date;
}
