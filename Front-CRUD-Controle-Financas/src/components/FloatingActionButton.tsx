import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
         className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center text-3xl transition-all z-50"
        aria-label="Nova Entrada ou Despesa"
      >
        +
      </button>

      {/* Modal */}
      <Popup open={open} onClose={() => setOpen(false)} modal nested>
        <div className="popup-content max-w-md w-full p-6 rounded-xl bg-gray-900 text-white relative">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-white text-2xl font-bold"
          >
            ×
          </button>

          <h3 className="text-xl font-bold mb-4">Criar Entrada ou Despesa</h3>

          {/* Aqui você coloca seu formulário */}
          <p>Formulário vai aqui...</p>
        </div>
      </Popup>
    </>
  );
}
