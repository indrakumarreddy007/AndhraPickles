import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50" />
        {/* Decorative spice dots */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-spice-hot/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-200/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFCFB]/20 to-[#FDFCFB]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-spice-hot/10 text-spice-hot text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <span>🌶️</span> Authentic Andhra Recipes
          </div>
          <h1 className="text-7xl md:text-9xl font-bold leading-none tracking-tighter mb-6">
            THE <span className="text-spice-hot italic">SOUL</span> OF <br />
            ANDHRA
          </h1>
          <p className="text-xl text-zinc-600 max-w-md mb-8 font-light leading-relaxed">
            Handcrafted with sun-dried chilies, cold-pressed oils, and ancestral recipes passed down through generations.
          </p>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("products")}
              className="px-8 py-4 bg-spice-hot text-white rounded-full font-semibold tracking-wide shadow-lg shadow-spice-hot/20 hover:opacity-90 transition-opacity"
            >
              SHOP NOW
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo("ingredients")}
              className="px-8 py-4 border border-zinc-200 rounded-full font-semibold tracking-wide hover:bg-zinc-50 transition-colors"
            >
              OUR INGREDIENTS
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Hero Image */}
        <motion.div style={{ rotate }} className="relative flex justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, type: "spring" }}
            className="relative w-72 h-72 md:w-[480px] md:h-[480px]"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-spice-hot/15 rounded-full blur-3xl animate-pulse" />

            {/* Main jar image — local asset */}
            <img
              src="/images/hero_pickle_jar.png"
              alt="Andhra Pickle Jar"
              className="w-full h-full object-cover drop-shadow-2xl relative z-10 rounded-3xl"
            />

            {/* Floating — Chicken Pickle */}
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 z-20"
            >
              <img
                src="/images/chicken_pickle.png"
                alt="Chicken Pickle"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
              />
            </motion.div>

            {/* Floating — Avakaya Pickle */}
            <motion.div
              animate={{ y: [0, 18, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-20 h-20 z-20"
            >
              <img
                src="/images/avakaya_pickle.png"
                alt="Avakaya Pickle"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
              />
            </motion.div>

            {/* Floating — Lemon Pickle */}
            <motion.div
              animate={{ x: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 -right-14 w-16 h-16 z-20"
            >
              <img
                src="/images/lemon_pickle.png"
                alt="Lemon Pickle"
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
