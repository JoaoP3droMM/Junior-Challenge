import "./welcome.css"
import welcomeImage from "../../assets/welcome.jpeg"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Welcome = () => {
  const navigate = useNavigate()

  // Função que redireciona para tela de carrossel
  const goToCarrossel = () => {
    navigate('/aneis')
  }

  useEffect(() => {
    // Listener de rolagem para redirecionar
    const handleScrool = () => {
      navigate('/aneis')
    }

    // Adiciona o listener na window
    window.addEventListener('wheel', handleScrool)

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('wheel', handleScrool)
    }
  }, [navigate])

  return (
    <div onClick={goToCarrossel} style={{ cursor: 'pointer' }}>
      <img src={welcomeImage} alt="Bem vindo" className="background-image" />
      <div className="overlay"></div>
      <div className="welcome-container">
        <h1 className="welcome-text">Bem vindo, ao gerenciador de anéis</h1>
      </div>
    </div>
  )
}

export default Welcome