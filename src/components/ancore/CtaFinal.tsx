import { useState } from "react";
import { Download, Phone, Check, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import type { ProposalData } from "@/pages/PropostaAncore";

export function CtaFinal({ 
  data, 
  mode = "view", 
  proposalId,
  status,
  onStatusChange
}: { 
  data: ProposalData;
  mode?: "edit" | "view";
  proposalId?: string | null;
  status?: string;
  onStatusChange?: (s: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const getWaLink = () => {
    const num = data.telefone.replace(/\D/g, "");
    if (!num) return "#";
    const text = encodeURIComponent(`Olá! Estou analisando a proposta de filiação da Ancore (Proposta: ${data.numero}) e gostaria de dar andamento.`);
    return `https://wa.me/${num}?text=${text}`;
  };

  const handleAccept = async () => {
    if (mode === "edit") {
      toast.info("Você está no modo de edição. O cliente verá esta ação.");
      return;
    }

    if (!proposalId) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("proposals")
        .update({ status: "aceita" })
        .eq("id", proposalId);

      if (error) throw error;
      
      toast.success("Proposta aceita! Redirecionando para o consultor...");
      if (onStatusChange) onStatusChange("aceita");
      
      // Redirect to WhatsApp after 1.5s
      setTimeout(() => {
        window.open(getWaLink(), "_blank");
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Erro ao aceitar a proposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="cta" className="py-24 bg-[#080808] relative overflow-hidden border-t border-red-500/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(229,9,20,0.15),transparent_50%)]" />
      
      <div className="container px-4 max-w-3xl mx-auto text-center relative z-10">
        <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tighter mb-6 text-white">
          Pronto para seguir <span className="text-red-500">protegido?</span>
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          Revise sua proposta, escolha o plano ideal e fale com um consultor Ancore para finalizar sua filiação.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {status === "aceita" ? (
            <a
              href={getWaLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)]"
            >
              <Check size={18} />
              Proposta Aceita (Falar no WhatsApp)
            </a>
          ) : (
            <button
              onClick={handleAccept}
              disabled={loading}
              className="w-full sm:w-auto h-14 px-8 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(229,9,20,0.3)] hover:shadow-[0_0_40px_rgba(229,9,20,0.5)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <Phone size={18} />}
              Quero aceitar a proposta
            </button>
          )}
          
          <button 
            onClick={() => window.print()}
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2 transition-all border border-white/10"
          >
            <Download size={18} />
            Baixar PDF / Imprimir
          </button>
        </div>
      </div>

      {/* Mobile Sticky Footer CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 w-full bg-[#080808]/90 backdrop-blur-lg border-t border-white/10 p-4 flex items-center justify-between z-50">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Proposta de Filiação</div>
          <div className="text-base font-black text-white">{data.mensalidade}<span className="text-[10px] text-gray-500 font-medium">/mês</span></div>
        </div>
        <button
          onClick={status === "aceita" ? () => window.open(getWaLink(), "_blank") : handleAccept}
          disabled={loading}
          className={`h-10 px-5 rounded-full text-white font-bold tracking-wider uppercase text-[10px] flex items-center gap-2 shadow-lg ${status === "aceita" ? "bg-emerald-600" : "bg-red-600 hover:bg-red-700"}`}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : (status === "aceita" ? "Aceito - WhatsApp" : "Aceitar Proposta")}
        </button>
      </div>
    </section>
  );
}
