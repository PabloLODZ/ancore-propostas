import { motion } from "framer-motion";
import { CheckSquare } from "lucide-react";

export function BeneficiosInclusos() {
  const items = [
    "Proteção contra roubo e furto",
    "Assistência em momentos de emergência",
    "Suporte 24h",
    "Proteção para terceiros",
    "Rede de descontos",
    "Atendimento próximo e humanizado"
  ];

  return (
    <section className="py-24 bg-[#080808] border-y border-white/5">
      <div className="container px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mb-12">O que você recebe ao se filiar?</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="h-10 w-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                <CheckSquare size={18} />
              </div>
              <span className="font-bold text-gray-200 text-left">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
