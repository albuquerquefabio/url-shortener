import { IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsUrl()
  original!: string;
}
