import { size } from "@/types/layout";
import { icon } from "@/types/splat";
import EditIconPopup from "./EditIconPopup";
import { useRouter } from "next/navigation";

interface IconLinkProps {
  url: string;
  placeholder?: boolean;
}

const IconLink = ({ url, placeholder = false }: IconLinkProps) => {
  const router = useRouter();
  const nUrl = new URL(url);

  function pushToUrl() {
    if (!placeholder) {
      router.push(url);
    }
  }

  return (
    <div onClick={() => pushToUrl()} className={`${placeholder && "opacity-20 hover:scale-105 transition-transform"} w-full h-full items-center flex justify-center cursor-pointer `}>
      <div className="h-[5vw] w-[5vw] bg-white rounded-md">
        <img
          loading="eager"
          src={`https://icon.horse/icon/${nUrl!.hostname}`}
          alt={"icon of " + nUrl.hostname}
          className="block h-full w-full object-cover rounded-lg"
          draggable={false}
        />
      </div>
    </div>
  );
}

interface IconProps {
  id: number;
  icons: icon[];
  currentSize: size;
}

const Icon = ({ id, icons, currentSize }: IconProps) => {
  return (
    <main
      style={{
        gridTemplateColumns: `repeat(${currentSize.width * 3}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${currentSize.height}, minmax(0, 1fr))`,
      }}
      className="w-full h-fit grid gap-4 pt-6"
    >
      {icons
        .sort((f, n) => f.id - n.id)
        .map((icon: icon, index: number) =>
          icon.placeholder ? (
            <EditIconPopup key={index} widgetId={id} dropletId={icon.id}>
              <IconLink key={index} url={icon.url} placeholder={icon.placeholder} />
            </EditIconPopup>
          ) : (
            <IconLink key={index} url={icon.url} />
          ),
        )}
    </main>
  )

};

export default Icon;
