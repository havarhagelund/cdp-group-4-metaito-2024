import { getIconForTitle } from "@/components/icons/Icons";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Form } from "./Form";

export type CardData = {
  className?: string;
  card: Form;
  onClick?: () => void;
};

const FormCard: React.FC<CardData> = ({ card, onClick }) => {
  return (
    <Card className="w-36 h-36 m-2 overflow-hidden" onClick={onClick}>
      <CardContent className="flex flex-col items-center p-1">
        <div
          style={{
            fontSize: "2.5rem",
            marginTop: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {getIconForTitle(card.title)}
        </div>
        <h1 className="text-center mx-0.5 mt-1.5 text-sm leading-tight overflow-hidden text-ellipsis whitespace-pre-wrap ">
          {card.title}
        </h1>
      </CardContent>
    </Card>
  );
};

export default FormCard;
