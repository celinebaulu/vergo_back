import { Inversify } from '@src/inversify/investify';
import { TrainingUsecaseModel } from '@usecase/training/model/training.usecase.model';

export class GetTrainingsUsecase {
  inversify: Inversify;

  constructor(inversify: Inversify) {
    this.inversify = inversify;
  }

  async execute(): Promise<TrainingUsecaseModel[]> {
    const entities: TrainingUsecaseModel[] =
      await this.inversify.bddService.getTrainings();
      
    return entities;
  }
}
