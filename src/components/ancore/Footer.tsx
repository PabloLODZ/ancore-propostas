export function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/5 text-center">
      <div className="container px-4 max-w-6xl mx-auto flex flex-col items-center">
        <h3 className="font-display text-2xl font-black tracking-tighter text-white mb-2">ANCORE</h3>
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-8">Proteção Veicular</p>
        
        <div className="flex gap-6 text-sm text-gray-400 mb-12">
          <a href="https://ancore.app" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">ancore.app</a>
          <span>|</span>
          <a href="https://instagram.com/ancoreprotecaoveicular" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">@ancoreprotecaoveicular</a>
        </div>

        <div className="pt-8 border-t border-white/5 w-full">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-bold mb-4">Parceiros</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-40 grayscale text-xs font-bold text-gray-500">
            <span>ARX Administradora</span>
            <span>aham Agência Criativa</span>
            <span>Clubgas</span>
            <span>Porto Leal Monitoramento</span>
            <span>Clube Certo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
