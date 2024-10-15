import { FiActivity, FiAnchor, FiHeart, FiHome, FiMonitor, FiTrendingUp } from "react-icons/fi";

const iconMapping = [
    { icon: <FiActivity />, title: '' },
    { icon: <FiAnchor />, title: 'Maritime' },
    { icon: <FiHeart />, title: 'Health' },
    { icon: <FiTrendingUp />, title: 'Economy' },
    { icon: <FiMonitor />, title: 'Technology' },
    { icon: <FiHome />, title: 'Home' }
];

const Icons = () => {
    return (
        <div>
            {iconMapping.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    {item.icon}
                    <span>{item.title}</span>
                </div>
            ))}
        </div>
    );
}

export default Icons;
