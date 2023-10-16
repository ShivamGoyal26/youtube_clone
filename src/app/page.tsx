"use client";

import CategoryPills from "@/components/CategoryPills";
import PageHeader from "@/components/PageHeader";
import Sidebar from "@/components/Sidebar";
import VideoGridItem from "@/components/VideoGridItem";
import { SidebarProvider } from "@/context/SidebarContext";
import { categories, videos } from "@/data/home";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <SidebarProvider>
      <main className="max-h-screen flex flex-col">
        <PageHeader />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <Sidebar />

          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky top-0 bg-white z-10 pb-4">
              <CategoryPills
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
                categories={categories}
              />
            </div>
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
              {videos.map((video, index) => (
                <VideoGridItem key={video.id} {...video} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
