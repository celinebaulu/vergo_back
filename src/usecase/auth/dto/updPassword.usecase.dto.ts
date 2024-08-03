import { UpdPasswordAuthResolverDto } from '@presentation/auth/dto/updPassword.auth.resolver.dto';

export interface UpdPasswordAuthUsecaseDto extends UpdPasswordAuthResolverDto {
  user_id: string;
}
