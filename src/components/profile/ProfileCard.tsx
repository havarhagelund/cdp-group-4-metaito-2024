import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
}
const ProfileCard = ({ name, title, image }: ProfileCardProps) => {
  return (
    <main className="border-lines-default border-[1px] border-solid w-fit h-22 rounded-2xl flex">
      <div className="w-16 h-full">
        <Image src={image} alt={name + " image"} width={100} height={100} className="object-cover w-full h-full rounded-2xl" />
      </div>
      <div className="text-md text-text-header font-medium px-4 flex flex-col h-22 justify-center cursor-default">
          <p>{name}</p>
          <p className="text-text-subheader">{title}</p>
      </div>
    </main>
  );
}

export default ProfileCard;
