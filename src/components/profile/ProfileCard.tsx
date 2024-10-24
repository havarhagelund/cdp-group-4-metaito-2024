import Image from "next/image";
import { FC } from "react";

interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
  border?: boolean;
}
const ProfileCard: FC<ProfileCardProps> = ({
  name,
  title,
  image,
  border = true,
}) => {
  return (
    <main
      className={` ${border && "border-solid border-lines-default border-[1px]"} w-fit h-22 rounded-2xl flex`}
    >
      <div className="w-16 h-full">
        <Image
          src={image}
          alt={name + " image"}
          width={100}
          height={100}
          draggable={false}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div className="text-md text-text-header font-medium px-4 flex flex-col h-22 justify-center cursor-default">
        <p>{name}</p>
        <p className="text-text-subheader">{title}</p>
      </div>
    </main>
  );
};

export default ProfileCard;
