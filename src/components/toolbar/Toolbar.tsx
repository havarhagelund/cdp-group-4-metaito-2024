"use client";
import { useSplatStore } from "@/store/Splat";
import classNames from "classnames";
import { useEffect } from "react";
import { FiPlus, FiUsers, FiShare2, FiShare, FiSettings } from "react-icons/fi";
import ContentSeletor from "./ContentSelector";

const Toolbar = () => {
  const { grid, addStoreContent } = useSplatStore();
  const btnClass = classNames(
    "flex items-center justify-center h-14 w-14 rounded-2xl bg-primary-default cursor-pointer hover:bg-primary-second transition-colors duration-300 z-40",
  );

  return (
    <main className="h-fit w-fit bg-background-toolbar border-lines-default border-[1px] text-white rounded-2xl space-y-4 py-2 px-1">
      <ContentSeletor>
        <button type="button" className={btnClass}>
          <FiPlus size={20} />
        </button>
      </ContentSeletor>
      <div className={btnClass}>
        <FiUsers size={20} />
      </div>
      <div className={btnClass}>
        <FiShare2 size={20} />
      </div>
      <div className={btnClass}>
        <FiShare size={20} />
      </div>
      <div className={btnClass}>
        <FiSettings size={20} />
      </div>
    </main>
  );
};

export default Toolbar;
