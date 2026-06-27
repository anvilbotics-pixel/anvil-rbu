export type Member = {
  id: string;
  name: string;
  role: string;
  track: string;
  year: string;
  bio: string | null;
  github: string | null;
  linkedin: string | null;
  created_at: string;
};

export type Project = {
  id: string;
  name: string;
  codename: string;
  status: "active" | "paused" | "complete";
  track: string;
  lead: string;
  description: string;
  created_at: string;
};

export type ProjectLog = {
  id: string;
  project_id: string;
  author: string;
  entry: string;
  tag: "kickoff" | "update" | "milestone" | "blocker" | "fix" | "note";
  created_at: string;
  project?: Project;
};

export type ForgeIdea = {
  id: string;
  title: string;
  author: string;
  affiliation: string | null;
  tags: string[];
  description: string;
  contact: string | null;
  approved: boolean;
  created_at: string;
};
