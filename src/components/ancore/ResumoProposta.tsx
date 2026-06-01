import { useState } from "react";
import { Edit2, Check, FileText, User, Car, Calendar, Phone, Mail, DollarSign, Shield } from "lucide-react";
import type { ProposalData } from "@/pages/PropostaAncore";
import { cn } from "@/lib/utils";

export function ResumoProposta({ data, onUpdate, mode = "view" }: { data: ProposalData; onUpdate: (f: keyof ProposalData, v: string) => void, mode?: "edit" | "view" }) {
  const [isEditing, setIsEditing] = useState(mode === "edit");

  const EditField = ({ label, field, icon: Icon }: { label: string; field: keyof ProposalData; icon: any }) => (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1.5">
        <Icon size={12} className="text-red-500" /> {label}
      </label>
      {isEditing ? (
        <input 
          value={data[field]} 
          onChange={(e) => onUpdate(field, e.target.value)}
          className="bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-red-500 transition-colors"
        />
      ) : (
        <div className="text-sm font-bold text-white py-2">{data[field]}</div>
      )}
    </div>
  );

  return (
    <div className="rounded-[2rem] bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />
      
      <div className="p-6 sm:p-8 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight">Resumo da sua proposta</h2>
            <p className="text-sm text-muted-foreground font-medium">Validade: {data.validade}</p>
          </div>
        </div>
        
        {mode === "edit" && (
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
              isEditing 
                ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20" 
                : "bg-white/5 hover:bg-white/10 text-white"
            )}
          >
            {isEditing ? <><Check size={14} /> Fechar Edição</> : <><Edit2 size={14} /> Editar Proposta</>}
          </button>
        )}
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 pb-2 border-b border-white/5">Dados do Associado e Veículo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <EditField label="Associado" field="associado" icon={User} />
            <EditField label="Número da Proposta" field="numero" icon={FileText} />
            <div className="sm:col-span-2">
              <EditField label="Veículo" field="veiculo" icon={Car} />
            </div>
            <EditField label="Placa" field="placa" icon={Car} />
            <EditField label="Código FIPE" field="fipe" icon={FileText} />
            <EditField label="Data da Proposta" field="data" icon={Calendar} />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 pb-2 border-b border-white/5">Valores e Plano</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <EditField label="Plano Selecionado" field="plano" icon={Shield} />
            <EditField label="Valor Protegido" field="valorProtegido" icon={DollarSign} />
            <EditField label="Mensalidade" field="mensalidade" icon={DollarSign} />
            <EditField label="Cota de Participação" field="cota" icon={DollarSign} />
            <EditField label="Filiação (Normal)" field="filiacao" icon={DollarSign} />
            <EditField label="Filiação (Promocional)" field="filiacaoPromo" icon={DollarSign} />
          </div>
        </div>
      </div>

      <div className="bg-black/40 p-6 sm:p-8 border-t border-white/5">
        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 pb-4">Consultor Responsável</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <EditField label="Nome" field="consultor" icon={User} />
          <EditField label="Telefone / WhatsApp" field="telefone" icon={Phone} />
          <EditField label="E-mail" field="email" icon={Mail} />
        </div>
      </div>
    </div>
  );
}
