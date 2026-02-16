"use client";

import { useState, useEffect } from "react";
import MenuCard from "@/components/MenuCard";
import { Utensils, ChefHat, CakeSlice, Coffee, Info } from "lucide-react";
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

const iconMap: Record<string, any> = {
  Starters: Utensils,
  "Main Courses": ChefHat,
  "Main Course": ChefHat,
  Desserts: CakeSlice,
  Drinks: Coffee,
  Beverages: Coffee,
};

export default function CategoryShowcase() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const [catRes, itemRes] = await Promise.all([
        fetch("http://localhost:5000/api/categories"),
        fetch("http://localhost:5000/api/menu-item"),
      ]);

      const catData: Category[] = await catRes.json();
      const itemData: MenuItem[] = await itemRes.json();

      setCategories(catData);

      const availableItems = itemData.filter((item) => item.isAvailable);
      setMenuItems(availableItems);

      if (isInitial && catData.length > 0) {
        setActiveCategory(catData[0].id);
      }
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

  const filteredItems = activeCategory
    ? menuItems.filter((item) => item.categoryId === activeCategory)
    : [];

  const itemsToShow = filteredItems.slice(0, 4);

  return (
    <section className="py-20 mb-20 -mt-10 px-10 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-[54px] font-medium font-brand-cormorant leading-tight text-brand-green">
          Curated Categories
        </h2>
        <p className="text-[18px] font-brand-manrope mt-2 text-brand-green">
          Explore our diverse menu of culinary delights.
        </p>
      </div>

      <div className="flex justify-center gap-6 mb-24 overflow-x-auto py-6 scrollbar-hide">
        {categories.map((cat) => {
          const IconComponent = iconMap[cat.name] || Info;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex flex-col items-center justify-center min-w-[200px] py-3 rounded-[30px] rounded-tr-none rounded-bl-none transition-all duration-300 group ${
                activeCategory === cat.id
                  ? "bg-brand-cream shadow-[0_10px_20px_3px_rgba(0,0,0,0.05)]"
                  : " bg-gray-200/20"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  activeCategory === cat.id
                    ? "bg-brand-green text-white"
                    : " bg-brand-green text-white"
                }`}
              >
                <IconComponent size={28} />
              </div>
              <span className="text-[20px] font-semibold font-brand-manrope text-brand-green">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="min-h-[400px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Spinner size={48} />
            <p className="text-brand-green/40 font-medium animate-pulse font-brand-manrope">
              Loading our delicious menu...
            </p>
          </div>
        ) : itemsToShow.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20 mt-12">
            {itemsToShow.map((item) => (
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
          <div className="text-center py-20 text-brand-green/40 font-medium font-brand-manrope">
            No dishes found in this category.
          </div>
        )}
      </div>
    </section>
  );
}
