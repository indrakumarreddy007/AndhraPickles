import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const links = [
    { label: "Shop", section: "products" },
    { label: "Ingredients", section: "ingredients" },
    { label: "Spice Club", section: "newsletter" },
];

export default function MobileMenu({ isOpen, onClose }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        className="fixed left-0 top-0 bottom-0 z-[80] w-72 bg-white shadow-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
                            <span className="text-xl font-serif font-bold text-spice-hot">ANDHRA <span className="text-zinc-900">PICKLES</span></span>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 px-6 py-8">
                            <ul className="space-y-2">
                                {links.map((link, i) => (
                                    <motion.li
                                        key={link.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <button
                                            onClick={() => { scrollTo(link.section); onClose(); }}
                                            className="w-full text-left px-4 py-4 rounded-2xl text-xl font-bold hover:bg-spice-hot/5 hover:text-spice-hot transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    </motion.li>
                                ))}
                            </ul>
                        </nav>

                        <div className="px-6 py-6 border-t border-zinc-100">
                            <div className="text-xs text-zinc-400 uppercase tracking-widest mb-3">Quick Info</div>
                            <div className="space-y-2 text-sm text-zinc-500">
                                <p>📦 Free shipping over $50</p>
                                <p>🌶️ Authentic Andhra recipes</p>
                                <p>🏠 Handcrafted in small batches</p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
