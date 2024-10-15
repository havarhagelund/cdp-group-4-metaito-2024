export type size = {
  width: number;
  height: number;
};

export type position = {
  x: number;
  y: number;
};

export type card = {
  size: size;
  position: position;
};

export type grid = number[][];

export type direction = "bottom" | "right" | null;
