import { DecodeEncodeServiceDto } from '@service/encode/dto/decode.encode.service.dto copy';
import { EncodeEncodeServiceDto } from '@service/encode/dto/encode.encode.service.dto';

export interface EncodeService {
  encode(dto: EncodeEncodeServiceDto): string;
  decode(dto: DecodeEncodeServiceDto): string;
}
