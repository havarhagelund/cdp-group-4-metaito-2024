import { grid } from "@/types/layout";
import { amountColumns, amountRows, getUniqueIds } from "../utils/grid";

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
