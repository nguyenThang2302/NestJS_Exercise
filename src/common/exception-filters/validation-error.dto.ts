import { ApiProperty } from '@nestjs/swagger';

export class ValidationErrorDTO {
  @ApiProperty()
  readonly statusCode: number;

  @ApiProperty()
  readonly message: string[];

  constructor(statusCode: number, message: string[]) {
    this.statusCode = statusCode;
    this.message = message;
  }
}
