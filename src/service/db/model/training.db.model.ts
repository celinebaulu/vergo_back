export interface TrainingDbModel {
  id: string;
  label: string;
  workout: WorkoutDbModel[];
}

export interface WorkoutDbModel {
  label: string;
  sets: SetDbModel[];
}

export interface SetDbModel {
  rep?: number;
  series?: string[];
  duration?: number;
  rest?: number;
  pause?: number;
  sets?: SetDbModel[];
}