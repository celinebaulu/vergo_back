import { Module } from '@nestjs/common';

import inversify from '@src/inversify/investify';
import { UserResolver } from '@presentation/user/user.resolver';

@Module({
  imports: [],
  providers: [
    UserResolver,
    {
      useValue: inversify,
      provide: 'Inversify',
    },
  ],
})
export class UserModule {}
