import React, { useState, useRef, useEffect, FC } from "react";
import { size, position, direction } from "@/types/layout";

interface CardProps {
  children?: React.ReactNode;
  minSize: size;
  startSize: size;
  id: number;
  extend: (id: number, resizeDirection: direction) => void;
  shorten: (id: number, resizeDirection: direction) => void;
  getCurrentMaxSize: (id: number) => size;
}

// TODO: Needs refactoring...
const Card: FC<CardProps> = ({
  children,
  minSize,
  startSize,
  id,
  extend,
  shorten,
  getCurrentMaxSize,
}) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<direction>(null);
  const [size, setSize] = useState<size>(startSize);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<position>({ x: 0, y: 0 });

  enum BorderPos {
    Bottom = "bottom",
    Right = "right",
  }

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
  }

  function handleMouseDown(e: React.MouseEvent) {
    const border = getBorderPosition(e.clientX, e.clientY);
    if (border) {
      setIsResizing(true);
      setResizeDirection(border);
      startPos.current = { x: e.clientX, y: e.clientY };
      e.preventDefault();
    }
  }

  function handleResize(d: number) {
    if (d > 0) {
      extend(id, resizeDirection);
    } else {
      shorten(id, resizeDirection);
    }
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing || !resizeDirection) return;
    let dx = e.clientX - startPos.current.x;
    let dy = e.clientY - startPos.current.y;

    setSize((prevSize) => {
      if (resizeDirection == "right") {
        const width = Math.max(
          Math.min(
            Math.sign(dx) * Math.floor(Math.abs(dx) / minSize.width) +
              prevSize.width,
            getCurrentMaxSize(id).width,
          ),
          1,
        );
        if (prevSize.width !== width) {
          handleResize(dx);
          dx = 0;
          startPos.current = { x: e.clientX, y: e.clientY };
        }
        prevSize.width = width;
      } else {
        const height = Math.max(
          Math.min(
            Math.sign(dy) * Math.floor(Math.abs(dy) / minSize.height) +
              prevSize.height,
            getCurrentMaxSize(id).height,
          ),
          1,
        );
        if (prevSize.height !== height) {
          handleResize(dy);
          dy = 0;
          startPos.current = { x: e.clientX, y: e.clientY };
        }
        prevSize.height = height;
      }
      return { width: prevSize.width, height: prevSize.height };
    });
  }

  function handleMouseUp() {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection(null);
    }
  }

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
  }

  return (
    <main
      ref={cardRef}
      id={id.toString()}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMoveOnCard}
      className="border-lines-default w-full h-full border-2 rounded-3xl  overflow-auto"
      style={{
        gridColumn: `span ${size.width}`,
        gridRow: `span ${size.height}`,
      }}
    >
      <p>
        span: {size.width}, {size.height}
      </p>
      <p>Resizing: {isResizing ? "Yes" : "No"}</p>
      <p>ID: {id}</p>
      {children}
    </main>
  );
};

export default Card;
