import { motion } from "motion/react";

const ingredients = [
  { name: "Guntur Chilies", desc: "World-renowned for their heat and deep red color.", img: "https://picsum.photos/seed/chili1/400/400" },
  { name: "Mustard Seeds", desc: "Stone-ground to release essential oils and pungency.", img: "https://picsum.photos/seed/mustard/400/400" },
  { name: "Cold-Pressed Oil", desc: "Pure sesame oil for that authentic nutty aroma.", img: "https://picsum.photos/seed/oil/400/400" },
  { name: "Sea Salt", desc: "Hand-harvested from the coastlines of Andhra.", img: "https://picsum.photos/seed/salt/400/400" },
];

export default function IngredientsSection() {
  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-bold mb-6">
              THE <span className="text-spice-medium italic">ALCHEMY</span> <br />
              OF SPICE
            </h2>
            <p className="text-zinc-400 text-xl font-light leading-relaxed">
              We don't just make pickles; we preserve a heritage. Every ingredient is sourced directly from farmers in the heart of Andhra Pradesh.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-8xl font-serif opacity-10">100%</div>
            <div className="text-sm uppercase tracking-[0.3em] font-bold">Natural Ingredients</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {ingredients.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-3xl mb-6">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">{item.name}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
