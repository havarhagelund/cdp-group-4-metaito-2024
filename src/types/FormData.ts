interface FormData {
    formPages: FormPage[];
}
interface FormPage {
    id: number;
    aiGenerated: boolean;
    generateQuestions?: boolean;
    requirements?: string;
    fields: FormField[];
}
interface FormField {
    id: number;
    requirements?: string;
    label: string;
    information?: string;
    type: "multiselect" | "slider" | "text";
    value?: any;
    options?: string[];
}
export type { FormData, FormPage, FormField };