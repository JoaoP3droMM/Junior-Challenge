import React from 'react'
import './CreateRing.css'
import forjaImage from '../../assets/forja.webp'

const CreateRing = () => {
  return (
    <>
      {/* Imagem de fundo - Camada 1 */}
      <div className="carousel-background" style={{ backgroundImage: `url(${forjaImage})` }} />

        {/* Overlay - Camada 2 */}
        <div className="carousel-overlay" />

        {/* Conteúdo do Formulário - Camada 3 */}
        <div className="form-container">
            <h2>Criação de Anel</h2>
            <form>
                <div className="form-row">
                    <label htmlFor="nomeAnel">Nome do anel:</label>
                    <input type="text" id="nomeAnel" />
                </div>

                <div className="form-row">
                    <label htmlFor="poderAnel">Poder:</label>
                    <input type="text" id="poderAnel"  />
                </div>

                <div className="form-row">
                    <label htmlFor="portadorAnel">Portador:</label>
                    <input type="text" id="portadorAnel" />
                </div>

                <div className="form-row">
                    <label htmlFor="forjadoPor">Forjado por:</label>
                    <input type="text" id="forjadoPor"  />
                </div>

                <div className="form-row">
                    <label htmlFor="imagemAnel">Imagem do anel:</label>
                    <input type="text" id="imagemAnel"  />
                </div>

                <div className="form-buttons">
                    <button type="button" className="create-btn">
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