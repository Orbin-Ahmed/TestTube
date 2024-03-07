import React, { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Home,
  Library,
  PlaySquare,
  Repeat,
  History,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
} from "lucide-react";
import { ElementType, ReactNode } from "react";
import Button, { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { subscriptions, playlists } from "../data/sidebar";
import { useSidebarContext } from "../contexts/sideBarContext";
import { PageHeaderFirstSection } from "./PageHeader";

function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  useEffect(() => {}, []);

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        ></div>
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargesidebarItem isActive Icon={Home} title="Home" url="/" />
          <LargesidebarItem
            Icon={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargesidebarItem Icon={Library} title="Library" url="/library" />
          <LargesidebarItem Icon={History} title="History" url="/history" />
          <LargesidebarItem
            Icon={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargesidebarItem
            Icon={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargesidebarItem
              key={playlist.id}
              Icon={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((subscription) => (
            <LargesidebarItem
              key={subscription.id}
              Icon={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargesidebarItem Icon={Flame} title="Trending" url="/trending" />
          <LargesidebarItem
            Icon={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargesidebarItem Icon={Music2} title="Music" url="/music" />
          <LargesidebarItem Icon={Film} title="Movies & TV" url="/movies-tv" />
          <LargesidebarItem Icon={Radio} title="Live" url="/live" />
          <LargesidebarItem Icon={Gamepad2} title="Gaming" url="/gaming" />
          <LargesidebarItem Icon={Newspaper} title="News" url="/news" />
          <LargesidebarItem Icon={Trophy} title="Sports" url="/sports" />
          <LargesidebarItem Icon={Lightbulb} title="Learning" url="/learning" />
          <LargesidebarItem
            Icon={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargesidebarItem Icon={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSidebarSection>
      </aside>
    </>
  );
}

export default Sidebar;

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSideBarItemProps) {
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
}

type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = React.Children.toArray(children).flat();
  const visiblechildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const showExpandButton = childrenArray.length > visibleItemCount;
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg">{title}</div>}
      {visiblechildren}
      {showExpandButton && (
        <Button
          variant="ghost"
          className="p-3 w-full flex items-center rounded-lg gap-4"
          onClick={() => setIsExpanded((e) => !e)}
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}

type LargesidebarItemProps = {
  Icon: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargesidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: LargesidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `p-3 w-full flex items-center rounded-lg gap-4 ${
          isActive
            ? "font-bold bg-neutral-100 hover:bg-secondary-default"
            : undefined
        }`
      )}
    >
      {typeof Icon == "string" ? (
        <img src={Icon} className="w-6 h-6 rounded-full" />
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
