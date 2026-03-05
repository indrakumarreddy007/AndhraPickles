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
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Parallax Image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2070&auto=format&fit=crop"
          alt="Spices background"
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FDFCFB]/50 to-[#FDFCFB]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
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
              className="px-8 py-4 bg-spice-hot text-white rounded-full font-semibold tracking-wide shadow-lg shadow-spice-hot/20 hover:bg-spice-extra transition-colors"
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

        <motion.div
          style={{ rotate }}
          className="relative flex justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, type: "spring" }}
            className="relative w-72 h-72 md:w-[500px] md:h-[500px]"
          >
            {/* Floating Jar Mockup */}
            <div className="absolute inset-0 bg-spice-hot/10 rounded-full blur-3xl animate-pulse" />
            <img
              src="https://images.unsplash.com/photo-1589113103503-4965503c8452?q=80&w=1974&auto=format&fit=crop"
              alt="Pickle Jar"
              className="w-full h-full object-contain drop-shadow-2xl relative z-10 rounded-2xl"
              referrerPolicy="no-referrer"
            />

            {/* Floating Spices */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 z-20"
            >
              <img src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=200&auto=format&fit=crop" alt="Chili" className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl" referrerPolicy="no-referrer" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 w-20 h-20 z-20"
            >
              <img src="https://images.unsplash.com/photo-1615485242231-80781a24739f?q=80&w=200&auto=format&fit=crop" alt="Gooseberry" className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl" referrerPolicy="no-referrer" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
