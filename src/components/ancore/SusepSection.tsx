import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export function SusepSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#360505] to-[#080808] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container relative z-10 px-4 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-red-500/10 text-red-500 mb-6 border border-red-500/20">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mb-6">
            Sim! Somos uma associação devidamente registrada na <span className="text-red-500">SUSEP!</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            O documento que comprova essa aprovação tem validade determinada e precisa ser renovado periodicamente, o que não invalida, em nenhum momento, o reconhecimento já conquistado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white text-black p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative mx-auto max-w-2xl text-center"
        >
          <div className="absolute -top-4 -right-4 h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black mb-4">
            Na Ancore, prezamos por uma atuação ética, legal e transparente.
          </h3>
          <p className="text-gray-600 font-medium">
            Seguimos firmes no nosso propósito de proteger trajetórias com responsabilidade e credibilidade.
          </p>
          
          <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-center gap-4 opacity-50 grayscale">
            {/* Logo SUSEP placeholder */}
            <div className="h-12 w-32 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center font-bold text-gray-400 text-xs uppercase tracking-widest">
              LOGO SUSEP
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
