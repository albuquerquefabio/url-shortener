import { IsUrl, IsString } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  original!: string;

  @IsString()
  short?: string;
}
