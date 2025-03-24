import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Slider, { Settings } from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// CSS Images e Ícones
import "./RingCarousel.css"
import anelImage from '../../assets/anel.webp'
import { FaFire } from 'react-icons/fa'

// Services
import { fetchRings } from "../../services/api"

// Atualização da interface Ring para incluir a propriedade imagem
interface Ring {
  title: string
  description: string
  lastHolder: string
  imagem?: string  // Agora inclui a propriedade imagem
}

const RingCarousel: React.FC = () => {
  const navigate = useNavigate()
  const [rings, setRings] = useState<Ring[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const loadRings = async () => {
      try {
        const apiRings = await fetchRings()

        if (apiRings.length === 0) {
          navigate("/create")
          return
        }

        // Mapear os dados da API para a estrutura do componente
        const mappedRings = apiRings.map((ring: any) => ({
          title: ring.nome,
          description: `Forjado por ${ring.forjadoPor || 'desconhecido'}, concede o poder de: ${ring.poder || 'poder não especificado'}`, 
          lastHolder: ring.portador || 'portador desconhecido',
          imagem: ring.imagem ? `http://localhost:3000/${ring.imagem.replace(/^\/+/, '')}` : null // Remove barras extras
        }))

        console.log("Rings com imagens:", mappedRings)

        setRings(mappedRings)
      } catch (error) {
        console.error("Erro ao carregar anéis:", error)
      } finally {
        setLoading(false)
      }
    }
    loadRings()
  }, [navigate])

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  }

  if (loading) {
    return <div className="loading-message">Carregando anéis...</div>
  }

  return (
    <>
      {/* Background dinâmico baseado no anel atual */}
      <div
        className="carousel-background"
        style={{
          backgroundImage: `url(${rings[currentSlide]?.imagem || anelImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      {/* Botão de Forja */}
      <button 
        className="forge-button"
        onClick={() => navigate("/create")}
      >
        <FaFire /> Forjar Novo Anel
      </button>
      
      <div className="carousel-overlay" />
      
      <Slider {...settings}>
        {rings.map((ring, index) => (
          <div key={index} className="carousel-slide">
            <div className="carousel-content">
              <h2>{ring.title}</h2>
              <p>{ring.description}</p>
              <p className="last-holder">
                Último portador registrado: {ring.lastHolder}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  )
}

export default RingCarousel