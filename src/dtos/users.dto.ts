import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;
}

export class CreatedUser {
  public id: Number;

  @IsEmail()
  public email: string;

  @IsString()
  public walletId: string;

  @IsString()
  public username: string;
}
