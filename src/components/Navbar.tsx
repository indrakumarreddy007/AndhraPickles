import { motion } from "motion/react";
import { ShoppingBag, User, Search, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 liquid-glass border-b border-black/5">
      <div className="flex items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tight text-spice-hot"
        >
          ANDHRA <span className="text-zinc-900">PICKLES</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
          <a href="#" className="hover:text-spice-hot transition-colors">Shop</a>
          <a href="#" className="hover:text-spice-hot transition-colors">Our Story</a>
          <a href="#" className="hover:text-spice-hot transition-colors">Ingredients</a>
          <a href="#" className="hover:text-spice-hot transition-colors">Wholesale</a>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <User size={20} />
        </button>
        <button className="p-2 hover:bg-black/5 rounded-full transition-colors relative">
          <ShoppingBag size={20} />
          <span className="absolute top-0 right-0 w-4 h-4 bg-spice-hot text-white text-[10px] flex items-center justify-center rounded-full">2</span>
        </button>
        <button className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
