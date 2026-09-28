export interface Profile {
  id: string;
  name: string | null;
  title: string | null;
  intro: string | null;
  about: string | null;
  career_goals: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  avatar_url: string | null;
  resume_url: string | null;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}
