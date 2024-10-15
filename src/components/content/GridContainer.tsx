"use client";
import { FC, useEffect, useRef, useState } from "react";
import Card, { CardRef } from "../widget/Card";
import { size, card, grid, position } from "@/types/layout";
import {
  getSizeFromGrid,
  amountIdColumn,
  amountZeroColumn,
  indexOf2D,
  gridPlace,
} from "@/utils/grid";

const GridContainer: FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<grid | null>(null);
  const [cardIds] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const cardRefs = useRef<CardRef[]>([]);
  const columnCap = 4;
  const rowCap = 3;

  useEffect(() => {
    setGrid([
      [1, 2, 3, 4],
      [1, 2, 5, 4],
      [6, 6, 6, 6],
    ]);
  }, []);

  function setRefs(ref: CardRef) {
    if (cardRefs.current.some((el) => el.id === ref.id)) return;
    cardRefs.current.push(ref);
  }

  function toGridPosition(pos: position): position {
    const { width, height } = getMinSize();
    const gridSize = gridRef.current!.getBoundingClientRect();
    const x = Math.ceil(Math.abs(pos.x) / (width - 10)) - 1;
    const y = Math.ceil(Math.abs(pos.y - gridSize.y) / height) - 1;
    return { x, y };
  }

  function getCardPosition(id: number): position {
    const cardRef: CardRef | undefined = cardRefs.current.find(
      (ref) => ref.id == id,
    );
    if (!cardRef) throw new Error("Card not found");
    const pos = cardRef.ref.current!.getBoundingClientRect();
    return toGridPosition(pos);
  }

  function getCardSize(id: number): size {
    const cardRef: CardRef | undefined = cardRefs.current.find(
      (ref) => ref.id == id,
    );
    if (!cardRef) throw new Error("Card not found");
    const { width, height } = getMinSize();
    const client = cardRef.ref.current!.getBoundingClientRect();
    return {
      width: Math.ceil(client.width / width),
      height: Math.ceil(client.height / height),
    };
  }

  function getCard(id: number): card {
    const size = getCardSize(id);
    const position = getCardPosition(id);
    return { size, position };
  }

  function placeCard(id: number, card: card, grid: number[][]) {
    gridPlace(id, card.size, card.position, grid);
  }

  function updateGrid() {
    const newGrid: number[][] = Array.from({ length: rowCap }, () =>
      Array(columnCap).fill(0),
    );
    cardIds.forEach((id) => {
      placeCard(id, getCard(id), newGrid);
    });
    setGrid(newGrid);
  }

  function getContainerSize(): size {
    if (!gridRef.current) throw new Error("Section reference is not set");
    const { width, height } = gridRef.current.getBoundingClientRect();
    return { width: width, height: height };
  }

  function getCurrPossibleCardSize(id: number): size {
    if (!grid) throw new Error("Grid is not set");
    const { y } = indexOf2D(id, grid, rowCap);
    const possibleWidth = grid[y].filter((el) => el == 0 || el == id).length;
    const possibleHeight =
      amountZeroColumn(id, grid, rowCap) + amountIdColumn(id, grid, rowCap);
    return { width: possibleWidth, height: possibleHeight };
  }

  function getMinSize(): size {
    const maxSize = getContainerSize();
    const { width, height } = maxSize;
    const cardWidth = width / columnCap;
    const cardHeight = height / rowCap;
    return { width: cardWidth, height: cardHeight };
  }

  if (!grid) {
    return (
      <>
        <p className="w-full text-center flex justify-center items-center">
          Loading...
        </p>
      </>
    );
  }

  return (
    <section
      ref={gridRef}
      className="px-16 pt-6 h-[75vh] w-[96vw] grid gap-2 grid-cols-4 grid-rows-3 justify-start content-start"
    >
      {cardIds.map((id) => {
        return (
          <Card
            id={id}
            key={id}
            getMinSize={getMinSize}
            startSize={getSizeFromGrid(id, grid, rowCap, columnCap)}
            update={updateGrid}
            getCurrentPossibleSize={getCurrPossibleCardSize}
            setRefs={setRefs}
          />
        );
      })}
    </section>
  );
};

export default GridContainer;
