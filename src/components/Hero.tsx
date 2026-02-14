import Image from "next/image";
import { FileText, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className=" relative overflow-hidden pt-32 pb-20  flex items-center justify-center">
      <div 
        className="bg-brand-cream w-[45%] h-full rounded-bl-[260px] absolute -top-16 right-0" 
      />
      
      <div className="max-w-7xl px-10 grid grid-cols-1 md:grid-cols-2 items-center  gap-50">
        {/* Left Content */}
        <div className="flex flex-col gap-6 ">
          <div className="flex items-center gap-2 bg-brand-cream border border-brand-green/10 w-fit px-3 py-1 rounded-md">
             <FileText size={14} className="opacity-70" />
             <span className="text-xs font-semibold opacity-70">Food Ordering Service</span>
          </div>

          <h1 className="text-[74px] font-medium leading-[100%] tracking-[-0.05em] font-brand-cormorant">
            Where Great Food <br /> Meets Great Taste.
          </h1>

          <p className="text-[18px] opacity-80 max-w-md font-brand-manrope">
            Experience a symphony of flavors crafted with passion. Premium ingredients, exquisite recipes, delivered to your door.
          </p>

          <div className="flex items-center gap-6 mt-8">
            <button className="flex items-center gap-3 bg-brand-green text-white px-8 py-4 rounded-tl-[30px] rounded-bl-[30px] rounded-br-[30px] rounded-tr-none text-[20px] font-semibold shadow-[0_20px_40px_-15px_rgba(26,60,52,0.4)] hover:bg-brand-green/90 transition-all group border-2 border-brand-green">
              Order Now
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-12 py-4 rounded-tr-[30px] rounded-br-[30px] rounded-bl-[30px] rounded-tl-none border-2 border-brand-green text-brand-green text-[20px] font-semibold hover:bg-brand-green/5 transition-all">
              View Menu
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative flex justify-center">
          <div className="relative w-[500px] h-[500px]">
            <Image
              src="/assets/heroimg.svg"
              alt="Hero Image"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
