import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.from("splat").select("*");
  return (
    <div className="px-16 font-medium tracking-wide space-y-2 cursor-default">
      <p className="text-text-subheader text-2xl font-bold mt-8">Splats</p>
      <div className="flex flex-col p-4">
        {data?.map(
          (splat) => (
            <Link
              key={splat.id}
              className="flex flex-col p-4 mb-2 bg-white rounded-lg shadow-md"
              href={`/splat/${splat.id}`}
            >
              <p className="text-text-subheader text-lg">{splat.title}</p>
              <p className="text-text-body">{splat.subtitle}</p>
            </Link>
          ),
          [],
        )}
      </div>
    </div>
  );
}
