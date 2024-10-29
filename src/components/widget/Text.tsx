"use client";
import { text } from "@/types/splat";
import { size } from "@/types/layout";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiAlignLeft, FiMail, FiPhone } from "react-icons/fi";

interface TextProps {
  text: text[];
  currentSize: size;
}

interface BlurbProps {
  url: string;
  title: string;
  type: "link" | "email" | "phone" | "text";
}

interface ButtonProps {
  className?: string;
  text: string;
  onClick?: () => void;
}

const Button = ({ className, text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`${className} bg-primary-default hover:bg-primary-second text-white py-3 w-full rounded-3xl text-lg tracking-wide`}>
      {text}
    </button>
  );
}

const Blurb = ({ url, title, type }: BlurbProps) => {
  let nUrl;
  if (type === "link") {
    nUrl = new URL(url);
  }
  return (
    <Link href={nUrl ? nUrl : url} className="flex w-full h-full gap-4 tracking-wide items-center">
      <div className="flex h-auto w-12 justify-center">
        {type === "email" && <FiMail className="object-cover w-8 h-auto" />}
        {type === "link" && <img loading="eager" src={`https://icon.horse/icon/${nUrl!.hostname}`} alt={title} className="block h-full w-full" />}
        {type === "phone" && <FiPhone className="object-cover w-8 h-auto" />}
        {type === "text" && <FiAlignLeft className="object-cover w-8 h-auto" />}
      </div>
      <div className="w-full truncate flex flex-col">
        <p className="w-full text-lg truncate ...">{title !== "" ? title : url}</p>
        {type === "text" && <p className="w-full text-lg">{url}</p>}
      </div>
    </Link>
  )
};

const Text = ({ text, currentSize }: TextProps) => {
  return (
    <main style={{height: 100/3 * currentSize.height + "%"}} className={`h-[}vh]`} >
      <div className="w-full h-full gap-x-4 pt-4 space-y-7 items-center"
      >
        {text?.map((content: text, index: number) => (
          <div className="text-xl">
            <Blurb key={content.url} url={content.url} title={content.title} type={content.type} />
          </div>
        ))}
        <div className="w-full">
          <Button text="Open all links" />
        </div>
      </div>
    </main>
  );
};

export default Text;
