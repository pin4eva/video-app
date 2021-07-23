import { ApiProperty } from '@nestjs/swagger';

export class CreateUserInput {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class LoginWithEmailDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
