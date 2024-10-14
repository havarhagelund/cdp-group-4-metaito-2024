import { index2D, size } from "@/types/layout";

export function getSizeFromGrid(
  id: number,
  grid: number[][],
  rowCap: number,
  columnCap: number,
): size {
  const { index, row } = indexOf2D(id, grid, rowCap);
  let width = 0;
  let height = 0;
  for (let i = index; i < columnCap; i++) {
    if (grid[row][i] !== id) {
      break;
    }
    width++;
  }
  for (let i = row; i < rowCap; i++) {
    if (grid[i][index] !== id) {
      break;
    }
    height++;
  }
  return { width: width, height: height };
}

export function shufflePlace(
  id: number,
  grid: number[][],
  rowCap: number,
  columnCap: number,
) {
  const size = getSizeFromGrid(id, grid, rowCap, columnCap);
  const firstPlace = gridFindFirst(size, grid, rowCap, columnCap);
  gridRemove(id, size, grid, rowCap);
  gridPlace(id, size, firstPlace, grid);
}

/**
 * Greedy find first algorithm, find the first place in grid
 * for given size to emulate CSS Grid Algorithm
 * Returns the found index2D.
 */
export function gridFindFirst(
  size: size,
  grid: number[][],
  rowCap: number,
  columnCap: number,
): index2D {
  let index = -1;
  let row = -1;
  for (let i = 0; i < rowCap; i++) {
    for (let j = 0; j < columnCap; j++) {
      if (grid[i][j] !== 0) continue;
      if (j - 1 + size.width >= columnCap || i - 1 + size.height >= rowCap)
        continue;
      for (let y = i; y < size.height + i; y++) {
        for (let x = j; x < size.width + j; x++) {
          if (grid[y][x] !== 0) break;
          index = j;
          row = i;
          return { index: index, row: row };
        }
      }
    }
  }
  return { index: index, row: row };
}

export function gridRemove(
  id: number,
  size: size,
  grid: number[][],
  rowCap: number,
) {
  const { index, row } = indexOf2D(id, grid, rowCap);
  if (index === -1 || row === -1) return false;
  for (let i = row; i <= size.height; i++) {
    for (let j = index; j <= size.width; j++) {
      grid[i][j] = 0;
    }
  }
}

export function gridPlace(
  id: number,
  size: size,
  index: index2D,
  grid: number[][],
) {
  for (let i = index.row; i < size.height + index.row; i++) {
    for (let j = index.index; j < size.width + index.index; j++) {
      grid[i][j] = id;
    }
  }
}

export function remainInRow(row: number, grid: number[][]): number {
  return grid[row].filter((value) => value === 0).length;
}

export function remainInColumn(
  id: number,
  grid: number[][],
  rowCap: number,
): number {
  const { index, row } = indexOf2D(id, grid, rowCap);
  let zeros = 0;
  for (let i = row + 1; i < rowCap; i++) {
    if (grid[i][index] !== 0) {
      continue;
    }
    zeros++;
  }
  return zeros;
}

export function idRowSpanLen(
  id: number,
  grid: number[][],
  rowCap: number,
): number {
  const { index, row } = indexOf2D(id, grid, rowCap);
  let ids = 1;
  for (let i = row + 1; i < rowCap; i++) {
    if (grid[i][index] !== id) {
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
): index2D {
  let index = -1;
  let row = -1;
  for (let i = 0; i < rowCap; i++) {
    index = grid[i].indexOf(id);
    if (index === -1) {
      continue;
    }
    row = i;
    break;
  }
  return { index: index, row: row };
}

export function findLastRow(
  id: number,
  grid: number[][],
  rowCap: number,
): number {
  let row = -1;
  for (let i = 0; i < rowCap; i++) {
    if (grid[i].indexOf(id) == -1) continue;
    row = i;
  }
  return row;
}
