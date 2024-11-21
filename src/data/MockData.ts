import { formField, formData, formPage } from "@/types/FormData";
const mockFields: formField[] = [
  {
    id: 0,
    label: "Hvilken bransje tilhører organisasjonen?",
    information: "Du kan velge flere som passer",
    type: "multiselect",
    options: [
      "Helse og omsorg",
      "Utdanning og forskning",
      "Teknologi og IT",
      "Salg og service",
      "Bygg og anlegg",
      "Kultur og underholdning",
      "Finans og forsikring",
      "Landbruk og naturforvaltning",
      "Produksjon og industri",
      "Offentlig sektor",
      "Transport og logistikk",
      "Varehandel og tjenester",
      "Frivillig organisasjon",
      "Annet",
    ],
  },
  {
    id: 1,
    label: "Hvor stort er teamet?",
    information: "Velg antall personer",
    type: "slider",
    options: ["Mindre enn 10", "11-30", "31-50", "51-100", "Mer enn 100"],
  },
  {
    id: 2,
    label: "Hvilken av følgende beskriver best din rolle?",
    information: "Du kan velge flere som passer",
    type: "multiselect",
  },
  {
    id: 3,
    label: "Hva blir du målt på?",
    type: "text",
  },
  {
    id: 4,
    label: "Hva er dine mål?",
    type: "text",
  },
  {
    id: 5,
    label: "Hva kreves for at du gjør en god jobb?",
    type: "text",
  },
  {
    id: 6,
    label: "Hvor komfortabel er du med digitale verktøy?",
    type: "text",
  },
  {
    id: 7,
    label: "Hva er dine utfordringer?",
    type: "text",
  },
  {
    id: 8,
    label: "Hvilke verktøy bruker du/dere?",
    type: "multiselect",
  },
];
const mockPages: formPage[] = [
  {
    id: 0,
    aiGenerated: false,
    generateQuestions: false,
    fields: [mockFields[0]],
  },
  {
    id: 1,
    aiGenerated: false,
    generateQuestions: false,
    fields: [mockFields[1]],
  },
  {
    id: 2,
    aiGenerated: true,
    generateQuestions: true,
    requirements:
      "- Create probable answer options based on the information about field of work and team size. For example, this means that you should not include 'teacher' when the field is 'health care'.\\n- Do NOT simply insert the answers into the question. Use creativity to infer details about the user's role or organization. The number of people should NOT be included in the question! The field of work should NOT be included in the question!\\n- Return the question in this JSON format:",
    fields: [mockFields[2]],
  },
  {
    id: 3,
    aiGenerated: true,
    generateQuestions: true,
    requirements:
      "- Ensure each question provides meaningful insights about the user's role and organization.\\n- Use the user's previous answers to personalize the questions.\\n- For each question, return a JSON object in this format:",
    fields: [mockFields[3], mockFields[4], mockFields[5]],
  },
  {
    id: 4,
    aiGenerated: false,
    generateQuestions: false,
    fields: [mockFields[6]],
  },
  {
    id: 5,
    aiGenerated: true,
    generateQuestions: true,
    requirements:
      "- Ensure the question provides meaningful insights about the user's challenges.\\n- Use the user's previous answers to personalize the question.\\n- Return the question in this JSON format:",
    fields: [mockFields[7]],
  },
  {
    id: 6,
    aiGenerated: true,
    generateQuestions: true,
    requirements:
      "- Ensure the question provides meaningful insights about the user's success criteria.\\n- Use the user's previous answers to personalize the question.\\n- Return the question in this JSON format:",
    fields: [mockFields[8]],
  },
];
const mockData: formData = {
  currentFormPage: 1,
  formPages: mockPages,
};
export default mockData;
