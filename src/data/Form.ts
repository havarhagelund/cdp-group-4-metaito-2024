import { form, questionForm } from "../types/form";
export const formData: form = {
  content: [
    {
      id: 1,
      question: "Hva er din bedrift?",
      answers: ["Teknologi"],
    },
    {
      id: 2,
      question: "Hva mange er dere?",
      answers: [
        "1-5 personer",
        "6-10 personer",
        "11-20 personer",
        "21-50 personer",
        "Mer enn 50 personer",
      ],
    },
    {
      id: 3,
      question: "Hvem er du?",
      answers: [
        "Utvikling og teknologi",
        "Produktutvikling",
        "Prosjektledelse",
      ],
    },
    {
      id: 4,
      question: "Hva er teamet?",
      answers: [
        "Utvikling og teknologi",
        "Produktutvikling",
        "Prosjektledelse",
      ],
    },
  ],
  labels: [
    "Bedrift",
    "Størrelse",
    "Deg og dine mål",
    "Utfordringer",
    "Verktøy",
  ],
};
