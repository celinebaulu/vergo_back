import { Inversify } from '@src/inversify/investify';
import { UserUsecaseModel } from '@usecase/user/model/user.usecase.model';
import { GetUserUsecaseDto } from '@usecase/user/dto/get.user.usecase.dto';
import { UserDbModel } from '../../service/db/model/user.db.model';
import { ERRORS } from '../../common/ERROR';

export class GetUserUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(dto: GetUserUsecaseDto): Promise<UserUsecaseModel> {
    const entity: UserDbModel = await this.inversify.bddService.getUser(dto);

    if (!entity) {
      throw new Error(ERRORS.GET_USER_USECASE_USER_NOT_FOUND);
    }

    return entity;
  }
}
