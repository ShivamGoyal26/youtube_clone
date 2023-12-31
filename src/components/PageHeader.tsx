"use client";

import images from "@/constants/images";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

// Files
import Button from "./Button";
import { useSidebarContext } from "@/context/SidebarContext";

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  const { toggle } = useSidebarContext();
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <div
        className={`gap-4 items-center flex-shrink-0 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button onClick={toggle} variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>

        <a href="">
          <Image className="h-8 w-24" src={images.logo} alt="image" />
        </a>
      </div>

      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch ? (
          <Button
            className="flex-shrink-0"
            variant={"ghost"}
            type="button"
            size={"icon"}
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        ) : null}

        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button type="button" size={"icon"} className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          className="md:hidden"
          size={"icon"}
          variant={"ghost"}
        >
          <Search />
        </Button>

        <Button className="md:hidden" size={"icon"} variant={"ghost"}>
          <Mic />
        </Button>

        <Button size={"icon"} variant={"ghost"}>
          <Upload />
        </Button>

        <Button size={"icon"} variant={"ghost"}>
          <Bell />
        </Button>

        <Button size={"icon"} variant={"ghost"}>
          <User />
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
