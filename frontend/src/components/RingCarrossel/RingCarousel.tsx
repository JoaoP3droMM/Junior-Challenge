import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RingCarousel.css";
import anelImage from "../../assets/anel.webp";
import { fetchRings } from "../../services/api";

interface Ring {
  title: string;
  description: string;
  lastHolder: string;
}

const RingCarousel: React.FC = () => {
  const navigate = useNavigate()
  const [rings, setRings] = useState<Ring[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadRings = async () => {
      try {
        const apiRings = await fetchRings()

        // Mapear os dados da API para a estrutura do componente
        const mappedRings = apiRings.map((ring: any) => ({
          title: ring.nome,
          description: `Forjado por ${ring.forjadoPor || 'desconhecido'}, concede o poder de: ${ring.poder || 'poder não especificado'}`, 
          lastHolder: ring.portador || 'portador desconhecido'
        }))

        setRings(mappedRings)
      } catch (error) {
        setError('Erro ao carregais os anéis do servidor')
      } finally {
        setLoading(false)
      }
    }
    loadRings()
  }, [])

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0) {
        navigate("/create");
      }
    };
    
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
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
    return <div className="loading-message">Carregando anéis...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <div className="carousel-background" style={{ backgroundImage: `url(${anelImage})` }} />
      
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