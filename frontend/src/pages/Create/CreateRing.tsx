import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateRing.css';
import forjaImage from '../../assets/forja.webp';
import { FaArrowLeft } from 'react-icons/fa';
import { createRing, updateRing } from '../../services/api.tsx'

interface RingForm {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem: string;
}

const CreateRing: React.FC = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<RingForm>({
    nome: '',
    poder: '',
    portador: '',
    forjadoPor: '',
    imagem: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Dados sendo enviados:', formData) // Inspecione isto no console
      await createRing(formData)
      alert('Anel criado com sucesso!')
      navigate('/')
    } catch (error) {
      console.error('Erro ao criar anel:', error)
      alert('Erro ao criar anel')
    }
  }

  return (
    <>
      {/* Imagem de fundo - Camada 1 */}
      <div className="carousel-background" style={{ backgroundImage: `url(${forjaImage})` }} />

      {/* Overlay - Camada 2 */}
      <div className="carousel-overlay" />

      {/* Botão de Voltar */}
      <button className="back-button" onClick={() => navigate('/')}>
        <FaArrowLeft /> Voltar
      </button>

      {/* Conteúdo do Formulário - Camada 3 */}
      <div className="form-container">
        <h2>Criação de Anel</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="nome">Nome do anel:</label>
            <input type="text" id="nome" value={formData.nome} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="poder">Poder:</label>
            <input type="text" id="poder" value={formData.poder} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="portador">Portador:</label>
            <input type="text" id="portador" value={formData.portador} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="forjadoPor">Forjado por:</label>
            <input type="text" id="forjadoPor" value={formData.forjadoPor} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <label htmlFor="imagem">Imagem do anel:</label>
            <input type="text" id="imagem" value={formData.imagem} onChange={handleInputChange} />
          </div>

          <div className="form-buttons">
            <button type="submit" className="create-btn">
              Criar
            </button>
            <button type="button" className="update-btn">
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateRing