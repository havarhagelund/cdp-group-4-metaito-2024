import { splat } from "@/types/splat";

export const splatData: splat = {
  id: "0c9af6dc-3ec6-4634-b88d-c389734a6ef0",
  title: "AI structure Assistant",
  subtitle: "Customer driven Project",
  grid: [
    [1, 1, 2, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  content: [
    {
      id: 1,
      title: "Team Members",
      type: "member",
      content: [
        {
          image: "/assets/props/sandviklee.jpg",
          name: "John Doe",
          role: "Project Manager",
        },
        {
          image: "/assets/props/sandviklee.jpg",
          name: "Håvar Hagelund",
          role: "Developer",
        },
      ],
    },
    {
      id: 2,
      title: "Todo's",
      type: "checklist",
      content: [
        {
          title: "Create a new project",
          checked: true,
          order: 1,
        },
        {
          title: "Add a new member",
          checked: false,
          order: 2,
        },
      ],
    },
  ],
};
