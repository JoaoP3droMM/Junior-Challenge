import { useState } from "react";
import { createRing, updateRing } from "../services/api";

const RingForm = ({ existingRing, onSuccess }) => {
  const [formData, setFormData] = useState(
    existingRing || { nome: "", poder: "", portador: "", forjadoPor: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (existingRing) {
      await updateRing(existingRing.id, formData);
    } else {
      await createRing(formData);
    }
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        name="nome"
        placeholder="Nome do Anel"
        value={formData.nome}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-600 rounded"
      />
      <input
        type="text"
        name="poder"
        placeholder="Poder"
        value={formData.poder}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-600 rounded"
      />
      <input
        type="text"
        name="portador"
        placeholder="Portador"
        value={formData.portador}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-600 rounded"
      />
      <input
        type="text"
        name="forjadoPor"
        placeholder="Forjado Por"
        value={formData.forjadoPor}
        onChange={handleChange}
        className="w-full p-2 mb-2 border border-gray-600 rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500">
        {existingRing ? "Atualizar Anel" : "Criar Anel"}
      </button>
    </form>
  );
};

export default RingForm;