import { splat } from "@/types/splat";

export const splatData: splat = {
  id: "0c9af6dc-3ec6-4634-b88d-c389734a6ef0",
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
          title: "Svenn Helge Vatne på linkedin: Skjønner dere greia?",
          url: "https://www.linkedin.com/in/sandviklee/",
          type: "link",
        },
        {
          title: "Sticos om Factsplat",
          url: "https://www.youtube.com/watch?v=yBpGR4K-1Xo",
          type: "link",
        },
        {
          title: "vatne@metaito.com",
          url: "mailto:vatne@metaito.com",
          type: "email",
        },
        {
          title: "+47 472 85 528",
          url: "",
          type: "phone",
        },
        {
          title: "SSID: Brygga",
          url: "K59@TrondheimNO",
          type: "text",
        },
      ],
    },
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
        {
          image: "/assets/props/sandviklee.jpg",
          name: "Kari Nordmann",
          role: "Designer",
        },
      ],
    },
    {
      id: 3,
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
