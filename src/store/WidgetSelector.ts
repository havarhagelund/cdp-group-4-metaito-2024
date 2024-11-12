import { widgetType } from "@/components/toolbar/ContentChooser";
import { create } from "zustand";

type WidgetState = {
  currentWidget: widgetType;
};

type WidgetActions = {
  changeWidget: (widget: widgetType) => void;
};

export const useWidgetSelectorStore = create<WidgetState & WidgetActions>(
  (set) => ({
    currentWidget: null,
    changeWidget: (widget: widgetType) =>
      set(() => ({ currentWidget: widget })),
  }),
);
