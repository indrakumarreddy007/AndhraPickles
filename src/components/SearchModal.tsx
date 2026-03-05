import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ShoppingCart, Flame } from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    spiceLevel: number;
    tag: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export default function SearchModal({ isOpen, onClose, products, onAddToCart }: Props) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery("");
        }
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    const results = query.trim()
        ? products.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.tag.toLowerCase().includes(query.toLowerCase())
        )
        : products;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[70] bg-white/95 backdrop-blur-xl flex flex-col"
                >
                    {/* Search bar */}
                    <div className="flex items-center gap-4 px-6 md:px-16 py-6 border-b border-zinc-100">
                        <Search size={22} className="text-zinc-400 flex-shrink-0" />
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Search pickles… (e.g. Avakaya, Lemon)"
                            className="flex-1 text-xl outline-none bg-transparent font-light placeholder:text-zinc-300"
                        />
                        <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                            <X size={22} />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="flex-1 overflow-y-auto px-6 md:px-16 py-8">
                        <p className="text-xs text-zinc-400 uppercase tracking-widest mb-6 font-bold">
                            {query ? `${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"` : "ALL PRODUCTS"}
                        </p>

                        {results.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-zinc-300 text-6xl mb-4">🫙</p>
                                <p className="text-zinc-400 font-medium">No pickles found for "{query}"</p>
                                <p className="text-zinc-300 text-sm mt-2">Try "Avakaya", "Chicken" or "Lemon"</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {results.map(product => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-zinc-50">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-2 left-2 bg-white/90 text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
                                                {product.tag}
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-sm group-hover:text-spice-hot transition-colors">{product.name}</h3>
                                        <div className="flex items-center justify-between mt-1">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(product.spiceLevel)].map((_, i) => (
                                                    <Flame key={i} size={10} className="fill-spice-hot text-spice-hot" />
                                                ))}
                                            </div>
                                            <span className="font-bold text-spice-hot text-sm">{product.price}</span>
                                        </div>
                                        <button
                                            onClick={() => { onAddToCart(product); onClose(); }}
                                            className="mt-2 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-zinc-900 text-white text-xs font-bold hover:bg-spice-hot transition-colors"
                                        >
                                            <ShoppingCart size={12} /> ADD TO CART
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
