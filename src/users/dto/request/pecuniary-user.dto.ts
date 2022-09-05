import { IsNumber } from 'class-validator'

export class PecuniaryUserDto {
  @IsNumber()
  pecuniary: number;
}
