export type questionForm = {
  id: number;
  question: string;
  answers: string[];
};

export type form = {
  content: questionForm[];
  labels: string[];
};
