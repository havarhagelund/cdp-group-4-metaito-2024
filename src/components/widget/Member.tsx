import { member } from "@/types/splat";
import ProfileCard from "../profile/ProfileCard";
import { size } from "@/types/layout";

interface MemberProps {
  members: member[];
  currentSize: size;
}

const Member = ({ members, currentSize }: MemberProps) => {
  return (
    <main
      style={{
        gridTemplateColumns: `repeat(${currentSize.width}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${currentSize.height}, minmax(0, 1fr))`,
      }}
      className="w-full h-fit grid gap-4"
    >
      {members.map((member: member, index: number) => (
        <ProfileCard
          key={index}
          name={member.name}
          title={member.role}
          image={member.image}
          border={false}
        />
      ))}
    </main>
  );
};

export default Member;
