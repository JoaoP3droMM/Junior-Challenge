import axios from "axios"

const API_URL = '/api/aneis';

// Configure uma instância Axios global
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export interface Ring {
  nome: string;
  poder: string;
  portador: string;
  forjadoPor: string;
  imagem?: string;
}

export const createRing = async (ring: Ring) => {
  const response = await api.post('', ring);
  return response.data;
};

// Atualize as outras funções para usar a instância configurada
export const fetchRings = async () => {
  const response = await api.get('');
  return response.data;
};

export const updateRing = async (id: string, ring: Ring) => {
  const response = await api.put(`/${id}`, ring);
  return response.data;
};

export const deleteRing = async (id: string) => {
  await api.delete(`/${id}`);
}