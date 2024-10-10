import React, { useState, useRef, useEffect, FC } from 'react';
import {size, position} from '@/types/layout';

interface CardProps {
  children?: React.ReactNode;
  maxSize: size;
  minSize: size;
}
const Card: FC<CardProps> = ({children, maxSize, minSize}) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<'bottom' | 'right' | null>(null);
  const [size, setSize] = useState<size>(minSize);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<position>({ x: 0, y: 0 });
  const startSize = useRef<size>(size);

  enum BorderPos {
    Bottom = 'bottom',
    Right = 'right',
  }

  const getBorderPosition = (x: number, y: number): BorderPos | null => {
    const card = cardRef.current;
    if (!card) return null;
    const rect = card.getBoundingClientRect();
    const borderWidth = 10;

    const isOnRight = x >= (rect.right - borderWidth) && x <= rect.right;
    const isOnBottom = y >= (rect.bottom - borderWidth) && y <= rect.bottom;

    if (isOnRight) return BorderPos.Right;
    if (isOnBottom) return BorderPos.Bottom;
    return null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const border = getBorderPosition(e.clientX, e.clientY);
    if (border) {
      setIsResizing(true);
      setResizeDirection(border);
      startPos.current = { x: e.clientX, y: e.clientY };
      startSize.current = { width: size.width, height: size.height };
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing || !resizeDirection) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;

    setSize((prevSize) => {
      let newWidth = prevSize.width;
      let newHeight = prevSize.height;


      if (resizeDirection === 'right') {
        newWidth = Math.max(startSize.current.width + dx, 50);
      }

      if (resizeDirection === 'bottom') {
        newHeight = Math.max(startSize.current.height + dy, 50);
      }

      return { width: newWidth, height: newHeight };
    });
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      setResizeDirection(null);
    }
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [isResizing, resizeDirection]);

  const handleMouseMoveOnCard = (e: React.MouseEvent) => {
    const border = getBorderPosition(e.clientX, e.clientY);

    if (border === BorderPos.Right) {
      cardRef.current!.style.cursor = 'ew-resize';
    } else if (border === BorderPos.Bottom) {
      cardRef.current!.style.cursor = 'ns-resize';
    } else {
      cardRef.current!.style.cursor = 'default';
    }
  };

  return (
    <main
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMoveOnCard}
      className="border-lines-default border-2 rounded-3xl resize overflow-auto"
      style={{
        width: `${size.width}px`,
        height: `${size.height}px`,
        position: 'relative',
        userSelect: isResizing ? 'none' : 'auto',
      }}
    >
      <p>Width: {size.width}px</p>
      <p>Height: {size.height}px</p>
      <p>Resizing: {isResizing ? 'Yes' : 'No'}</p>
      {children}
    </main>
  );
};

export default Card;
