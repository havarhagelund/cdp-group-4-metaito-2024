import {
  FiActivity,
  FiAnchor,
  FiBookOpen,
  FiHeart,
  FiHome,
  FiMonitor,
  FiPackage,
  FiTrendingUp,
  FiTruck,
  FiUser,
} from "react-icons/fi";

const iconMapping: { [key: string]: JSX.Element } = {
  Maritime: <FiAnchor />,
  Health: <FiHeart />,
  Economy: <FiTrendingUp />,
  Technology: <FiMonitor />,
  Home: <FiHome />,
  Transport: <FiTruck />,
  School: <FiBookOpen />,
  Industry: <FiPackage />,
  User: <FiUser />,
  "": <FiActivity />,
};

export const getIconForTitle = (title: string): JSX.Element => {
  const lowerTitle = title.toLowerCase();
  if (
    lowerTitle.includes("maritime") ||
    lowerTitle.includes("hav") ||
    lowerTitle.includes("båt")
  ) {
    return iconMapping["Maritime"];
  }
  if (lowerTitle.includes("helse") || lowerTitle.includes("omsorg")) {
    return iconMapping["Health"];
  }
  if (
    lowerTitle.includes("ledelse") ||
    lowerTitle.includes("økonomi") ||
    lowerTitle.includes("finans") ||
    lowerTitle.includes("salg") ||
    lowerTitle.includes("service") ||
    lowerTitle.includes("konsulent")
  ) {
    return iconMapping["Economy"];
  }
  if (
    lowerTitle.includes("teknologi") ||
    lowerTitle.includes("it") ||
    lowerTitle.includes("data")
  ) {
    return iconMapping["Technology"];
  }
  if (
    lowerTitle.includes("hjem") ||
    lowerTitle.includes("bygg") ||
    lowerTitle.includes("anlegg")
  ) {
    return iconMapping["Home"];
  }
  if (lowerTitle.includes("transport") || lowerTitle.includes("logistikk")) {
    return iconMapping["Transport"];
  }
  if (lowerTitle.includes("utdanning") || lowerTitle.includes("forskning")) {
    return iconMapping["School"];
  }
  if (lowerTitle.includes("personer")) {
    return iconMapping["User"];
  }
  if (lowerTitle.includes("industri") || lowerTitle.includes("produksjon")) {
    return iconMapping["Industry"];
  }

  return iconMapping[""];
};

const Icons = () => {
  return (
    <div>
      {Object.keys(iconMapping).map((title, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          {iconMapping[title]}
          <span>{title}</span>
        </div>
      ))}
    </div>
  );
};

export default Icons;
