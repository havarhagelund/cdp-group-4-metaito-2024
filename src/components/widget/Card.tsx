import React, { useState, useRef, useEffect, FC } from "react";
import { Size, Position, Direction } from "@/types/layout";

interface CardProps {
  children?: React.ReactNode;
  containerSize: Size;
  minSize: Size;
  id: number;
  extend: (id: number, resizeDirection: Direction) => void;
  shorten: (id: number, resizeDirection: Direction) => void;
  getCurrentMaxSize: (id: number) => Size;
}

// TODO: Needs refactoring...
const Card: FC<CardProps> = ({ children, containerSize, minSize, id, extend, shorten, getCurrentMaxSize }) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<Direction>(null);
  const [size, setSize] = useState<Size>(minSize);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<Position>({ x: 0, y: 0 });
  const startSize = useRef<Size>(size);

  enum BorderPos {
    Bottom = "bottom",
    Right = "right",
  }

  useEffect(() => {
    if (minSize.width == 0 || minSize.height == 0) return;
    setSize(minSize);
  }, [minSize]);

  function getBorderPosition(x: number, y: number): BorderPos | null {
    const card = cardRef.current;
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    const borderWidth = 10;

    const isOnRight = x >= rect.right - borderWidth && x <= rect.right;
    const isOnBottom = y >= rect.bottom - borderWidth && y <= rect.bottom;

    if (isOnRight) return BorderPos.Right;
    if (isOnBottom) return BorderPos.Bottom;
    return null;
  };

  function handleMouseDown(e: React.MouseEvent) {
    const border = getBorderPosition(e.clientX, e.clientY);
    if (border) {
      setIsResizing(true);
      setResizeDirection(border);
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { width: size.width, height: size.height };
      e.preventDefault();
    }
  };

  function handleResize(newNumb: number, prevNumb: number, resizeDirection: Direction) {
    if (newNumb !== prevNumb) {
      if (newNumb > prevNumb) {
        extend(id, resizeDirection);
      } else {
        shorten(id, resizeDirection);
      }
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing || !resizeDirection) return;
    const dx = ((e.clientX - startPos.current.x) / containerSize.width) * 100;
    const dy = ((e.clientY - startPos.current.y) / containerSize.height) * 100;

    setSize((prevSize) => {
      let newWidth = 0;
      let newHeight = 0;
      const space = getCurrentMaxSize(id);

      if (resizeDirection === "right") {
        newHeight = prevSize.height;
        const dragWidth = Math.min(Math.max(startSize.current.width + dx, minSize.width), space.width);
        newWidth = dragWidth - (dragWidth % minSize.width);
        handleResize(newWidth, prevSize.width, resizeDirection);
        prevSize.width = newWidth;
      }
      else {
        newWidth = prevSize.width;
        const dragHeight = Math.min(Math.max(startSize.current.height + dy, minSize.height), 100);
        handleResize(newHeight, prevSize.height, resizeDirection);
        newHeight = dragHeight - (dragHeight % minSize.height);
      }

      return { width: newWidth, height: newHeight };
    });
  };

  function handleMouseUp() {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection(null);
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mouseleave", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isResizing, resizeDirection]);

  function handleMouseMoveOnCard(e: React.MouseEvent) {
    const border = getBorderPosition(e.clientX, e.clientY);

    if (border === BorderPos.Right) {
      cardRef.current!.style.cursor = "ew-resize";
    } else if (border === BorderPos.Bottom) {
      cardRef.current!.style.cursor = "ns-resize";
    } else {
      cardRef.current!.style.cursor = "default";
    }
  };

  return (
    <main
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMoveOnCard}
      className="border-lines-default border-2 rounded-3xl resize overflow-auto"
      style={{
        width: `${size.width}%`,
        height: `${size.height}%`,
        position: "relative",
        userSelect: isResizing ? "none" : "auto",
      }}
    >
      <p>Width: {size.width}%</p>
      <p>Height: {size.height}%</p>
      <p>Resizing: {isResizing ? "Yes" : "No"}</p>
      {children}
    </main>
  );
};

export default Card;
