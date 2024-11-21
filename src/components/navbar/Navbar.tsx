import Image from "next/image";
import ProfileCard from "../profile/ProfileCard";
import Link from "next/link";

interface NavbarProps {
  className?: string;
  profilecard?: boolean;
}

const Navbar = ({ className, profilecard = true }: NavbarProps) => {
  return (
    <nav
      className={`${className} flex justify-between h-32 w-full px-16 pt-4 items-center`}
    >
      <Link href="/" className="h-22 w-22">
        <Image
          src="/logo.svg"
          alt="fs logo"
          height={100}
          width={100}
          className="object-cover w-full h-full"
        />
      </Link>
      {profilecard && (
        <ProfileCard
          name="John Doe"
          title="Software Engineer"
          image="/assets/props/sandviklee.jpg"
        />
      )}
    </nav>
  );
};

export default Navbar;
