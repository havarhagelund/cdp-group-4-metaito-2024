import { useState, useRef, useEffect, RefObject } from "react";
import { position, size, direction } from "@/types/layout";
import { XIcon } from "lucide-react";
import { useSplatStore } from "@/store/Splat";

export type CardRef = { id: number; ref: RefObject<HTMLDivElement> };

interface CardProps {
  children?: React.ReactNode;
  id: number;
  title: string;
  startSize: size;
  update: () => void;
  getMinSize: () => size;
  getCurrentPossibleSize: (id: number) => size;
  setRefs: (ref: CardRef) => void;
}

const Card = ({
  children,
  id,
  title,
  startSize,
  update,
  getMinSize,
  getCurrentPossibleSize,
  setRefs,
}: CardProps) => {
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [resizeDirection, setResizeDirection] = useState<direction>(null);
  const { grid, content, removeStoreContent } = useSplatStore();
  const [size, setSize] = useState<size>(startSize);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPos = useRef<position>({ x: 0, y: 0 });
  const debug = false;

  enum BorderPos {
    Bottom = "bottom",
    Right = "right",
  }

  useEffect(() => {
    if (!cardRef.current) return;
    setRefs({ id, ref: cardRef });
  }, [cardRef]);

  /**
   * getBorderPosition - Determines if a given (x, y) coordinate is on the right or bottom border of a card element.
   *
   * @param {number} x - The x-coordinate to check against the card's borders.
   * @param {number} y - The y-coordinate to check against the card's borders.
   * @returns {BorderPos|null} - Returns `BorderPos.Right` if the coordinate is on the right border,
   *                              `BorderPos.Bottom` if on the bottom border, or `null` if neither.
   * @throws {TypeError} Throws an error if `x` or `y` is not a number.
   */
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

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing || !resizeDirection) return;
    let dx = e.clientX - startPos.current.x;
    let dy = e.clientY - startPos.current.y;
    const minSize = getMinSize();
    const min = 1;

    setSize((prevSize) => {
      switch (resizeDirection) {
        case "right": {
          const width = Math.max(
            Math.min(
              Math.sign(dx) * Math.floor(Math.abs(dx) / minSize.width) +
              prevSize.width,
              getCurrentPossibleSize(id).width,
            ),
            min,
          );
          if (prevSize.width !== width) {
            dx = 0;
            startPos.current = { x: e.clientX, y: e.clientY };
          }
          prevSize.width = width;

          break;
        }
        case "bottom": {
          const height = Math.max(
            Math.min(
              Math.sign(dy) * Math.floor(Math.abs(dy) / minSize.height) +
              prevSize.height,
              getCurrentPossibleSize(id).height,
            ),
            min,
          );
          if (prevSize.height !== height) {
            dy = 0;
            startPos.current = { x: e.clientX, y: e.clientY };
          }
          prevSize.height = height;

          break;
        }
      }
      return { width: prevSize.width, height: prevSize.height };
    });
    update();
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

  function deleteCard() {
    if (!grid || !content) throw new Error("Grid or content is not defined");
    removeStoreContent(id);
  }

  return (
    <main
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMoveOnCard}
      className="group border-lines-default w-full h-full border-[1px] rounded-3xl overflow-hidden bg-background-widget px-7 py-6"
      style={{
        gridColumn: `span ${size.width}`,
        gridRow: `span ${size.height}`,
      }}
    >
      {debug && (
        <div className="absolute text-error-default ">
          <p>
            span: {size.width}, {size.height}
          </p>
          <p>Resizing: {isResizing ? "Yes" : "No"}</p>
          <p>ID: {id}</p>
        </div>
      )}
      <section className="h-full w-full space-y-3 overflow-hidden">
        <div className="flex w-full justify-between">
          <p className="font-medium text-2xl tracking-wide w-52 truncate ...">
            {title}
          </p>
          <div className="group-hover:flex hidden gap-2">
            <XIcon
              className="w-8 h-8 text-black hover:scale-110 transition-transform cursor-pointer"
              onClick={() => deleteCard()}
            />
          </div>
        </div>
        <div className="h-[2px] w-full bg-lines-default" />
        {children}
      </section>
    </main>
  );
};

export default Card;
