import { motion } from "framer-motion";
import { 
  ShieldAlert, 
  Car, 
  Wrench, 
  HeartHandshake, 
  UserPlus, 
  Droplets, 
  AlertTriangle, 
  Fuel, 
  CarFront 
} from "lucide-react";

const items = [
  { icon: ShieldAlert, title: "Roubo e Furto", desc: "Cobertura 100% da FIPE em caso de roubo." },
  { icon: Car, title: "Guincho 24h", desc: "Resgate rápido onde você estiver." },
  { icon: Wrench, title: "Assistência 24h", desc: "Suporte completo para emergências." },
  { icon: AlertTriangle, title: "Colisão", desc: "Reparos garantidos para seu veículo." },
  { icon: UserPlus, title: "Proteção para Terceiros", desc: "Garantia contra danos a outros veículos." },
  { icon: Droplets, title: "Vidros e Faróis", desc: "Troca e reparo simplificados." },
  { icon: HeartHandshake, title: "Perda Total", desc: "Indenização integral." },
  { icon: Fuel, title: "Desconto em Combustível", desc: "Economize abastecendo nos parceiros." },
  { icon: CarFront, title: "Carro Reserva", desc: "Não fique a pé se precisar de reparos." },
];

export function BeneficiosGrid() {
  return (
    <section className="py-24 bg-[#1a0505] relative">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mb-4">Com você em todo momento</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Tudo que você precisa para rodar tranquilo e protegido.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-red-500/30 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/5 group-hover:to-red-500/10 transition-colors" />
              <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors">
                <it.icon size={24} className="text-white group-hover:text-red-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
