import { grid, position, size } from "@/types/layout";

/* Grid functions
 * All functions are used to manipulate the grid in the GridContainer component
 */

/**
 * getSizeFromGrid - Calculates the width and height of a specified ID within a grid.
 *
 * @param {number} id - The unique identifier to locate within the grid.
 * @param {grid} grid - The 2D grid array containing IDs.
 * @returns {size} - An object containing the width and height of the specified ID.
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

/**
 * getUniqueIds - Retrieves a list of unique non-zero IDs from the grid.
 *
 * @param {grid} grid - The 2D grid array to extract unique IDs from.
 * @returns {number[]} - An array of unique IDs present in the grid.
 */
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

/**
 * gridAdd - Adds an ID to the first available empty (zero) position in the grid.
 *
 * @param {number} id - The unique identifier to add to the grid.
 * @param {grid} grid - The 2D grid array where the ID will be added.
 */
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

/**
 * gridRemove - Removes all instances of a specified ID from the grid by setting them to zero.
 *
 * @param {number} id - The unique identifier to remove from the grid.
 * @param {grid} grid - The 2D grid array from which the ID will be removed.
 */
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

/**
 * gridPlace - Places an ID in the grid at a specified position with given size.
 *
 * @param {number} id - The unique identifier to place in the grid.
 * @param {size} size - The size (width and height) of the area to be filled with the ID.
 * @param {position} position - The starting x and y coordinates for placement.
 * @param {grid} grid - The 2D grid array where the ID will be placed.
 * @returns {grid} - The updated grid with the ID placed.
 */
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

/**
 * amountZeroGrid - Counts the number of zeroes in the entire grid.
 *
 * @param {grid} grid - The 2D grid array to be evaluated.
 * @returns {number} - The total count of zeroes in the grid.
 */
export function amountZeroGrid(grid: grid): number {
  return grid.flat().filter((value) => value === 0).length;
}

/**
 * amountIdRow - Counts the number of zeroes in a specific row of the grid.
 *
 * @param {number} row - The index of the row to evaluate.
 * @param {grid} grid - The 2D grid array containing the row.
 * @returns {number} - The count of zeroes in the specified row.
 */
export function amountIdRow(row: number, grid: grid): number {
  return grid[row].filter((value) => value === 0).length;
}

/**
 * amountZeroColumn - Counts the number of zeroes below the specified ID in its column.
 *
 * @param {number} id - The unique identifier whose column is to be evaluated.
 * @param {grid} grid - The 2D grid array containing the ID.
 * @returns {number} - The count of zeroes below the ID in its column.
 * @throws {Error} - Throws an error if the ID is not found in the grid.
 */
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

/**
 * amountIdColumn - Counts the number of consecutive IDs below the specified ID in its column.
 *
 * @param {number} id - The unique identifier whose column is to be evaluated.
 * @param {grid} grid - The 2D grid array containing the ID.
 * @returns {number} - The count of consecutive IDs below the specified ID in its column.
 * @throws {Error} - Throws an error if the ID is not found in the grid.
 */
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

/**
 * gridSize - Determines the size of the grid in terms of width and height.
 *
 * @param {grid} grid - The 2D grid array to be measured.
 * @returns {size} - An object containing the width and height of the grid.
 */
export function gridSize(grid: grid): size {
  return { width: amountColumns(grid), height: amountRows(grid) };
}

/**
 * amountRows - Calculates the number of rows in the grid.
 *
 * @param {grid} grid - The 2D grid array.
 * @returns {number} - The total number of rows in the grid.
 */
export function amountRows(grid: grid): number {
  return grid.length;
}

/**
 * amountColumns - Calculates the number of columns in the grid.
 *
 * @param {grid} grid - The 2D grid array.
 * @returns {number} - The total number of columns in the grid.
 */
export function amountColumns(grid: grid): number {
  return grid[0].length;
}

/**
 * indexOf2D - Finds the position (x, y) of the first occurrence of an ID in the grid.
 *
 * @param {number} id - The unique identifier to locate in the grid.
 * @param {grid} grid - The 2D grid array to search within.
 * @returns {position} - An object containing the x and y coordinates of the ID.
 * @throws {Error} - Throws an error if the ID is not found in the grid.
 */
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
