import * as mongoDB from 'mongodb';

import { config } from '@src/config';
import inversify from '@src/inversify/investify';
import { BddService } from '@service/db/db.service';
import { CreateUserDbDto } from '../dto/create.user.db.dto';

export class BddServiceTestMongo
  implements Pick<BddService, 'test' | 'initConnection'>
{
  async initConnection() {
    const clientMongo = new mongoDB.MongoClient(config.db.connection_string);
    await clientMongo.connect();
    inversify.mongo = clientMongo.db(config.db.name);
    inversify.loggerService.log(
      'info',
      `Successfully connected to database: ${inversify.mongo.databaseName}`,
    );

    const admin = await inversify.bddService.getUser({
      code: 'admin',
    });
    if (!admin) {
      const user: CreateUserDbDto = {
        code: 'admin',
        password:
          'uDLybl8FgPRbBicleIp/Hbb7ujedTr5gukZlcygGnYz4zyJsMAAdL0WEwxfwO6+1jI93qSR676s2QuyuKVD57w==',
        name_first: 'admin',
        name_last: 'admin',
        description: 'password avec le secret secretKey',
        mail: 'admin',
      };
      await inversify.bddService.createUser(user);
    }
  }

  async test(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
