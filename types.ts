
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string;
  image: string;
  icon: string;
  color: string;
  github?: string;
  gitlab?: string;
  demo: string;
}

export interface Skill {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
