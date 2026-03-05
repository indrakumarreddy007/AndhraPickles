import { motion } from "motion/react";
import { ShoppingBag, User, Search, Menu } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenProfile: () => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar({ cartCount, onOpenCart, onOpenProfile, onOpenSearch, onOpenMobileMenu }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 liquid-glass border-b border-black/5">
      <div className="flex items-center gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-serif font-bold tracking-tight text-spice-hot cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ANDHRA <span className="text-zinc-900">PICKLES</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-zinc-500">
          <button onClick={() => scrollTo("products")} className="hover:text-spice-hot transition-colors">Shop</button>
          <button onClick={() => scrollTo("ingredients")} className="hover:text-spice-hot transition-colors">Ingredients</button>
          <button onClick={() => scrollTo("newsletter")} className="hover:text-spice-hot transition-colors">Spice Club</button>
        </div>
      </div>

      <div className="flex items-center gap-5">
        <button
          onClick={onOpenSearch}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
          title="Search"
        >
          <Search size={20} />
        </button>

        <button
          onClick={onOpenProfile}
          className="p-2 hover:bg-black/5 rounded-full transition-colors"
          title="Profile"
        >
          <User size={20} />
        </button>

        <button
          onClick={onOpenCart}
          className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
          title="Cart"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 w-4 h-4 bg-spice-hot text-white text-[10px] flex items-center justify-center rounded-full font-bold"
            >
              {cartCount}
            </motion.span>
          )}
        </button>

        <button
          className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
          onClick={onOpenMobileMenu}
          title="Menu"
        >
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
}
