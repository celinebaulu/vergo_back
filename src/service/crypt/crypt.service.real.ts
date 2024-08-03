import * as cryp_sha256 from 'crypto-js/sha256';
import * as cryp_sbase64 from 'crypto-js/enc-base64';
import * as cryp_shmacSHA512 from 'crypto-js/hmac-sha512';

import { config } from '@src/config';
import { CryptService } from '@service/crypt/crypt.service';
import { CryptServiceDto } from '@service/crypt/dto/crypt.service.dto';

export class CryptServiceReal implements CryptService {
  crypt(dto: CryptServiceDto): string {
    const hashDigest = cryp_sha256('vergo' + dto.message);
    const hmacDigest = cryp_sbase64.stringify(
      cryp_shmacSHA512(hashDigest, dto.secret ?? config.jwt.secret),
    );
    return hmacDigest;
  }
}
