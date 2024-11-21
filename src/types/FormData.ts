export type form = {
  title: string;
  icon: JSX.Element;
};

export type formData = {
  currentFormPage: number;
  formPages: formPage[];
};

export type formPage = {
  id: number;
  aiGenerated: boolean;
  generateQuestions?: boolean;
  requirements?: string;
  fields: formField[];
};

export type formField = {
  id: number;
  requirements?: string;
  label: string;
  information?: string;
  type: "multiselect" | "slider" | "text";
  value?: any;
  options?: string[];
};
