import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserMongo } from '@service/db/mongo/db.service.user.mongo';
import { BddServiceTestMongo } from '@service/db/mongo/db.service.test.mongo';
import { BddServicePasskeyMongo } from '@src/service/db/mongo/db.service.passkey.mongo';
import { BddServiceTrainingMongo } from './db.service.training.mongo';

class BddServiceMongo {}

applyMixins(BddServiceMongo, [
  BddServiceUserMongo,
  BddServiceTestMongo,
  BddServicePasskeyMongo,
  BddServiceTrainingMongo,
]);

export { BddServiceMongo };
