export interface Learning {
  id: string;
  title: string;
  url: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  language: string;
  code: string;
  commentary: string;
  timeComplexity?: string;
  spaceComplexity?: string;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  learnings: Learning[];
}

export interface DataStructure {
  sections: Section[];
}
