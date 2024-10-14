"use client";
import { FC, useEffect, useRef, useState } from "react";
import Card from "../widget/Card";
import { size, direction } from "@/types/layout";
import { findLastRow, getSizeFromGrid, gridFindFirst, gridPlace, gridRemove, idRowSpanLen, indexOf2D, remainInColumn, remainInRow} from "@/utils/grid";

const GridContainer: FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<number[][]>([[1, 2, 3, 4], [1, 2, 5, 4], [6, 6, 6, 0]]);
  const [cardIds] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const columnCap = 4;
  const rowCap = 3;

  useEffect(() => {
    setGrid([[1, 2, 3, 4], [1, 2, 5, 4], [6, 6, 6, 0]])
  }, []);

  function extendCard(id: number, resizeDirection: direction) {
    setGrid((prevGrid) => {
      const { index, row } = indexOf2D(id, grid, rowCap);
      const lastRow = findLastRow(id, grid, rowCap);
      switch (resizeDirection) {
        case "right": {
          const remRows = remainInRow(row, grid);
          if (remRows === 0) return prevGrid;
          for (let i = row; i <= lastRow; i++) {
            prevGrid[i].splice(index, 0, id);
            const zeroIndex = prevGrid[i].indexOf(0);
            prevGrid[i].splice(zeroIndex, 1);
          }
          break;
        }
        case "bottom": {
          if (lastRow >= rowCap) return prevGrid;
          const nextElem = grid[lastRow + 1][index]
          const currSize = getSizeFromGrid(id, grid, rowCap, columnCap);
          if (nextElem !== 0) {
            const nextElemSize = getSizeFromGrid(nextElem, grid, rowCap, columnCap);
            gridRemove(nextElem, nextElemSize, grid, rowCap);
            gridPlace(id, { width: currSize.width, height: currSize.height + 1 }, { index, row }, grid)
            gridPlace(nextElem, nextElemSize, gridFindFirst(nextElemSize, grid, rowCap, columnCap), grid);
          } else {
            gridPlace(id, { width: currSize.width, height: currSize.height + 1 }, { index, row }, grid)
          }
          break;
        }
      }
      return prevGrid;
    })
  }

  function shortenCard(id: number, resizeDirection: direction) {
    setGrid((prevGrid) => {
      const { index, row } = indexOf2D(id, grid, rowCap);
      const lastRow = findLastRow(id, grid, rowCap);
      switch (resizeDirection) {
        case "right": {
          for (let i = row; i <= lastRow; i++) {
            prevGrid[i].splice(index, 1);
            prevGrid[i].push(0);
          }
          break;
        }
        case "bottom": {
          const lastIndex = prevGrid[row].lastIndexOf(id);
          for (let i = index; i <= lastIndex; i++) {
            prevGrid[lastRow][i] = 0;
          }
          break;
        }
      }
      return prevGrid;
    });
  }

  function getContainerSize(): size {
    if (!sectionRef.current) return { width: 0, height: 0 };
    const { width, height } = sectionRef.current.getBoundingClientRect();
    return { width: width, height: height };
  }

  function getCurrPossibleCardSize(id: number): size {
    const { row } = indexOf2D(id, grid, rowCap);
    const possibleWidth = grid[row].filter((el) => (el == 0 || el == id)).length;
    const possibleHeight = remainInColumn(id, grid, rowCap) + idRowSpanLen(id, grid, rowCap);
    return { width: possibleWidth, height: possibleHeight };
  }

  function getMinSize(): size {
    const maxSize = getContainerSize();
    const { width, height } = maxSize;
    const cardWidth = width / columnCap
    const cardHeight = height / rowCap
    return { width: cardWidth, height: cardHeight };
  }

  return (
    <section ref={sectionRef} className="px-16 pt-6 h-[75vh] w-[96vw] grid gap-2 grid-cols-4 grid-rows-3 justify-start content-start">
      {cardIds.map((id) => {
        return (
          <Card
            key={id}
            id={id}
            minSize={getMinSize()}
            startSize={getSizeFromGrid(id, grid, rowCap, columnCap)}
            extend={extendCard}
            shorten={shortenCard}
            getCurrentMaxSize={getCurrPossibleCardSize}
          />)
      })}
    </section>
  );
};

export default GridContainer;
