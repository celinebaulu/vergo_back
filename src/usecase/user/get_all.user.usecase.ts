import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';

export class GetAllUserUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(): Promise<UserUsecaseModel[]> {
    return await this.inversify.bddService.getAllUser();
  }
}
