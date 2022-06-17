import { TaskStatus } from '../task.model';

export class GetTasksFIlterDto {
  status?: TaskStatus;
  search?: string;
}
