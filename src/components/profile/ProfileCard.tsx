interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
  placeholder?: boolean;
  border?: boolean;
}
const ProfileCard = ({
  name,
  title,
  image,
  placeholder = false,
  border = true,
}: ProfileCardProps) => {
  return (
    <main
      className={` ${placeholder ? "border-solid border-red-400 border-[1px] cursor-pointer" : border && "border-solid border-lines-default border-[1px] cursor-default"} w-60 h-16 rounded-2xl flex`}
    >
      <div className="w-16 h-full">
        <img
          src={image}
          alt={name + " image"}
          width={100}
          height={100}
          draggable={false}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>
      <div
        className={`${placeholder ? "text-error-default font-semibold" : "text-text-header font-medium"} text-md text-start  px-4 flex flex-col h-22 justify-center`}
      >
        <p>{name}</p>
        <p
          className={`${placeholder ? "text-error-default" : "text-text-subheader"}`}
        >
          {title}
        </p>
      </div>
    </main>
  );
};

export default ProfileCard;
