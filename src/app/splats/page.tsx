import Navbar from "@/components/navbar/Navbar";
import { createClient } from "@/utils/supabase/Server";
import Link from "next/link";

const Splats = async () => {
  const supabase = createClient();
  const { data } = await supabase.from("splat").select("*");
  return (
    <>
      <Navbar className="fixed" profilecard={false} />
      <main className="px-16 pt-24 tracking-wide space-y-2 cursor-default">
        <p className="text-text-subheader text-2xl tracking-wide font-regular mt-8">
          Eksempel på Splats
        </p>
        <p className="text-lg">
          Her er noen andre Splats som har blitt laget av andre brukere
        </p>
        <div className="flex flex-col p-4">
          {data?.map((splat) => (
            <Link
              key={splat.id}
              className="flex flex-col p-4 mb-4 bg-white rounded-lg border-[1px] border-lines-default"
              href={`/splat/${splat.id}`}
            >
              <p className="text-text-subheader text-lg">{splat.title}</p>
              <p className="text-text-body">{splat.subtitle}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Splats;
