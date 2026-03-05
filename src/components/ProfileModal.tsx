import { motion, AnimatePresence } from "motion/react";
import { X, User, Package, Heart, LogIn, Star, MapPin, Phone, Mail } from "lucide-react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const MOCK_ORDERS = [
    { id: "#AP2401", date: "Feb 20, 2026", items: "Avakaya Pickle × 2", total: "$25.98", status: "Delivered" },
    { id: "#AP2389", date: "Jan 15, 2026", items: "Chicken Pickle × 1, Amla Pickle × 1", total: "$30.49", status: "Delivered" },
];

export default function ProfileModal({ isOpen, onClose }: Props) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm"
                    />
                    <motion.aside
                        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 28, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white shadow-2xl flex flex-col overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
                            <div className="flex items-center gap-3">
                                <User size={22} className="text-spice-hot" />
                                <h2 className="text-xl font-bold tracking-tight">MY PROFILE</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Profile Hero */}
                        <div className="bg-gradient-to-br from-spice-hot/5 to-orange-50 px-6 py-8 flex items-center gap-5">
                            <div className="w-20 h-20 rounded-full bg-spice-hot/10 border-2 border-spice-hot/20 flex items-center justify-center flex-shrink-0">
                                <User size={36} className="text-spice-hot" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Indra Kumar</h3>
                                <p className="text-zinc-500 text-sm">indra.varikuti@gmail.com</p>
                                <div className="flex items-center gap-1 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-xs text-zinc-400 ml-1">Loyal Member</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 border-b border-zinc-100">
                            {[
                                { label: "Orders", value: "2" },
                                { label: "Wishlist", value: "3" },
                                { label: "Reviews", value: "1" },
                            ].map(stat => (
                                <div key={stat.label} className="py-5 text-center border-r border-zinc-100 last:border-r-0">
                                    <p className="text-2xl font-bold text-spice-hot">{stat.value}</p>
                                    <p className="text-xs text-zinc-400 uppercase tracking-widest mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Orders */}
                        <div className="px-6 py-5">
                            <div className="flex items-center gap-2 mb-4">
                                <Package size={16} className="text-zinc-500" />
                                <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500">Recent Orders</h4>
                            </div>
                            <div className="space-y-3">
                                {MOCK_ORDERS.map(order => (
                                    <div key={order.id} className="p-4 rounded-2xl border border-zinc-100 hover:border-zinc-200 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm">{order.id}</span>
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">{order.status}</span>
                                        </div>
                                        <p className="text-xs text-zinc-400">{order.date}</p>
                                        <p className="text-sm text-zinc-600 mt-1.5">{order.items}</p>
                                        <p className="text-sm font-bold text-spice-hot mt-1">{order.total}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className="px-6 py-5 border-t border-zinc-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Heart size={16} className="text-zinc-500" />
                                <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500">Wishlist</h4>
                            </div>
                            <div className="space-y-2">
                                {["Garlic Pickle", "Gongura Pickle", "Prawn Pickle"].map(name => (
                                    <div key={name} className="flex items-center justify-between p-3 rounded-xl bg-zinc-50">
                                        <span className="text-sm font-medium">{name}</span>
                                        <Heart size={14} className="fill-spice-hot text-spice-hot" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="px-6 py-5 border-t border-zinc-100">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500 mb-4">Contact & Delivery</h4>
                            <div className="space-y-3 text-sm text-zinc-600">
                                <div className="flex items-center gap-3"><Phone size={14} /> +91 98765 43210</div>
                                <div className="flex items-center gap-3"><Mail size={14} /> indra.varikuti@gmail.com</div>
                                <div className="flex items-center gap-3"><MapPin size={14} /> Hyderabad, Telangana 500032</div>
                            </div>
                        </div>

                        {/* Sign Out */}
                        <div className="px-6 py-5 mt-auto border-t border-zinc-100">
                            <button className="w-full flex items-center justify-center gap-2 py-3 border border-zinc-200 rounded-2xl text-sm font-bold text-zinc-600 hover:bg-zinc-50 transition-colors">
                                <LogIn size={16} />
                                SIGN OUT
                            </button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
