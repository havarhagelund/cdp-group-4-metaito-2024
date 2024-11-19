import { grid, position, size } from "@/types/layout";

/* Grid functions
 * All functions are used to manipulate the grid in the GridContainer component
 */

export function getSizeFromGrid(id: number, grid: grid): size {
  const { x, y } = indexOf2D(id, grid);
  let width = 0;
  let height = 0;
  const columnCap = amountColumns(grid);
  const rowCap = amountRows(grid);
  for (let i = x; i < columnCap; i++) {
    if (grid[y][i] !== id) {
      break;
    }
    width++;
  }
  for (let i = y; i < rowCap; i++) {
    if (grid[i][x] !== id) {
      break;
    }
    height++;
  }
  return { width: width, height: height };
}

export function getUniqueIds(grid: grid): number[] {
  const ids: number[] = [];
  const rowCap = amountRows(grid);
  for (let i = 0; i < rowCap; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (ids.includes(grid[i][j]) || grid[i][j] === 0) continue;
      ids.push(grid[i][j]);
    }
  }
  return ids;
}

export function gridAdd(id: number, grid: grid) {
  const size = gridSize(grid);
  for (let i = 0; i < size.height; i++) {
    for (let j = 0; j < size.width; j++) {
      if (grid[i][j] !== 0) {
        continue;
      }
      grid[i][j] = id;
      return;
    }
  }
}

export function gridRemove(id: number, grid: grid) {
  const size = gridSize(grid);
  for (let i = 0; i < size.height; i++) {
    for (let j = 0; j < size.width; j++) {
      if (grid[i][j] !== id) {
        continue;
      }
      grid[i][j] = 0;
    }
  }
}

export function gridPlace(
  id: number,
  size: size,
  position: position,
  grid: grid,
) {
  for (let i = position.y; i < size.height + position.y; i++) {
    for (let j = position.x; j < size.width + position.x; j++) {
      grid[i][j] = id;
    }
  }

  return grid;
}

export function amountZeroGrid(grid: grid): number {
  return grid.flat().filter((value) => value === 0).length;
}

export function amountIdRow(row: number, grid: grid): number {
  return grid[row].filter((value) => value === 0).length;
}

export function amountZeroColumn(id: number, grid: grid): number {
  const rowCap = amountRows(grid);
  const { x, y } = indexOf2D(id, grid);
  let zeros = 0;
  for (let i = y + 1; i < rowCap; i++) {
    if (grid[i][x] !== 0) {
      continue;
    }
    zeros++;
  }
  return zeros;
}

export function amountIdColumn(id: number, grid: grid): number {
  const { x, y } = indexOf2D(id, grid);
  const rowCap = amountRows(grid);
  let ids = 1;
  for (let i = y + 1; i < rowCap; i++) {
    if (grid[i][x] !== id) {
      continue;
    }
    ids++;
  }
  return ids;
}

export function gridSize(grid: grid): size {
  return { width: amountColumns(grid), height: amountRows(grid) };
}

export function amountRows(grid: grid): number {
  return grid.length;
}

export function amountColumns(grid: grid): number {
  return grid[0].length;
}

export function indexOf2D(id: number, grid: grid): position {
  let x = -1;
  let y = -1;
  const rowCap = amountRows(grid);
  for (let i = 0; i < rowCap; i++) {
    x = grid[i].indexOf(id);
    if (x === -1) {
      continue;
    }
    y = i;
    break;
  }
  if (x === -1 || y === -1) throw new Error("Id not found in grid");
  return { x, y };
}
