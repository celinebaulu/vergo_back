import { GeneratePasswordServiceDto } from '@service/password/dto/generate.password.service.dto';

export interface PasswordService {
  generate(dto: GeneratePasswordServiceDto): string;
}
