import { FormContext } from '@/context/FormContext';
import { FormPage } from '@/types/FormData';
import React, { useContext, useEffect, useState } from 'react';
import ProgressIndicator from './ProgressIndicator';
import Button from '../Button';
import { IconArrowLeft, IconArrowRight } from '@/ui/icons/IconArrow';
import MultiSelectInput from './MultiSelectInput';
import SliderInput from './SliderInput';
import TextInput from './TextInput';

const FormCard = () => {
  const { formData, setFormData } = useContext(FormContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [formPage, setFormPage] = useState<FormPage>(formData.formPages.find(page => page.id === currentPage) as FormPage);
  const totalPages = formData.formPages.length;
  const allQuestionsAnswered = () => {
    return formPage.fields.every(field => {
      if (field.type === 'multiselect') {
        console.log(field)
        return field.value?.length > 0 || false;
      } else {
        return field.value;
      }
    });
  }

  const resetGenerateQuestionsPages = () => {
    setFormData({
      formPages: formData.formPages.map(page => {
        if (page.aiGenerated && page.id >= formPage.id) {
          return {
            ...page,
            generateQuestions: true,
            fields: page.fields.map(field => {
              return {
                ...field,
                value: undefined
              };
            })
          };
        }

        return page;
      })
    });
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      const currentFormPage = formData.formPages[currentPage - 1];
      if (!currentFormPage.generateQuestions) {
        setFormPage(currentFormPage);
        return;
      }
      const generatedQuestions = await fetchQuestionsForPage(currentFormPage);
      if (generatedQuestions) {
        setFormPage({
          ...currentFormPage,
          fields: currentFormPage.fields.map((field, index) => {
            return {
              ...field,
              label: generatedQuestions[index].question,
              options: generatedQuestions[index].options
            };
          }),
          generateQuestions: false
        });
      }
    };
    fetchQuestions();
  }, [currentPage]);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handleMultiSelectAnswer = (fieldId: number, answer: string[]) => {
    const updatedFormPage = formPage.fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          value: answer
        };
      }
      return field;
    });
    setFormPage({
      ...formPage,
      fields: updatedFormPage
    });
    resetGenerateQuestionsPages();
  }
  const handleSliderAnswer = (fieldId: number, value: string) => {
    const updatedFormPage = formPage.fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          value: value
        };
      }
      return field;
    });
    setFormPage({
      ...formPage,
      fields: updatedFormPage
    });
    resetGenerateQuestionsPages();
  };

  const handleTextAnswer = (fieldId: number, value: string) => {
    const updatedFormPage = formPage.fields.map(field => {
      if (field.id === fieldId) {
        return {
          ...field,
          value: value
        };
      }
      return field;
    });
    setFormPage({
      ...formPage,
      fields: updatedFormPage
    });
    resetGenerateQuestionsPages();
  };
  const fetchQuestionsForPage = async (formPage: FormPage) => {
    if (!formPage.aiGenerated) {
      return;
    }
    const answeredQuestions = formData.formPages.reduce((acc, page) => {
      for (const field of page.fields) {
          if (field.value) {
              acc.push({
                  question: field.label,
                  answer: field.value,
                  options: field.options || [],
              });
          }
      }
      return acc;
  }, [] as { question: string; answer: any, options?: string[] }[]);

    const questions = formPage.fields.map((field) => {
      return {
        id: field.id,
        question: field.label,
        type: field.type,
        options: field.options
      };
    });
    const requirements = formPage.requirements || "";
    try {
      const response = await fetch("/api/customize-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answeredQuestions,
          questions,
          requirements,
        }),
      });
      if (response.ok) {
        const json = await response.json();
        return json.generatedQuestions;
      } else {
        console.error("Error fetching questions for page");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    setFormData({
      formPages: formData.formPages.map(page => {
        if (page.id === formPage.id) {
          return formPage;
        }
        return page;
      })
    });
    console.log(formPage);
  }, [formPage]);

  return (
    <div className="w-4/5 h-4/5 bg-white p-8 rounded-3xl shadow-lg bg-opacity-25 flex flex-col justify-between items-center gap-5">
      {formPage.fields.length === 1 ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="font-medium text-5xl text-center">{formPage.fields[0].label}</h1>
            {formPage.fields[0].information && <h2 className="text-3xl text-gray-500 text-center">{formPage.fields[0].information}</h2>}
          </div>
          <div className="flex flex-col gap-5">
            {formPage.fields.map(field => {
              switch (field.type) {
                case 'multiselect':
                  return <MultiSelectInput key={field.id} field={field} setAnswer={handleMultiSelectAnswer} />;
                case 'slider':
                  return <SliderInput key={field.id} field={field} setAnswer={handleSliderAnswer} />;
                default:
                  return <TextInput key={field.id} field={field} setAnswer={handleTextAnswer} />;
              }
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {formPage.fields.map(field => {
            const element = () => {
              switch (field.type) {
                case 'multiselect':
                  return <MultiSelectInput key={field.id} field={field} setAnswer={handleMultiSelectAnswer} />;
                case 'slider':
                  return <SliderInput key={field.id} field={field} setAnswer={handleSliderAnswer} />;
                default:
                  return <TextInput key={field.id} field={field} setAnswer={handleTextAnswer} />;
              }
            }
            return (
              <div key={field.id} className="flex flex-col items-center gap-3">
                <h1 className="font-medium text-3xl text-center">{field.label}</h1>
                {field.information && <h2 className="text-3xl text-gray-500 text-center">{field.information}</h2>}
                {element()}
              </div>
            )

          })}
        </div>
      )}
      <div className="flex flex-col gap-5">
        <div className="flex justify-center items-center gap-5">
          <Button text="Tilbake" variant="secondary" onClick={handlePreviousPage} disabled={currentPage === 1} icon={<IconArrowLeft color="#303030" size="24" />} iconPosition="left" />
          <Button text="Neste" onClick={handleNextPage} disabled={!allQuestionsAnswered()} icon={<IconArrowRight color="#f5f5f5" size="24" />} />
        </div>
        <ProgressIndicator pageNumber={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
};
export default FormCard;