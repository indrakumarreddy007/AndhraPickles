import { motion } from "motion/react";

interface SpiceSliderProps {
  level: number;
  onChange: (level: number) => void;
}

export default function SpiceSlider({ level, onChange }: SpiceSliderProps) {
  const labels = ["Mild", "Medium", "Hot", "Extra Hot"];
  const colors = ["#EAB308", "#F97316", "#DC2626", "#7F1D1D"];

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <h2 className="text-4xl font-serif font-bold text-center">
        CHOOSE YOUR <span className="italic text-spice-hot">INTENSITY</span>
      </h2>
      
      <div className="relative w-full max-w-2xl px-8 py-12 liquid-glass rounded-full border border-black/5">
        <div className="flex justify-between items-center relative z-10">
          {labels.map((label, i) => (
            <button
              key={label}
              onClick={() => onChange(i)}
              className="flex flex-col items-center gap-2 group"
            >
              <motion.div
                animate={{
                  scale: level === i ? 1.5 : 1,
                  backgroundColor: level === i ? colors[i] : "#E5E7EB"
                }}
                className="w-4 h-4 rounded-full shadow-inner transition-colors"
              />
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${level === i ? 'text-zinc-900' : 'text-zinc-400'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
        
        {/* Track */}
        <div className="absolute top-1/2 left-12 right-12 h-1 bg-zinc-100 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div
            animate={{ width: `${(level / (labels.length - 1)) * 100}%`, backgroundColor: colors[level] }}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
