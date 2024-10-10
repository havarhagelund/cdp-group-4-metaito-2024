"use client";
import { FC, useEffect, useRef, useState } from "react";
import Card from "../widget/Card";

// Need to find a smart way to resize each of the children in the Content frame.
// Idea:
// The max size of each of the children should be a formula that takes the
// amount of children in the row and the max size / 4.
// This is because 4 children should be the max, but if there are 4 children
// then the children afterwards need to be "pushed", and if thats not possible,
// then the resizing should be blocked.
// The chuldren should have a max height of the whole container, but should be
// divided into three normally.
interface ContentProps {
  children?: React.ReactNode;
}
const Content: FC<ContentProps> = ({ children }) => {
  const section = useRef<HTMLDivElement>(null);
  const maxSize = { width: 400, height: 350 };
  const minSize = { width: 200, height: 175 };

  useEffect(() => {
    const width = section.current?.clientWidth;
    const height = section.current?.clientHeight;



  }, []);


  return (
    <section ref={section} className="px-16 pt-6 h-[75vh] flex">
      <Card maxSize={maxSize} minSize={minSize}/>
    </section>
  );
}

export default Content;
