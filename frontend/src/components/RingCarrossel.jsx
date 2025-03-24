import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fetchRings, deleteRing } from "../services/api";
import RingCard from "./RingCard";

const RingCarousel = ({ onEdit }) => {
  const [rings, setRings] = useState([]);

  useEffect(() => {
    loadRings();
  }, []);

  const loadRings = async () => {
    const data = await fetchRings();
    setRings(data);
  };

  const handleDelete = async (id) => {
    await deleteRing(id);
    loadRings();
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <Slider {...settings} className="p-4">
      {rings.map((ring) => (
        <RingCard key={ring.id} ring={ring} onEdit={onEdit} onDelete={handleDelete} />
      ))}
    </Slider>
  );
};

export default RingCarousel