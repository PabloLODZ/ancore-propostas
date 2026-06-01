import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropostaAncore from "./pages/PropostaAncore";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Navigate to="/proposta" />} />
        <Route path="/proposta" element={<PropostaAncore mode="view" />} />
        <Route path="/proposta/:id" element={<PropostaAncore mode="view" />} />
        <Route path="/gerar-proposta" element={<PropostaAncore mode="edit" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
