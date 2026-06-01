import { useState, useEffect } from "react";
import { Check, Star, Edit2 } from "lucide-react";
import type { ProposalData } from "@/pages/PropostaAncore";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  desc: string;
  price: string;
  cota: string;
  filiacao: string;
  features: string[];
  notIncluded: string[];
}

export function PlanosComparacao({ 
  mode = "view",
  data,
  onUpdate
}: { 
  mode?: "edit" | "view";
  data?: ProposalData;
  onUpdate?: (field: keyof ProposalData, value: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"bronze" | "prata" | "ouro">("prata");
  const [isEditing, setIsEditing] = useState(mode === "edit");

  const [plans, setPlans] = useState<Record<"bronze" | "prata" | "ouro", Plan>>({
    bronze: {
      name: "Plano Bronze",
      desc: "Proteção essencial com excelente custo-benefício.",
      price: "R$ 65,00",
      cota: "R$ 500,00",
      filiacao: "R$ 200,00",
      features: [
        "Roubo e Furto (100% FIPE)",
        "Colisão e Perda Total",
        "Assistência 24h (400km)",
        "Danos a Terceiros (30k)",
      ],
      notIncluded: [
        "Carro Reserva",
        "Vidros e Faróis",
        "Proteção de Pneus",
      ]
    },
    prata: {
      name: data?.plano || "Plano Prata",
      desc: "A melhor relação custo-benefício com guincho ampliado.",
      price: data?.mensalidade || "R$ 88,65",
      cota: data?.cota || "R$ 800,00",
      filiacao: data?.filiacao || "R$ 350,00",
      features: [
        "Roubo e Furto (100% FIPE)",
        "Colisão e Perda Total",
        "Assistência 24h (1000km)",
        "Danos a Terceiros (50k)",
        "Vidros, Faróis e Lanternas",
        "Carro Reserva (7 dias)"
      ],
      notIncluded: [
        "Proteção de Pneus",
      ]
    },
    ouro: {
      name: "Plano Ouro",
      desc: "Proteção total sem limites para sua máxima tranquilidade.",
      price: "R$ 125,00",
      cota: "R$ 1.200,00",
      filiacao: "R$ 500,00",
      features: [
        "Roubo e Furto (100% FIPE)",
        "Colisão e Perda Total",
        "Assistência 24h (Ilimitada)",
        "Danos a Terceiros (100k)",
        "Vidros, Faróis e Lanternas",
        "Carro Reserva (15 dias)",
        "Proteção de Pneus e Rodas",
        "Clube de Benefícios Premium"
      ],
      notIncluded: []
    }
  });

  useEffect(() => {
    if (data) {
      setPlans(p => ({
        ...p,
        prata: {
          ...p.prata,
          name: data.plano || p.prata.name,
          price: data.mensalidade || p.prata.price,
          cota: data.cota || p.prata.cota,
          filiacao: data.filiacao || p.prata.filiacao
        }
      }));
    }
  }, [data?.plano, data?.mensalidade, data?.cota, data?.filiacao]);

  const updatePlan = (planKey: "bronze" | "prata" | "ouro", field: keyof Plan, value: string | string[]) => {
    setPlans(prev => ({
      ...prev,
      [planKey]: {
        ...prev[planKey],
        [field]: value
      }
    }));
    
    if (planKey === "prata" && onUpdate && typeof value === "string") {
      if (field === "name") onUpdate("plano", value);
      if (field === "price") onUpdate("mensalidade", value);
      if (field === "cota") onUpdate("cota", value);
      if (field === "filiacao") onUpdate("filiacao", value);
    }
  };

  const activePlanData = plans[activeTab];

  return (
    <section className="py-24 bg-[#080808]">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tighter mb-4">Escolha seu plano</h2>
          <p className="text-muted-foreground mb-8">Personalize e veja qual faz sentido para você.</p>
          
          {mode === "edit" && (
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
            >
              {isEditing ? "Concluir edição dos planos" : <><Edit2 size={14} /> Editar planos</>}
            </button>
          )}
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex bg-white/5 p-1.5 rounded-full border border-white/10 max-w-fit">
            {(["bronze", "prata", "ouro"] as const).map(p => (
              <button
                key={p}
                onClick={() => setActiveTab(p)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all relative",
                  activeTab === p ? "bg-red-600 text-white shadow-lg" : "text-muted-foreground hover:text-white"
                )}
              >
                {p === "prata" && <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full animate-bounce shadow-lg">Recomendado</span>}
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className={cn(
          "max-w-2xl mx-auto rounded-[2.5rem] p-8 sm:p-12 transition-all relative overflow-hidden",
          activeTab === "prata" ? "bg-gradient-to-b from-red-950/40 to-[#0a0a0a] border border-red-500/30 shadow-[0_0_50px_rgba(229,9,20,0.1)]" : "bg-[#0a0a0a] border border-white/5"
        )}>
          {activeTab === "prata" && (
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Star size={120} />
            </div>
          )}
          
          <div className="relative z-10">
            {isEditing ? (
              <div className="space-y-4 mb-8">
                <input 
                  value={activePlanData.name} 
                  onChange={e => updatePlan(activeTab, "name", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-2xl font-black text-white"
                />
                <input 
                  value={activePlanData.desc} 
                  onChange={e => updatePlan(activeTab, "desc", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-400"
                />
                <input 
                  value={activePlanData.price} 
                  onChange={e => updatePlan(activeTab, "price", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-3xl font-black text-red-500"
                />
              </div>
            ) : (
              <div className="mb-10 text-center">
                <h3 className="text-3xl font-black mb-2">{activePlanData.name}</h3>
                <p className="text-gray-400 mb-6">{activePlanData.desc}</p>
                <div className="text-5xl font-black text-white mb-2">
                  <span className="text-2xl text-red-500 mr-1">R$</span>
                  {activePlanData.price.replace("R$", "").trim()}
                  <span className="text-lg text-gray-500 font-medium ml-1">/mês</span>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground border-b border-white/5 pb-2 mb-4">O que está incluso</h4>
              {isEditing ? (
                <textarea 
                  value={activePlanData.features.join("\n")}
                  onChange={e => updatePlan(activeTab, "features", e.target.value.split("\n"))}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white min-h-[300px] leading-relaxed"
                />
              ) : (
                <ul className="space-y-4">
                  {activePlanData.features.filter(Boolean).map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={12} />
                      </div>
                      <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
