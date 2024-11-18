import { grid } from "./layout";

export type splat = {
  id: number;
  title: string;
  subtitle: string;
  content: widget[];
  grid: grid;
};

export type widget = {
  id: number;
  title: string;
  type: "text" | "checklist" | "member";
  content: droplet[];
};

export type droplet = text | checkItem | member;

export type textTypes = "link" | "email" | "phone" | "text";

export type member = {
  id: number;
  image: string;
  name: string;
  role: string;
  placeholder: boolean;
};

export type text = {
  id: number;
  title: string;
  url: string;
  type: textTypes;
  placeholder: boolean;
};

export type checkItem = {
  id: number;
  title: string;
  checked: boolean;
  order: number;
  placeholder: boolean;
};
