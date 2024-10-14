"use client";
import { FC, useEffect, useRef, useState } from "react";
import Card from "../widget/Card";
import { Size } from "@/types/layout";
import { Direction } from "@/types/layout";


// TODO: Needs refactoring...
const Content: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [minSize, setMinSize] = useState<Size>({ width: 0, height: 0 });
  const [maxSize, setMaxSize] = useState<Size>({ width: 0, height: 0 });
  const [grid, setGrid] = useState<number[][]>([[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);

  // [1, 2, 0, 0]
  // [1, 1, 2, 0] [1, 1, 0, 0] [0, 0, 0, 0]

  const widthAmount = 4;
  const heightAmount = 3;

  useEffect(() => {
    setMaxSize(getContainerSize());
    setMinSize(getMinSize());
  }, []);

  function getRemainingSize(): number {
    return grid.filter((value) => value === 0).length;
  }

  function extendCard(id: number, resizeDirection: Direction) {
    let idIndex = -1;
    for (let i = 0; i < heightAmount; i++) {
      const idIndex = grid[i].indexOf(id);
      if (idIndex == -1) continue;
      break;
    }
    if (resizeDirection == "right") {
      const remainingSize = getRemainingSize();
      if (remainingSize === 0) return;
      setGrid((prevGrid) => {
        const idIndex = prevGrid.indexOf(id);
        prevGrid.splice(idIndex, 0, id);
        const zeroIndex = prevGrid.indexOf(0);
        prevGrid.splice(zeroIndex, 1);
        return prevGrid;
      })
    }
    console.log(grid);
  }

  function shortenCard(id: number, resizeDirection: Direction) {
    const index = grid.indexOf(id);
    grid.splice(index, 1);
    grid.push(0);
    setGrid(grid);
    console.log(grid);
  }

  function getContainerSize(): Size {
    if (!sectionRef.current) return { width: 0, height: 0 };
    const { width, height } = sectionRef.current.getBoundingClientRect();
    return { width: width, height: height };
  }

  function getCurrPossibleSize(id: number): Size {
    const minSize = getMinSize();
    const { width, height } = minSize;
    return { width: width * (grid.filter((el) => (el == 0 || el == id)).length), height: height };
  }

  function getMinSize(): Size {
    const maxSize = getContainerSize();
    const { width, height } = maxSize;
    const widthPercentage = ((width / widthAmount) / width) * 100;
    const heightPercentage = ((height / heightAmount) / height) * 100;
    return { width: widthPercentage, height: heightPercentage };
  }

  return (
    <section ref={sectionRef} className="px-16 pt-6 h-[75vh] w-[95vw] flex gap-4">
      <Card getCurrentMaxSize={getCurrPossibleSize} containerSize={maxSize} minSize={minSize} id={1} extend={extendCard} shorten={shortenCard} />
    </section>
  );
};

export default Content;
