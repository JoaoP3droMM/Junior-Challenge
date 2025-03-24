import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRing.css';
import forjaImage from '../../assets/forja.webp';
import { FaArrowLeft } from 'react-icons/fa';
import { createRing, updateRing } from '../../services/api';

interface RingForm {
  nome: string;
  poder?: string;
  portador?: string;
  forjadoPor?: string;
  imagem?: string;
}

const CreateRing: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RingForm>({
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.nome) {
        alert('Nome do anel é obrigatório!');
        return;
      }
      
      await createRing(formData);
      alert('Anel criado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar anel:', error);
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formData.nome) {
        alert('Nome do anel é obrigatório para atualização!');
        return;
      }

      // Filtra apenas os campos modificados (não vazios)
      const updatePayload: Partial<RingForm> = {};
      if (formData.poder) updatePayload.poder = formData.poder;
      if (formData.portador) updatePayload.portador = formData.portador;
      if (formData.forjadoPor) updatePayload.forjadoPor = formData.forjadoPor;
      if (formData.imagem) updatePayload.imagem = formData.imagem;

      await updateRing(formData.nome, updatePayload);
      alert('Anel atualizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar anel:', error);
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  return (
    <>
      <div className="carousel-background" style={{ backgroundImage: `url(${forjaImage})` }} />
      <div className="carousel-overlay" />

      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft /> Voltar
      </button>

      <div className="form-container">
        <h2>Gerenciamento de Anéis</h2>
        <form>
          <div className="form-row">
            <label htmlFor="nome">Nome do anel:</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="poder">Poder:</label>
            <input
              type="text"
              id="poder"
              value={formData.poder || ''}
              onChange={handleInputChange}
              placeholder="Deixe vazio para manter o atual"
            />
          </div>

          <div className="form-row">
            <label htmlFor="portador">Portador:</label>
            <input
              type="text"
              id="portador"
              value={formData.portador || ''}
              onChange={handleInputChange}
              placeholder="Deixe vazio para manter o atual"
            />
          </div>

          <div className="form-row">
            <label htmlFor="forjadoPor">Forjado por:</label>
            <input
              type="text"
              id="forjadoPor"
              value={formData.forjadoPor || ''}
              onChange={handleInputChange}
              placeholder="Deixe vazio para manter o atual"
            />
          </div>

          <div className="form-row">
            <label htmlFor="imagem">Imagem:</label>
            <input
              type="text"
              id="imagem"
              value={formData.imagem || ''}
              onChange={handleInputChange}
              placeholder="Deixe vazio para manter o atual"
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="create-btn" onClick={handleCreate}>
              Criar Novo
            </button>
            <button type="button" className="update-btn" onClick={handleUpdate}>
              Atualizar Existente
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRing;