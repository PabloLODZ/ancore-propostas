import { motion } from "framer-motion";
import { ShieldCheck, CarFront, FileText, Phone } from "lucide-react";

export function HeroSection({ mode = "view" }: { mode?: "edit" | "view" }) {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* Background with red glow and grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,9,20,0.2),transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
        {/* Placeholder for Vehicle Image (user will replace) */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#080808] to-transparent z-10" />
      </div>

      <div className="container relative z-20 px-4 pt-20 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-sm mb-8"
        >
          <ShieldCheck size={16} />
          <span>Com você em todo momento</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl leading-[1.1]"
        >
          Proposta de Filiação <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Ancore</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground/80 mb-12 max-w-2xl mx-auto font-medium"
        >
          Proteção veicular para você seguir com mais tranquilidade, assistência e suporte em todos os momentos.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#resumo" className="h-14 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(229,9,20,0.3)] hover:shadow-[0_0_40px_rgba(229,9,20,0.5)] w-full sm:w-auto">
            <FileText size={18} />
            Ver minha proposta
          </a>
          <a href="#cta" className="h-14 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all border border-white/10 w-full sm:w-auto">
            <Phone size={18} />
            Falar com consultor
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-bold text-muted-foreground/60 uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" /> Sem consulta ao SPC/Serasa
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-red-500" /> Sem perfil de motorista
          </div>
        </motion.div>
      </div>
    </section>
  );
}
