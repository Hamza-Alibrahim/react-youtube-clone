import PageHeader from "./layouts/PageHeader";
import CategoryPills from "./components/CategoryPills";
import { categories, videos } from "./data/home";
import { useState } from "react";
import VideoGridItem from "./components/VideoGridItem";
import SideBar from "./layouts/SideBar";
import { SidebarProvider } from "./contexts/SidebarContext";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col select-none">
        <PageHeader />
        <div className="grid sm:grid-cols-[auto,1fr] flex-grow overflow-auto">
          <SideBar />
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((e) => {
                return <VideoGridItem key={e.id} {...e} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};
export default App;
