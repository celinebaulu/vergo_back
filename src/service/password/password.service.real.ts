import { PasswordService } from '@service/password/password.service';
import { GeneratePasswordServiceDto } from '@service/password/dto/generate.password.service.dto';

export class PasswordServiceReal implements PasswordService {
  generate(dto: GeneratePasswordServiceDto): string {
    const lowercases = 'abcdefghijkmnopqrstuvwxyz';
    const uppercases = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialsCaracters = '?!%$&#@_-+=*/';
    let all;
    if (dto.specials) {
      all = lowercases + uppercases + numbers + specialsCaracters;
    } else {
      all = lowercases + uppercases + numbers;
    }
    let result = '';
    for (let i = 0; i < dto.length; i++) {
      const position = Math.floor(Math.random() * all.length);
      result += all.substr(position, 1);
    }

    return result;
  }
}
