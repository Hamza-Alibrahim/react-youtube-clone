import logo from "../assets/Logo.png";
import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

const PageHeader = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex gap-10 lg:gap-20 justify-center sm:justify-between pt-2 mb-6 mx-4">
      <PageHeaderFirstSection showFullWidthSearch={showFullWidthSearch} />
      <form
        className={`${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }   flex-grow gap-4 justify-center`}
      >
        {showFullWidthSearch && (
          <Button
            type="button"
            onClick={() => setShowFullWidthSearch(false)}
            size={"icon"}
            variant={"ghost"}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-blue-500 outline-none"
          />
          <Button
            type="button"
            className="py-2 px-4 rounded-r-full border border-secondary-border border-l-0 flex-shrink-0"
          >
            <Search />
          </Button>
        </div>
        <Button type="button" size={"icon"} className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      <div
        className={`${
          showFullWidthSearch ? "hidden" : "flex"
        } flex-shrink-0 sm:gap-2`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size={"icon"}
          variant={"ghost"}
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size={"icon"} variant={"ghost"} className="md:hidden">
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

type PageHeaderFirstSectionProps = {
  showFullWidthSearch?: boolean;
};

export function PageHeaderFirstSection({
  showFullWidthSearch = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();
  return (
    <div
      className={`${
        showFullWidthSearch ? "hidden" : "flex"
      } sm:gap-4 items-center flex-shrink-0`}
    >
      <Button onClick={toggle} variant={"ghost"} size={"icon"}>
        <Menu />
      </Button>
      <a href="/">
        <img src={logo} className="h-6" alt="Logo image" />
      </a>
    </div>
  );
}
