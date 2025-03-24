const RingCard = ({ ring, onEdit, onDelete }) => {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{ring.nome}</h3>
        <p className="text-sm">Poder: {ring.poder}</p>
        <p className="text-sm">Portador: {ring.portador}</p>
        <p className="text-sm">Forjado por: {ring.forjadoPor}</p>
        <div className="flex justify-between mt-2">
          <button onClick={() => onEdit(ring)} className="p-1 bg-yellow-500 rounded">
            Editar
          </button>
          <button onClick={() => onDelete(ring.id)} className="p-1 bg-red-600 rounded">
            Excluir
          </button>
        </div>
      </div>
    );
  };
  
  export default RingCard  