import { CryptServiceDto } from '@service/crypt/dto/crypt.service.dto';

export interface CryptService {
  crypt(dto: CryptServiceDto): string;
}
