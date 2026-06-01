import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "sonner";
import { Loader2, Save, Share2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

import { HeroSection } from "@/components/ancore/HeroSection";
import { BeneficiosGrid } from "@/components/ancore/BeneficiosGrid";
import { PresencaNacional } from "@/components/ancore/PresencaNacional";
import { SusepSection } from "@/components/ancore/SusepSection";
// import { ResumoProposta } from "@/components/ancore/ResumoProposta";
import { PlanosComparacao } from "@/components/ancore/PlanosComparacao";
import { BeneficiosInclusos } from "@/components/ancore/BeneficiosInclusos";
import { MapaLocais } from "@/components/ancore/MapaLocais";
import { CtaFinal } from "@/components/ancore/CtaFinal";
import { Footer } from "@/components/ancore/Footer";

export type ProposalData = {
  numero: string;
  data: string;
  validade: string;
  associado: string;
  veiculo: string;
  placa: string;
  fipe: string;
  valorProtegido: string;
  plano: string;
  mensalidade: string;
  filiacao: string;
  filiacaoPromo: string;
  cota: string;
  consultor: string;
  email: string;
  telefone: string;
};

const defaultData: ProposalData = {
  numero: Math.floor(Math.random() * 100000000).toString(),
  data: new Date().toLocaleDateString("pt-BR"),
  validade: "7 dias",
  associado: "NOME DO CLIENTE",
  veiculo: "MARCA / MODELO / ANO",
  placa: "AAA0A00",
  fipe: "000000-0",
  valorProtegido: "R$ 0,00",
  plano: "Plano Prata",
  mensalidade: "R$ 88,65",
  filiacao: "R$ 350,00",
  filiacaoPromo: "R$ 0,00",
  cota: "R$ 800,00",
  consultor: "SEU NOME",
  email: "seu.email@exemplo.com",
  telefone: "5562999999999",
};

export default function PropostaAncore({ mode = "view" }: { mode?: "edit" | "view" }) {
  const { id } = useParams();
  const [data, setData] = useState<ProposalData>(defaultData);
  const [status, setStatus] = useState<string>("pendente");
  const [loading, setLoading] = useState(mode === "view" && !!id);
  const [saving, setSaving] = useState(false);
  const [generatedId, setGeneratedId] = useState<string | null>(id || null);

  useEffect(() => {
    if (mode === "view" && id) {
      loadProposal(id);
    }
  }, [id, mode]);

  const loadProposal = async (proposalId: string) => {
    try {
      const { data: proposal, error } = await supabase
        .from("proposals")
        .select("*")
        .eq("id", proposalId)
        .maybeSingle();

      if (error) throw error;
      if (proposal) {
        if (proposal.escopo) {
          try {
            const parsedData = JSON.parse(proposal.escopo);
            setData(parsedData);
          } catch (e) {
            console.error("Failed to parse proposal data", e);
          }
        }
        setStatus(proposal.status);
      } else {
        toast.error("Proposta não encontrada.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao carregar proposta.");
    } finally {
      setLoading(false);
    }
  };

  /* Desativado temporariamente junto com o ResumoProposta
  const handleUpdate = (field: keyof ProposalData, value: string) => {
    if (mode !== "edit") return;
    setData((prev) => ({ ...prev, [field]: value }));
  };
  */

  const handleSave = async () => {
    if (mode !== "edit") return;
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      let finalId = generatedId;

      if (generatedId) {
        // Update existing
        const { error } = await supabase
          .from("proposals")
          .update({ 
            escopo: JSON.stringify(data),
            titulo: "Proposta Ancore: " + data.associado,
            numero: parseInt(data.numero) || 0
          })
          .eq("id", generatedId);
        if (error) throw error;
      } else {
        // Insert new
        const { data: newProposal, error } = await supabase
          .from("proposals")
          .insert({
            escopo: JSON.stringify(data),
            titulo: "Proposta Ancore: " + data.associado,
            numero: parseInt(data.numero) || 0,
            status: "pendente"
          })
          .select()
          .single();
        if (error) throw error;
        finalId = newProposal.id;
        setGeneratedId(finalId);
      }

      toast.success("Proposta salva com sucesso!");
      
      // Optionally navigate to it so the URL updates, but we'll just show the link.
    } catch (error: any) {
      console.error(error);
      toast.error(`Erro ao salvar: ${error.message || 'Desconhecido'}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCopyLink = () => {
    if (!generatedId) {
      toast.error("Salve a proposta primeiro para gerar o link.");
      return;
    }
    const link = `${window.location.origin}/proposta/${generatedId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copiado para a área de transferência!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center text-white">
        <Loader2 className="animate-spin mb-4" size={32} />
        <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold">Carregando proposta...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-red-500/30 overflow-x-hidden relative">
      <Helmet>
        <title>Proposta de Filiação - Ancore Proteção Veicular</title>
        <meta name="theme-color" content="#E50914" />
      </Helmet>

      {/* Admin Floating Bar for Edit Mode */}
      {mode === "edit" && (
        <div className="fixed top-0 left-0 w-full z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold">Modo de Edição</span>
            <span className="text-sm font-bold text-white">Crie ou altere a proposta</span>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Salvar
            </button>
            {generatedId && (
              <button 
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest transition-colors"
              >
                <Share2 size={14} />
                Gerar Link
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add padding top if in edit mode so content doesn't hide behind the sticky header */}
      <main className={`relative ${mode === "edit" ? "pt-16" : ""}`}>
        <HeroSection />
        <BeneficiosGrid />
        <PresencaNacional />
        <SusepSection />
        
        {/* Formulário de Resumo desativado temporariamente
        <section id="resumo" className="relative py-24 px-4 sm:px-6 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-red-950/10 to-black/0 pointer-events-none" />
          <div className="max-w-4xl mx-auto relative z-10">
            {status === "aceita" && mode === "view" && (
              <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">✅ Proposta Aceita</p>
              </div>
            )}
            <ResumoProposta data={data} onUpdate={handleUpdate} mode={mode} />
          </div>
        </section>
        */}

        <PlanosComparacao mode={mode} />
        <BeneficiosInclusos />
        <MapaLocais />
        <CtaFinal data={data} mode={mode} proposalId={generatedId} status={status} onStatusChange={setStatus} />
      </main>

      <Footer />
    </div>
  );
}
