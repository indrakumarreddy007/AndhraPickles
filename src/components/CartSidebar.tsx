import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingCart, Minus, Plus, Trash2, Package } from "lucide-react";

export interface CartItem {
    id: number;
    name: string;
    price: string;
    image: string;
    tag: string;
    quantity: number;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQty: (id: number, delta: number) => void;
    onRemove: (id: number) => void;
}

function priceNum(p: string) {
    return parseFloat(p.replace("$", "")) || 0;
}

export default function CartSidebar({ isOpen, onClose, items, onUpdateQty, onRemove }: Props) {
    const subtotal = items.reduce((s, i) => s + priceNum(i.price) * i.quantity, 0);
    const shipping = subtotal > 0 ? 4.99 : 0;
    const total = subtotal + shipping;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.aside
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
                            <div className="flex items-center gap-3">
                                <ShoppingCart size={22} className="text-spice-hot" />
                                <h2 className="text-xl font-bold tracking-tight">YOUR CART</h2>
                                <span className="bg-spice-hot text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {items.reduce((s, i) => s + i.quantity, 0)}
                                </span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-16">
                                    <Package size={56} className="text-zinc-200" />
                                    <p className="text-zinc-400 font-medium">Your cart is empty</p>
                                    <button
                                        onClick={onClose}
                                        className="px-6 py-3 bg-spice-hot text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
                                    >
                                        EXPLORE PICKLES
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {items.map(item => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: 40 }}
                                            className="flex gap-4 p-3 rounded-2xl border border-zinc-100 hover:border-zinc-200 transition-colors"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-sm truncate">{item.name}</p>
                                                        <p className="text-[10px] uppercase tracking-widest text-zinc-400 mt-0.5">{item.tag}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => onRemove(item.id)}
                                                        className="p-1 hover:text-red-500 transition-colors ml-2"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center border border-zinc-200 rounded-full overflow-hidden">
                                                        <button
                                                            onClick={() => onUpdateQty(item.id, -1)}
                                                            className="px-3 py-1.5 hover:bg-zinc-100 transition-colors"
                                                        >
                                                            <Minus size={12} />
                                                        </button>
                                                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                                                        <button
                                                            onClick={() => onUpdateQty(item.id, 1)}
                                                            className="px-3 py-1.5 hover:bg-zinc-100 transition-colors"
                                                        >
                                                            <Plus size={12} />
                                                        </button>
                                                    </div>
                                                    <p className="font-bold text-spice-hot">
                                                        ${(priceNum(item.price) * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="border-t border-zinc-100 px-6 py-6 space-y-4 bg-zinc-50/50">
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-zinc-500">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-zinc-500">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base pt-2 border-t border-zinc-200">
                                        <span>Total</span>
                                        <span className="text-spice-hot">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold tracking-wide hover:bg-spice-hot transition-colors shadow-lg"
                                >
                                    CHECKOUT → ${total.toFixed(2)}
                                </motion.button>
                                <p className="text-center text-xs text-zinc-400">Free returns · Secure checkout</p>
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
