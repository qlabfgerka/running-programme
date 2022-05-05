import { PlanDTO } from '../plan/plan.model';
import { UserDTO } from '../user/user.model';

export class ExerciseDTO {
  id?: string | undefined | null = null;
  name: string | undefined | null = null;
  frequency: number | undefined | null = null;
  currentMinutes: number | undefined | null = null;
  currentSeconds: number | undefined | null = null;
  goalMinutes: number | undefined | null = null;
  goalSeconds: number | undefined | null = null;
  goalDate: Date | undefined | null = null;
  distance: number | undefined | null = null;
  user?: UserDTO | undefined | null = null;
  plans?: Array<PlanDTO> | undefined | null = null;
}
