"use client";
import { useEffect, useRef, useState } from "react";
import Card, { CardRef } from "../widget/Card";
import { size, card, grid, position } from "@/types/layout";
import { member, text, widget } from "@/types/splat";
import {
  getSizeFromGrid,
  amountIdColumn,
  amountZeroColumn,
  indexOf2D,
  gridPlace,
  amountColumns,
  amountRows,
  getUniqueIds,
} from "@/utils/grid";
import Member from "../widget/Member";
import Text from "../widget/Text";

interface GridContainerProps {
  content: widget[];
  grid: grid;
}
const GridContainer = ({ content, grid }: GridContainerProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentGrid, setCurrentGrid] = useState<grid | null>(null);
  const [cardIds, setCardIds] = useState<number[]>();
  const cardRefs = useRef<CardRef[]>([]);

  useEffect(() => {
    setCurrentGrid(grid);
    setCardIds(getUniqueIds(grid));
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
    if (!grid) throw new Error("Grid is not set");
    gridPlace(id, card.size, card.position, grid);
  }

  function updateGrid() {
    if (!currentGrid || !cardIds) throw new Error("Grid is not set");
    const rowCap = amountRows(currentGrid);
    const columnCap = amountColumns(currentGrid);
    const newGrid: grid = Array.from({ length: rowCap }, () =>
      Array(columnCap).fill(0),
    );
    cardIds.forEach((id) => {
      placeCard(id, getCard(id), newGrid);
    });
    setCurrentGrid(newGrid);
    console.log(newGrid);
  }

  function getContainerSize(): size {
    if (!gridRef.current) throw new Error("Section reference is not set");
    const { width, height } = gridRef.current.getBoundingClientRect();
    return { width: width, height: height };
  }

  function getCurrPossibleCardSize(id: number): size {
    if (!currentGrid) throw new Error("Grid is not set");
    const { y } = indexOf2D(id, currentGrid);
    const possibleWidth = currentGrid[y].filter(
      (el) => el == 0 || el == id,
    ).length;
    const possibleHeight =
      amountZeroColumn(id, currentGrid) + amountIdColumn(id, currentGrid);
    return { width: possibleWidth, height: possibleHeight };
  }

  function getMinSize(): size {
    if (!currentGrid) throw new Error("Grid is not set");
    const rowCap = amountRows(currentGrid);
    const columnCap = amountColumns(currentGrid);
    const maxSize = getContainerSize();
    const { width, height } = maxSize;
    const cardWidth = width / columnCap;
    const cardHeight = height / rowCap;
    return { width: cardWidth, height: cardHeight };
  }

  if (!currentGrid || !cardIds) {
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
      {content.map((widget: widget) => {
        return (
          <Card
            id={widget.id}
            key={widget.id}
            title={widget.title}
            getMinSize={getMinSize}
            startSize={getSizeFromGrid(widget.id, currentGrid)}
            update={updateGrid}
            getCurrentPossibleSize={getCurrPossibleCardSize}
            setRefs={setRefs}
          >
            {widget.type == "member" && (
              <Member
                currentSize={getSizeFromGrid(widget.id, currentGrid)}
                members={widget.content as member[]}
              />
            )}
            {widget.type == "text" && (
              <Text currentSize={getSizeFromGrid(widget.id, currentGrid)} text={widget.content as text[]} />
            )}
          </Card>
        );
      })}
    </section>
  );
};

export default GridContainer;
