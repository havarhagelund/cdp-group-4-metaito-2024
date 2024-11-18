"use client";
import { text } from "@/types/splat";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiAlignLeft, FiMail, FiPhone } from "react-icons/fi";
import EditTextPopup from "./EditTextPopup";

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-primary-default hover:bg-primary-second text-white py-3 w-full rounded-3xl text-lg tracking-wide`}
    >
      {text}
    </button>
  );
};

interface BlurbProps {
  url: string;
  title: string;
  type: "link" | "email" | "phone" | "text";
}

const Blurb = ({ url, title, type }: BlurbProps) => {
  let nUrl;
  if (type === "link") {
    nUrl = new URL(url);
  }
  return (
    <>
      {type !== "text" ? (
        <Link
          href={nUrl ? nUrl : url}
          className="flex w-full h-full gap-4 tracking-wide items-center"
        >
          <div className="flex h-auto w-12 justify-center">
            {type === "email" && <FiMail className="object-cover w-8 h-auto" />}
            {type === "link" && (
              <img
                loading="eager"
                src={`https://icon.horse/icon/${nUrl!.hostname}`}
                alt={"img"}
                className="block h-full w-full"
              />
            )}
            {type === "phone" && (
              <FiPhone className="object-cover w-8 h-auto" />
            )}
          </div>
          <div className="w-full truncate flex flex-col">
            <p className="w-full text-lg truncate ...">
              {title !== "" ? title : url}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex w-full h-full gap-4 tracking-wide items-center">
          <div className="flex h-auto w-12 justify-center">
            <FiAlignLeft className="object-cover w-8 h-auto" />
          </div>
          <div className="w-full truncate flex flex-col">
            <p className="w-full text-lg truncate ...">
              {title !== "" ? title : url}
            </p>
            <p className="w-full text-lg">{url}</p>
          </div>
        </div>
      )}
    </>
  );
};

type blurbs = {
  links: number;
  emails: number;
};

interface TextProps {
  id: number;
  text: text[];
}

const Text = ({ id, text }: TextProps) => {
  const [blurbCount, setBlurbCount] = useState<blurbs>({ links: 0, emails: 0 });

  useEffect(() => {
    let links = 0;
    let emails = 0;
    text.forEach((content: text) => {
      if (content.type === "link") links++;
      if (content.type === "email") emails++;
    });
    setBlurbCount({ links, emails });
  }, []);

  function largestInstance(): "link" | "email" | "none" {
    const { links, emails } = blurbCount;
    if (links < 3 && emails < 3) {
      return "none";
    }
    return links > emails ? "link" : "email";
  }

  function openLinks(links: string[]) {
    for (const link of links) {
      window.open(link, "_blank");
    }
  }

  if (!blurbCount) return <></>;

  return (
    <main className="h-full">
      <div className="w-full h-full gap-x-4 pt-4 space-y-6 items-center">
        {text
          ?.sort((f, n) => f.id - n.id)
          .map((content: text, index: number) =>
            content.placeholder ? (
              <EditTextPopup key={index} widgetId={id} dropletId={content.id}>
                <button
                  key={index}
                  className="w-full text-start  text-lines-default hover:scale-[1.01] hover:text-gray-800 transition-transform"
                >
                  <Blurb
                    url={""}
                    title={
                      content.title === ""
                        ? "Add your own text here"
                        : "Add " + content.title
                    }
                    type={"text"}
                  />
                </button>
              </EditTextPopup>
            ) : (
              <div key={index} className="text-xl">
                <Blurb
                  url={content.url}
                  title={content.title}
                  type={content.type}
                />
              </div>
            ),
          )}
      </div>
      <div className="relative w-full bottom-32 bg-background-widget">
        {largestInstance() === "link" && (
          <Button
            text="Open all links"
            onClick={() =>
              openLinks(
                text
                  .filter((blurb) => blurb.type === "link")
                  .map((blurb) => blurb.url),
              )
            }
          />
        )}
        {largestInstance() === "email" && <Button text="Send all emails" />}
      </div>
    </main>
  );
};

export default Text;
