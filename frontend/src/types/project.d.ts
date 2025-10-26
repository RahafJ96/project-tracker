export type Status = "planning" | "active" | "paused" | "done";

export interface Project {
  id: number;
  title: string;
  description: string;
  status: Status;
  created_at: string;
}
