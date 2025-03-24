import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RingCarousel.css";
import anelImage from "../../assets/anel.webp";

interface Ring {
  title: string;
  description: string;
  lastHolder: string;
}

const rings: Ring[] = [
  {
    title: "Anel 1",
    description: "Forjado por Sauron, garante ao portador o poder da invisibilidade",
    lastHolder: "Frodo Bolseiro"
  },
  {
    title: "Anel 2",
    description: "Forjado por Sauron, garante ao portador o poder da invisibilidade",
    lastHolder: "Frodo Bolseiro"
  },
  {
    title: "Anel 3",
    description: "Forjado por Sauron, garante ao portador o poder da invisibilidade",
    lastHolder: "Frodo Bolseiro"
  }
  // ... outros anéis
];

const RingCarousel: React.FC = () => {
  const navigate = useNavigate();

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
  }, [navigate]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true
  };

  return (
    <>
      {/* Imagem de fundo - Camada 1 */}
      <div className="carousel-background" style={{ backgroundImage: `url(${anelImage})` }} />
      
      {/* Overlay - Camada 2 */}
      <div className="carousel-overlay" />
      
      {/* Conteúdo do Carrossel - Camada 3 */}
      <Slider {...settings}>
        {rings.map((ring, index) => (
          <div key={index} className="carousel-slide">
            <div className="carousel-content">
              <h2>{ring.title}</h2>
              <p>{ring.description}</p>
              <p className="last-holder">
                Os últimos registros indicam que o último portador foi: {ring.lastHolder}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default RingCarousel