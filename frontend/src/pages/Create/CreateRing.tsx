import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRing.css';
import forjaImage from '../../assets/forja.webp';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';
import { createRing, updateRing, deleteRing } from '../../services/api';

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

  const handleDelete = async () => {
    if (!formData.nome) {
      alert('Digite o nome do anel que deseja deletar!');
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar o anel "${formData.nome}"?`)) {
      try {
        await deleteRing(formData.nome);
        alert('Anel deletado com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro ao deletar anel:', error);
        alert(error instanceof Error ? error.message : 'Erro desconhecido');
      }
    }
  };

  return (
    <>
      <div className="carousel-background" style={{ backgroundImage: `url(${forjaImage})` }} />
      <div className="carousel-overlay" />

      <div className="top-buttons">
        <button className="back-button" onClick={() => navigate('/aneis')}>
          <FaArrowLeft /> Voltar
        </button>
        <button className="delete-button" onClick={handleDelete}>
          <FaTrash /> Deletar
        </button>
      </div>

      <div className="form-container">
        <h2>Forja de Anéis</h2>
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
            />
          </div>

          <div className="form-row">
            <label htmlFor="portador">Portador:</label>
            <input
              type="text"
              id="portador"
              value={formData.portador || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="forjadoPor">Forjado por:</label>
            <input
              type="text"
              id="forjadoPor"
              value={formData.forjadoPor || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="imagem">Imagem:</label>
            <input
              type="text"
              id="imagem"
              value={formData.imagem || ''}
              onChange={handleInputChange}
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