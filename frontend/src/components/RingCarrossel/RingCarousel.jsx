import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./RingCarousel.css";
import anelImage from "../../assets/anel.webp";

const rings = [
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
  },
  // ... outros anéis
];

const RingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Ativa os botões de navegação
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
  )
}

export default RingCarousel
