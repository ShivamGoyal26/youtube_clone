import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import React, { ElementType, ReactNode, useState } from "react";
import Button, { buttonStyles } from "./Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "@/data/sidebar";
import { useSidebarContext } from "@/context/SidebarContext";

type SmallSidebarItemProps = {
  title: string;
  url: string;
  Icon: ElementType;
};

type LargeSidebarItemProps = {
  title: string;
  url: string;
  Icon: ElementType | string;
  isActive?: boolean;
};

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

const SmallSidebarItem = ({ title, Icon, url }: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
};

const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const showExpandedButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title ? <div className="ml-4 mt-2 text-lg mb-1">{title}</div> : null}
      {visibleChildren}
      {showExpandedButton ? (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          className="w-full flex items-center rounded-lg gap-4 p-3"
          variant={"ghost"}
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      ) : null}
    </div>
  );
};

const LargeSidebarItem = ({
  title,
  Icon,
  url,
  isActive = false,
}: LargeSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof Icon === "string" ? (
        <img src={Icon} className="w-6 h-6 rounded-full" />
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
};

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/Shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/Subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/Library" />
      </aside>

      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <LargeSidebarSection>
          <LargeSidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargeSidebarItem
            Icon={Clapperboard}
            title="Subscriptions"
            url="/Subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem Icon={Library} title="Library" url="/" />
          <LargeSidebarItem Icon={History} title="History" url="/" />
          <LargeSidebarItem Icon={PlaySquare} title="Your Videos" url="/" />
          <LargeSidebarItem Icon={Clock} title="Watch Later" url="/" />
          <LargeSidebarItem Icon={Library} title="Library" url="/" />
          {playlists.map((platlist) => (
            <LargeSidebarItem
              key={platlist.id}
              Icon={ListVideo}
              title={platlist.name}
              url="/"
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscribe) => (
            <LargeSidebarItem
              key={subscribe.id}
              Icon={subscribe.imgUrl}
              title={subscribe.channelName}
              url="/"
            />
          ))}
        </LargeSidebarSection>

        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem Icon={Flame} title={"Trending"} url="/" />
          <LargeSidebarItem Icon={ShoppingBag} title={"Shopping"} url="/" />
          <LargeSidebarItem Icon={Film} title={"Music & TV"} url="/" />
          <LargeSidebarItem Icon={Radio} title={"Live"} url="/" />
          <LargeSidebarItem Icon={Gamepad2} title={"Gaming"} url="/" />
          <LargeSidebarItem Icon={Newspaper} title={"News"} url="/" />
          <LargeSidebarItem Icon={Trophy} title={"Sports"} url="/" />
          <LargeSidebarItem Icon={Lightbulb} title={"Learning"} url="/" />
          <LargeSidebarItem Icon={Shirt} title={"Fashion & Beauty"} url="/" />
          <LargeSidebarItem Icon={Podcast} title={"Podcasts"} url="/" />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default Sidebar;
