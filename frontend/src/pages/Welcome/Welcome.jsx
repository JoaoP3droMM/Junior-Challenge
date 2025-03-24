import "./welcome.css"
import welcomeImage from "../../assets/welcome.jpeg"

const Welcome = () => {
  return (
    <>
      <img src={welcomeImage} alt="Bem vindo" className="background-image" />
      <div className="overlay"></div>
      <div className="welcome-container">
        <h1 className="welcome-text">Bem vindo, ao gerenciador de anéis</h1>
      </div>
    </>
  )
}

export default Welcome