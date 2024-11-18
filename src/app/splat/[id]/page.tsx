import SplatPage from "@/components/content/SplatPage";
import { getSplat } from "@/utils/get-splat";

export default async function Splat({ params }: { params: { id: string } }) {
  const splat = await getSplat(Number(params.id));
  if (typeof splat === "string") {
    return <div>Ups. An error occured. {splat}</div>;
  }
  return <SplatPage splat={splat} />;
}
