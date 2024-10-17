import { UUID } from "crypto";
import { grid } from "./layout";

export type splat = {
  id: UUID;
  title: string;
  subtitle: string;
  content: widget[];
  grid: grid;
};

export type widget = {
  id: number;
  title: string;
  type: "text" | "checklist" | "member";
  content: text[] | checkItem[] | member[];
};

export type member = {
  image: string;
  name: string;
  role: string;
};

export type text = {
  title: string;
  url: string;
  type: "link" | "email" | "phone" | "text";
};

export type checkItem = {
  title: string;
  checked: boolean;
  order: number;
};
