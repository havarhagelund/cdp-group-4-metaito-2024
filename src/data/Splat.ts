import { splat } from "@/types/splat";

export const splatData: splat = {
  id: 0,
  title: "AI structure Assistant",
  subtitle: "Customer driven Project",
  grid: [
    [2, 1, 1, 3],
    [2, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  content: [
    {
      id: 2,
      title: "Customer",
      type: "text",
      content: [
        {
          id: 1,
          title: "Sticos om Factsplat",
          url: "https://www.youtube.com/watch?v=yBpGR4K-1Xo",
          type: "link",
          placeholder: false,
        },
        {
          id: 2,
          title: "vatne@metaito.com",
          url: "mailto:vatne@metaito.com",
          type: "email",
          placeholder: false,
        },
        {
          id: 3,
          title: "+47 472 85 528",
          url: "",
          type: "phone",
          placeholder: false,
        },
        {
          id: 4,
          title: "SSID: Brygga",
          url: "K59@TrondheimNO",
          type: "text",
          placeholder: false,
        },
        {
          id: 0,
          title: "",
          url: "",
          type: "text",
          placeholder: true,
        },
      ],
    },
    {
      id: 1,
      title: "Team Members",
      type: "member",
      content: [
        {
          id: 0,
          image: "/assets/props/sandviklee.jpg",
          name: "John Doe",
          role: "Project Manager",
          placeholder: false,
        },
        {
          id: 1,
          image: "/assets/props/sandviklee.jpg",
          name: "Håvar Hagelund",
          role: "Developer",
          placeholder: false,
        },
        {
          id: 2,
          image: "/assets/props/sandviklee.jpg",
          name: "Kari Nordmann",
          role: "Designer",
          placeholder: false,
        },
        {
          id: 3,
          image: "",
          name: "",
          role: "",
          placeholder: true,
        },
      ],
    },
    {
      id: 3,
      title: "Todo's",
      type: "checklist",
      content: [
        {
          id: 0,
          title: "Create a new project",
          checked: true,
          order: 1,
          placeholder: false,
        },
        {
          id: 1,
          title: "Add a new member",
          checked: false,
          order: 2,
          placeholder: false,
        },
      ],
    },
  ],
};
