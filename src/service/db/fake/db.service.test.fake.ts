import { BddService } from '@service/db/db.service';

export class BddServiceTestFake implements Pick<BddService, 'test'> {
  test(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
