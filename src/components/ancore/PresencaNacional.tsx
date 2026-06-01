import { motion } from "framer-motion";
import CountUp from "react-countup";
import { MapPin } from "lucide-react";

export function PresencaNacional() {
  return (
    <section className="py-24 relative border-y border-white/5 bg-[#080808]">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#e50914 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      <div className="container relative z-10 px-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-display font-black tracking-tighter mb-6 leading-tight">
              A proteção veicular que <span className="text-red-500">dominou o Brasil!</span>
            </h2>
            <ul className="space-y-4">
              {[
                "Assistência e oficinas em todo o Brasil.",
                "Ancore sempre perto de você!",
                "Nosso time é composto por mais de 1000 colaboradores diretos e indiretos.",
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground/90 font-medium">
                  <div className="h-6 w-6 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={12} />
                  </div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          {[
            { num: 30, prefix: "+", suffix: "", label: "escritórios" },
            { num: 12, prefix: "", suffix: "", label: "estados" },
            { num: 52, prefix: "+", suffix: " milhões", label: "pagos em indenizações" },
            { num: 195, prefix: "+", suffix: " mil", label: "famílias protegidas" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl sm:text-4xl font-black font-display text-white mb-2">
                {stat.prefix}
                <CountUp end={stat.num} duration={2.5} enableScrollSpy scrollSpyOnce />
                {stat.suffix}
              </div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
