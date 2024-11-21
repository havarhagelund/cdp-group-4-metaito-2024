import { grid } from "@/types/layout";
import { droplet, widget } from "@/types/splat";
import { gridAdd, gridRemove } from "@/utils/Grid";
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
  updateStoreDroplets: (widgetId: number, droplet: droplet[]) => void;
  addStoreDroplet: (widgetId: number, id: number, droplet: droplet) => void;
  removeStoreDroplet: (widgetId: number, id: number) => void;
};

function pushWidgetDroplet(
  widgetId: number,
  droplet: droplet,
  content: widget[] | null,
) {
  if (!content) throw new Error("Content is not defined");
  content.map((widget) => {
    if (widget.id === widgetId) {
      widget.content.push(droplet);
    }
  });
  return content;
}

function removeWidgetDroplet(
  widgetId: number,
  dropletId: number,
  content: widget[] | null,
) {
  if (!content) throw new Error("Content is not defined");
  content.map((widget) => {
    if (widget.id === widgetId) {
      widget.content = widget.content.filter((d) => d.id !== dropletId);
    }
  });
  return content;
}

function pushContent(content: widget[] | null, widget: widget): widget[] {
  if (!content) throw new Error("Content is not defined");
  const id = widget.id;
  const index = content.findIndex((widget) => widget.id === id);
  if (index !== -1) throw new Error("Id already exists");
  content.push(widget);
  return content;
}

function removeContent(id: number, content: widget[] | null): widget[] {
  if (!content) throw new Error("Content is not defined");
  const newContent = content.filter((widget) => widget.id !== id);
  return newContent;
}

function pushGrid(id: number, grid: grid | null): grid {
  if (!grid) throw new Error("Grid is not defined");
  gridAdd(id, grid);
  return [...grid];
}

function removeGrid(id: number, grid: grid | null): grid {
  if (!grid) throw new Error("Grid is not defined");
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
      content: removeContent(id, state.content),
      grid: removeGrid(id, state.grid),
    })),
  updateStoreDroplets: (widgetId: number, droplets: droplet[]) =>
    set((state) => ({
      content: state.content?.map((widget) => {
        if (widget.id === widgetId) {
          widget.content = droplets;
        }
        return widget;
      }),
    })),
  addStoreDroplet: (widgetId: number, id: number, droplet: droplet) =>
    set((state) => ({
      content: pushWidgetDroplet(widgetId, droplet, state.content),
    })),
  removeStoreDroplet: (widgetId: number, id: number) =>
    set((state) => ({
      content: removeWidgetDroplet(widgetId, id, state.content),
    })),
}));
