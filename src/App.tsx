import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import SpiceSlider from "./components/SpiceSlider";
import IngredientsSection from "./components/IngredientsSection";
import { Plus, X, Shield, ShieldOff } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  spiceLevel: number;
  tag: string;
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [spiceLevel, setSpiceLevel] = useState(2);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "$",
    image: "",
    spiceLevel: 2,
    tag: "New Arrival"
  });

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  const spiceColors = ["#EAB308", "#F97316", "#DC2626", "#7F1D1D"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--color-spice-hot', spiceColors[spiceLevel]);
  }, [spiceLevel]);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct)
    });
    if (res.ok) {
      setShowAddModal(false);
      fetchProducts();
      setNewProduct({ name: "", price: "$", image: "", spiceLevel: 2, tag: "New Arrival" });
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        setNewsletterStatus("success");
        setNewsletterMsg(data.message);
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMsg(data.error ?? "Something went wrong.");
      }
    } catch {
      setNewsletterStatus("error");
      setNewsletterMsg("Network error – please try again.");
    }
  };

  return (
    <div className="min-h-screen selection:bg-spice-hot selection:text-white">
      <Navbar />

      <main>
        <Hero />

        {/* Admin Toggle */}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
          {isAdmin && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={() => setShowAddModal(true)}
              className="p-4 bg-spice-hot text-white rounded-full shadow-2xl hover:bg-spice-extra transition-colors"
            >
              <Plus size={24} />
            </motion.button>
          )}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`p-4 rounded-full shadow-2xl transition-all ${isAdmin ? 'bg-zinc-900 text-white' : 'bg-white text-zinc-900'}`}
          >
            {isAdmin ? <Shield size={24} /> : <ShieldOff size={24} />}
          </button>
        </div>

        {/* Add Product Modal */}
        <AnimatePresence>
          {showAddModal && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center px-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-3xl font-serif font-bold">Add New Pickle</h3>
                  <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
                </div>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Name</label>
                    <input required value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full p-3 rounded-xl border border-zinc-100 focus:ring-2 focus:ring-spice-hot outline-none" placeholder="e.g. Garlic Pickle" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Price</label>
                      <input required value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full p-3 rounded-xl border border-zinc-100 focus:ring-2 focus:ring-spice-hot outline-none" placeholder="$12.99" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Spice Level (1-3)</label>
                      <input type="number" min="1" max="3" required value={newProduct.spiceLevel} onChange={e => setNewProduct({ ...newProduct, spiceLevel: parseInt(e.target.value) })} className="w-full p-3 rounded-xl border border-zinc-100 focus:ring-2 focus:ring-spice-hot outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Image URL</label>
                    <input required value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} className="w-full p-3 rounded-xl border border-zinc-100 focus:ring-2 focus:ring-spice-hot outline-none" placeholder="https://..." />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Tag</label>
                    <input required value={newProduct.tag} onChange={e => setNewProduct({ ...newProduct, tag: e.target.value })} className="w-full p-3 rounded-xl border border-zinc-100 focus:ring-2 focus:ring-spice-hot outline-none" placeholder="New Arrival" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-spice-hot text-white rounded-xl font-bold hover:bg-spice-extra transition-colors shadow-lg">
                    ADD PRODUCT
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Spice Selection Section */}
        <section className="container mx-auto px-6 mb-24">
          <SpiceSlider level={spiceLevel} onChange={setSpiceLevel} />
        </section>

        {/* Products Grid */}
        <section id="products" className="container mx-auto px-6 mb-32">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-5xl font-serif font-bold mb-4">OUR SIGNATURE <span className="italic">COLLECTION</span></h2>
              <p className="text-zinc-500">Authentic flavors from the heart of Andhra.</p>
            </div>
            {isAdmin && <span className="text-spice-hot font-bold animate-pulse">ADMIN MODE ACTIVE</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            <AnimatePresence mode="popLayout">
              {products.filter(p => p.spiceLevel <= spiceLevel + 1).map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard
                    {...product}
                    isAdmin={isAdmin}
                    onDelete={handleDeleteProduct}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <div id="ingredients">
          <IngredientsSection />
        </div>

        {/* Newsletter / CTA */}
        <section id="newsletter" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-spice-hot/5 -z-10" />
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-bold mb-8">
                JOIN THE <br />
                <span className="text-spice-hot italic">SPICE CLUB</span>
              </h2>
              <p className="text-zinc-600 text-xl mb-12 max-w-2xl mx-auto font-light">
                Get early access to seasonal batches, exclusive recipes, and 15% off your first order.
              </p>
              {newsletterStatus === "success" || newsletterStatus === "error" ? (
                <p className={`text-lg font-semibold ${newsletterStatus === "success" ? "text-green-600" : "text-red-500"}`}>
                  {newsletterMsg}
                </p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-8 py-4 rounded-full bg-white border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-spice-hot transition-all"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "loading"}
                    className="px-8 py-4 bg-zinc-900 text-white rounded-full font-bold hover:bg-spice-hot transition-colors shadow-xl disabled:opacity-60"
                  >
                    {newsletterStatus === "loading" ? "SUBSCRIBING…" : "SUBSCRIBE"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-zinc-100 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-2xl font-serif font-bold tracking-tight text-spice-hot">
              ANDHRA <span className="text-zinc-900">PICKLES</span>
            </div>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
              <a href="#" className="hover:text-zinc-900">Privacy</a>
              <a href="#" className="hover:text-zinc-900">Terms</a>
              <a href="#" className="hover:text-zinc-900">Shipping</a>
              <a href="#" className="hover:text-zinc-900">Contact</a>
            </div>
            <div className="text-zinc-400 text-xs">
              © 2024 Andhra Pickles. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
