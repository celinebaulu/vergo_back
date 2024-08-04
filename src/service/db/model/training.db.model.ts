export interface TrainingDbModel {
  id: string;
  slug: string;
  workout: WorkoutDbModel[];
}

export interface WorkoutDbModel {
  slug: string;
  sets: SetDbModel[];
}

export interface SetDbModel {
  rep?: number;
  slugs?: string[];
  duration?: number;
  rest?: number;
  pause?: number;
  sets?: SetDbModel[];
}