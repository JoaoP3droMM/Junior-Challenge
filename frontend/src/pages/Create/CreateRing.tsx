import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRing.css';
import forjaImage from '../../assets/forja.webp';
import { FaArrowLeft, FaTrash, FaUpload } from 'react-icons/fa';
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
  const [formValues, setFormValues] = useState<RingForm>({
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!formValues.nome) {
        alert('Nome do anel é obrigatório!');
        return;
      }

      const formData = new FormData();
      formData.append('nome', formValues.nome);
      formData.append('poder', formValues.poder || '');
      formData.append('portador', formValues.portador || '');
      formData.append('forjadoPor', formValues.forjadoPor || '');
      
      if (selectedImage) {
        formData.append('imagem', selectedImage);
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
      if (!formValues.nome) {
        alert('Nome do anel é obrigatório para atualização!');
        return;
      }

      const updatePayload: Partial<RingForm> = {};
      if (formValues.poder) updatePayload.poder = formValues.poder;
      if (formValues.portador) updatePayload.portador = formValues.portador;
      if (formValues.forjadoPor) updatePayload.forjadoPor = formValues.forjadoPor;
      
      // Se houver nova imagem, enviar via FormData
      if (selectedImage) {
        const formData = new FormData();
        formData.append('imagem', selectedImage);
        Object.entries(updatePayload).forEach(([key, value]) => {
          formData.append(key, value);
        });
        await updateRing(formValues.nome, formData);
      } else {
        await updateRing(formValues.nome, updatePayload);
      }

      alert('Anel atualizado com sucesso!');
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar anel:', error);
      alert(error instanceof Error ? error.message : 'Erro desconhecido');
    }
  };

  const handleDelete = async () => {
    if (!formValues.nome) {
      alert('Digite o nome do anel que deseja deletar!');
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar o anel "${formValues.nome}"?`)) {
      try {
        await deleteRing(formValues.nome);
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
              value={formValues.nome}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <label htmlFor="poder">Poder:</label>
            <input
              type="text"
              id="poder"
              value={formValues.poder || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="portador">Portador:</label>
            <input
              type="text"
              id="portador"
              value={formValues.portador || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label htmlFor="forjadoPor">Forjado por:</label>
            <input
              type="text"
              id="forjadoPor"
              value={formValues.forjadoPor || ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-row">
            <label>Imagem:</label>
            <div className="image-upload-container">
              <button
                type="button"
                className="upload-button"
                onClick={triggerFileInput}
              >
                <FaUpload /> Selecionar Imagem
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                hidden
              />
              {preview && (
                <div className="image-preview">
                  <img src={preview} alt="Pré-visualização" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setSelectedImage(null);
                      setPreview(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
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