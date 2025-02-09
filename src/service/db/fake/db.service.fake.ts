import { applyMixins } from '@src/common/applyMixins';
import { BddServiceUserFake } from '@service/db/fake/db.service.user.fake';
import { BddServiceTestFake } from '@service/db/fake/db.service.test.fake';
import { BddServicePasskeyFake } from '@service/db/fake/db.service.passkey.fake';
import { BdbServiceTrainingFake } from '@service/db/fake/db.service.training.fake';

class BddServiceFake {}

applyMixins(BddServiceFake, [
  BddServiceUserFake,
  BddServiceTestFake,
  BddServicePasskeyFake,
  BdbServiceTrainingFake,
]);

export { BddServiceFake };
