import Image from "next/image";
import ProfileCard from "../profile/ProfileCard";

const Navbar = () => {
  return (
    <nav className="flex justify-between h-32 w-full px-16 items-center">
      <div className="h-22 w-22">
        <Image
          src="/logo.svg"
          alt="fs logo"
          height={100}
          width={100}
          draggable={false}
          className="object-cover w-full h-full"
        />
      </div>
      <ProfileCard
        name="John Doe"
        title="Software Engineer"
        image="/assets/props/sandviklee.jpg"
      />
    </nav>
  );
};

export default Navbar;
