import { position, size } from "@/types/layout";

/* Grid functions
 * All functions are used to manipulate the grid in the GridContainer component
 */

export function getSizeFromGrid(
  id: number,
  grid: number[][],
  yEnd: number,
  columnCap: number,
): size {
  const { x, y } = indexOf2D(id, grid, yEnd);
  let width = 0;
  let height = 0;
  for (let i = x; i < columnCap; i++) {
    if (grid[y][i] !== id) {
      break;
    }
    width++;
  }
  for (let i = y; i < yEnd; i++) {
    if (grid[i][x] !== id) {
      break;
    }
    height++;
  }
  return { width: width, height: height };
}

export function gridRemove(
  id: number,
  size: size,
  grid: number[][],
  yCap: number,
) {
  const { x, y } = indexOf2D(id, grid, yCap);
  if (x === -1 || y === -1) throw new Error("Id not found in grid");
  for (let i = y; i <= size.height; i++) {
    for (let j = x; j <= size.width; j++) {
      grid[i][j] = 0;
    }
  }
}

export function gridPlace(
  id: number,
  size: size,
  position: position,
  grid: number[][],
) {
  for (let i = position.y; i < size.height + position.y; i++) {
    for (let j = position.x; j < size.width + position.x; j++) {
      grid[i][j] = id;
    }
  }
}

export function amountIdRow(row: number, grid: number[][]): number {
  return grid[row].filter((value) => value === 0).length;
}

export function amountZeroColumn(
  id: number,
  grid: number[][],
  rowCap: number,
): number {
  const { x, y } = indexOf2D(id, grid, rowCap);
  let zeros = 0;
  for (let i = y + 1; i < rowCap; i++) {
    if (grid[i][x] !== 0) {
      continue;
    }
    zeros++;
  }
  return zeros;
}

export function amountIdColumn(
  id: number,
  grid: number[][],
  rowCap: number,
): number {
  const { x, y } = indexOf2D(id, grid, rowCap);
  let ids = 1;
  for (let i = y + 1; i < rowCap; i++) {
    if (grid[i][x] !== id) {
      continue;
    }
    ids++;
  }
  return ids;
}

export function indexOf2D(
  id: number,
  grid: number[][],
  rowCap: number,
): position {
  let x = -1;
  let y = -1;
  for (let i = 0; i < rowCap; i++) {
    x = grid[i].indexOf(id);
    if (x === -1) {
      continue;
    }
    y = i;
    break;
  }
  return { x, y };
}
