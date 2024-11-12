import { grid } from "@/types/layout";
import { widget } from "@/types/splat";
import { gridAdd, gridRemove } from "@/utils/grid";
import { create } from "zustand";

type SplatState = {
  id: number;
  title: string;
  subtitle: string;
  grid: grid | null;
  content: widget[] | null;
};

type SplatActions = {
  updateStoreId: (id: number) => void;
  updateStoreTitle: (title: string) => void;
  updateStoreSubtitle: (subtitle: string) => void;
  updateStoreGrid: (grid: grid) => void;
  updateStoreContent: (content: widget[]) => void;
  addStoreContent: (widget: widget) => void;
  removeStoreContent: (id: number) => void;
};

function pushContent(content: widget[] | null, widget: widget): widget[] {
  if (!content) throw new Error("Content is not defined");
  const id = widget.id;
  const index = content.findIndex((widget) => widget.id === id);
  if (index !== -1) throw new Error("Id already exists");
  content.push(widget);
  return content;
}

function popContent(id: number, content: widget[] | null): widget[] {
  if (!content) throw new Error("Content is not defined");
  return content.filter((widget) => widget.id !== id);
}

function pushGrid(id: number, grid: grid | null): grid {
  if (!grid) throw new Error("Grid is not defined");
  gridAdd(id, grid);
  return [...grid];
}

function popGrid(id: number, grid: grid | null): grid {
  if (!grid) throw new Error("Grid is not defined");
  console.log(grid);
  gridRemove(id, grid);
  return [...grid];
}

export const useSplatStore = create<SplatState & SplatActions>((set) => ({
  id: -1,
  title: "",
  subtitle: "",
  grid: null,
  content: null,
  updateStoreId: (id: number) => set(() => ({ id: id })),
  updateStoreTitle: (title: string) => set(() => ({ title: title })),
  updateStoreSubtitle: (subtitle: string) =>
    set(() => ({ subtitle: subtitle })),
  updateStoreGrid: (grid: grid) => set(() => ({ grid: grid })),
  updateStoreContent: (content: widget[]) => set(() => ({ content: content })),
  addStoreContent: (widget: widget) =>
    set((state) => ({
      content: pushContent(state.content, widget),
      grid: pushGrid(widget.id, state.grid),
    })),
  removeStoreContent: (id: number) =>
    set((state) => ({
      content: popContent(id, state.content),
      grid: popGrid(id, state.grid),
    })),
}));
