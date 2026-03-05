import { motion } from "motion/react";
import { ShoppingCart, Star, Trash2, Flame } from "lucide-react";

interface ProductProps {
  id: number;
  name: string;
  price: string;
  image: string;
  spiceLevel: number;
  tag: string;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onAddToCart?: () => void;
}

export default function ProductCard({ id, name, price, image, spiceLevel, tag, isAdmin, onDelete, onAddToCart }: ProductProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all duration-500 border border-zinc-100"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-zinc-50">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest">
          {tag}
        </div>

        {isAdmin && (
          <button
            onClick={() => onDelete?.(id)}
            className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-serif font-bold group-hover:text-spice-hot transition-colors leading-tight">{name}</h3>
          <span className="text-lg font-bold text-spice-hot ml-2">{price}</span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={12} className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-zinc-200"} />
          ))}
          <span className="text-xs text-zinc-400 ml-2">(120)</span>
        </div>

        <div className="flex items-center justify-between">
          {/* Spice Level */}
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Flame
                key={i}
                size={14}
                className={i < spiceLevel ? "fill-spice-hot text-spice-hot" : "text-zinc-200"}
              />
            ))}
          </div>

          {/* Add to Cart */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAddToCart}
            className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 text-white rounded-full text-xs font-bold hover:bg-spice-hot transition-colors"
          >
            <ShoppingCart size={14} />
            ADD
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
