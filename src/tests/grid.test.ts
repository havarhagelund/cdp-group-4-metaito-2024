import { grid } from "@/types/layout";
import {
  amountColumns,
  amountRows,
  getUniqueIds,
  gridAdd,
  gridPlace,
  gridSize,
  gridRemove,
  indexOf2D,
} from "../utils/grid";

test("get size of grid", () => {
  const grid: grid = [
    [1, 5, 2, 2],
    [3, 3, 4, 4],
    [3, 3, 4, 4],
  ];
  expect(gridSize(grid)).toStrictEqual({ width: 4, height: 3 });
});

test("get unique ids from grid", () => {
  const grid: grid = [
    [1, 5, 2, 2],
    [3, 3, 4, 4],
    [3, 3, 4, 4],
  ];
  expect(getUniqueIds(grid)).toStrictEqual([1, 5, 2, 3, 4]);
});

test("get amount of columns & rows", () => {
  const grid: grid = [
    [1, 1, 2, 2],
    [3, 3, 4, 4],
    [3, 3, 4, 4],
  ];
  expect(amountColumns(grid)).toBe(4);
  expect(amountRows(grid)).toBe(3);
});

test("check correct position of ids", () => {
  const grid: grid = [
    [1, 5, 2, 2],
    [3, 3, 4, 4],
    [3, 3, 4, 4],
  ];
  expect(indexOf2D(1, grid)).toStrictEqual({ x: 0, y: 0 });
  expect(indexOf2D(5, grid)).toStrictEqual({ x: 1, y: 0 });
  expect(indexOf2D(2, grid)).toStrictEqual({ x: 2, y: 0 });
  expect(indexOf2D(3, grid)).toStrictEqual({ x: 0, y: 1 });
  expect(indexOf2D(4, grid)).toStrictEqual({ x: 2, y: 1 });
});

test("check add id to grid", () => {
  let grid;
  let newGrid;
  grid: grid = [
    [1, 5, 2, 2],
    [3, 3, 4, 0],
    [3, 3, 4, 0],
  ];
  newGrid: grid = [
    [1, 5, 2, 2],
    [3, 3, 4, 6],
    [3, 3, 4, 0],
  ];
  expect(gridAdd(6, grid)).toStrictEqual(newGrid);
});

test("check remove id from grid", () => {
  let grid;
  let newGrid;
  grid: grid = [
    [1, 5, 2, 2],
    [3, 3, 4, 4],
    [3, 3, 4, 4],
  ];
  newGrid: grid = [
    [1, 5, 0, 0],
    [3, 3, 4, 4],
    [3, 3, 4, 4],
  ];
  expect(gridRemove(2, grid)).toStrictEqual(newGrid);
  grid: grid = [
    [1, 2, 3, 4],
    [5, 2, 3, 0],
    [5, 2, 3, 0],
  ];
  newGrid: grid = [
    [1, 2, 0, 4],
    [5, 2, 0, 0],
    [5, 2, 0, 0],
  ];
  expect(gridRemove(3, grid)).toStrictEqual(newGrid);
});

test("check place in grid", () => {
  let grid;
  let newGrid;
  const id = 1;
  const size = { width: 2, height: 2 };
  const position = { x: 0, y: 0 };

  grid: grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  grid: newGrid = [
    [1, 1, 0, 0],
    [1, 1, 0, 0],
    [0, 0, 0, 0],
  ];
  expect(gridPlace(id, size, position, grid)).toStrictEqual(newGrid);
});
