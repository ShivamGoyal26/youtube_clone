"use client";

import CategoryPills from "@/components/CategoryPills";
import PageHeader from "@/components/PageHeader";
import { categories } from "@/data/home";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <div>sidebar</div>

        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
              categories={categories}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
