"use client";
import { FC, useEffect, useRef, useState } from "react";
import Card from "../widget/Card";
import { Size } from "@/types/layout";


// TODO: Needs refactoring...
const Content: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [minSize, setMinSize] = useState<Size>({ width: 0, height: 0 });
  const [maxSize, setMaxSize] = useState<Size>({ width: 0, height: 0 });
  const [row, setRow] = useState<Array<number>>(new Array(1, 0, 0, 0));

  const widthAmount = 4;
  const heightAmount = 3;

  useEffect(() => {
    setMaxSize(getContainerSize());
    setMinSize(getMinSize());
  }, []);

  const getRemainingSize = (): number => {
    return row.filter((value) => value === 0).length;
  }

  const extendCard = (id: number) => {
    const remainingSize = getRemainingSize();
    if (remainingSize === 0) return;
    const idIndex = row.indexOf(id);
    row.splice(idIndex, 0, id);
    const zeroIndex = row.indexOf(0);
    row.splice(zeroIndex, 1);
    setRow(row);
    console.log(row);
  }

  const shortenCard = (id: number) => {
    const index = row.indexOf(id);
    row.splice(index, 1);
    row.push(0);
    setRow(row);
    console.log(row);
  }

  const getContainerSize = (): Size => {
    if (!sectionRef.current) return { width: 0, height: 0 };
    const { width, height } = sectionRef.current.getBoundingClientRect();
    return { width: width, height: height };
  }

  const getCurrPossibleSize = (id: number): Size => {
    const minSize = getMinSize();
    const { width, height } = minSize;
    return { width: width * (row.filter((el) => (el == 0 || el == id)).length), height: height};
  }

  const getMinSize = (): Size => {
    const maxSize = getContainerSize();
    const { width, height } = maxSize;
    const widthPercentage = ((width / widthAmount) / width) * 100;
    const heightPercentage = ((height / heightAmount) / height) * 100;
    return { width: widthPercentage, height: heightPercentage };
  }

  return (
    <section ref={sectionRef} className="px-16 pt-6 h-[75vh] w-[95vw] flex gap-4">
      <Card getCurrentMaxSize={getCurrPossibleSize} containerSize={maxSize} minSize={minSize} id={1} extend={extendCard} shorten={shortenCard}/>
    </section>
  );
};

export default Content;
