import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const REGIONS = [
  {
    name: "Centro-Oeste",
    cities: ["Goiânia - GO", "Brasília - DF", "Valparaíso de Goiás - GO", "Catalão - GO", "Posse - GO", "Barra do Garças - MT", "Dourados - MS", "Cuiabá - MT"]
  },
  {
    name: "Sudeste",
    cities: ["Americana - SP", "Ribeirão Preto - SP", "Taubaté - SP", "Piracicaba - SP", "São José dos Campos - SP", "Caçapava - SP", "João Pinheiro - MG", "Patos de Minas - MG", "Passos - MG"]
  },
  {
    name: "Nordeste",
    cities: ["João Pessoa - PB", "Juazeiro do Norte - CE", "São Bento - PB", "Sousa - PB", "Pombal - PB", "Catolé do Rocha - PB", "Patos - PB", "Guarabira - PB", "Araripina - PE", "Trindade - PE", "Ouricuri - PE", "Marcolândia - PI", "Balsas - MA", "Barreiras - BA", "Luís Eduardo Magalhães - BA", "Guanambi - BA", "Itaporanga - PB", "Aquiraz - CE"]
  },
  {
    name: "Norte",
    cities: ["Palmas - TO", "Araguaína - TO"]
  }
];

export function MapaLocais() {
  const [openRegion, setOpenRegion] = useState<string | null>("Centro-Oeste");

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-red-500/10 text-red-500 mb-6 border border-red-500/20">
            <Map size={32} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mb-4">Ancore perto de você</h2>
          <p className="text-muted-foreground">Matriz em Goiânia, GO, com presença em diversas regiões do Brasil.</p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {REGIONS.map((r) => (
            <div key={r.name} className="border border-white/5 rounded-2xl overflow-hidden bg-white/[0.02] backdrop-blur-sm">
              <button
                onClick={() => setOpenRegion(openRegion === r.name ? null : r.name)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg font-bold text-white">{r.name}</span>
                <ChevronDown className={cn("text-muted-foreground transition-transform duration-300", openRegion === r.name && "rotate-180")} />
              </button>
              <AnimatePresence>
                {openRegion === r.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5">
                      {r.cities.map((city, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500/50" />
                          {city}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
