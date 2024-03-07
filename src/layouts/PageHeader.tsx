import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import TestTubeLogo from "../assets/Logo.png";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/sideBarContext";

function PageHeader() {
  const [fullWidthSearch, setFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection hidden={fullWidthSearch} />
      <form
        className={`gap-4 flex-grow justify-center items-center ${
          fullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        <Button
          onClick={() => setFullWidthSearch(false)}
          type="button"
          size="icon"
          variant="ghost"
          className={`flex-shrink-0 ${fullWidthSearch ? "flex" : "hidden"}`}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 focus:shadow-inner outline-none"
          />
          <Button className="py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="flex-shrink-0"
        >
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          fullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setFullWidthSearch(true)}
          className="md:hidden"
          size="icon"
          variant="ghost"
        >
          <Search />
        </Button>
        <Button className="md:hidden" size="icon" variant="ghost">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

export default PageHeader;

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div className={`items-center flex-shrink-0 ${hidden ? "hidden" : "flex"}`}>
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img className="h-8" src={TestTubeLogo} />
      </a>
    </div>
  );
}
