"use client";

import { useState, useEffect } from "react";
import MenuCard from "@/components/MenuCard";
import { Spinner } from "@/components/ui/spinner";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  categoryId: string;
  isAvailable: boolean;
  category?: Category;
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [catRes, itemRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/categories`,
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/menu-item`,
        ),
      ]);

      const catData: Category[] = await catRes.json();
      const itemData: MenuItem[] = await itemRes.json();

      setCategories(["All", ...catData.map((c) => c.name)]);

      setMenuItems(itemData.filter((item) => item.isAvailable));
    } catch (err) {
      console.error("Failed to fetch menu data", err);
    } finally {
      if (isInitial) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    const interval = setInterval(() => {
      fetchData(false);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category?.name === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-24 pb-12 text-center">
        <h1 className="text-[64px] font-bold text-brand-green font-brand-cormorant mb-2 tracking-tight">
          Our Menu
        </h1>
        <p className="text-brand-green/70 font-brand-manrope text-lg max-w-2xl mx-auto">
          Discover our selection of premium dishes, crafted with passion.
        </p>
      </section>

      <section className="flex justify-center items-center gap-4 mb-20 px-4 flex-wrap">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all border ${
              activeCategory === category
                ? "bg-brand-green text-white border-brand-green shadow-sm shadow-brand-green/20"
                : "bg-[#F3F1ED] text-brand-green border-brand-green/20"
            }`}
          >
            {category}
          </button>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-10 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Spinner size={48} />
            <p className="text-brand-green/40 font-medium animate-pulse">
              Loading our delicious menu...
            </p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description || ""}
                price={Number(item.price)}
                image={item.image || "/assets/item1.svg"}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-brand-green/40 font-medium">
            No dishes found in this category.
          </div>
        )}
      </section>
    </div>
  );
}
