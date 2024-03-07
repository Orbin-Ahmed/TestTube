import "./App.css";
import "./index.css";
import PageHeader from "./layouts/PageHeader";
import CategoryPills from "./components/CategoryPills";
import { Categories, videos } from "./data/home";
import { useState } from "react";
import VideoGridItem from "./components/VideoGridItem";
import Sidebar from "./layouts/Sidebar";
import { SidebarProvider } from "./contexts/sideBarContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(Categories[0]);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto_1fr] flex-grow-1 overflow-auto">
          <Sidebar />
          <div className="overflow-x-hidden pb-4 px-8">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                categories={Categories}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
