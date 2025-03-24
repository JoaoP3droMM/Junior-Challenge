import axios from "axios"

const API_URL = '/api/aneis'

// Configure uma instância Axios global
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export interface Ring {
  nome: string;
  poder?: string;
  portador?: string;
  forjadoPor?: string;
  imagem?: string;
}

export const createRing = async (ring: Ring) => {
  const response = await api.post('', ring);
  return response.data;
};

// Atualize as outras funções para usar a instância configurada
export const fetchRing = async (nome: string) => {
  const response = await api.get(`/${encodeURIComponent(nome)}`)
  return response.data
}

export const updateRing = async (nomeOriginal: string, updates: Partial<Ring>) => {
  const response = await api.put(`/${encodeURIComponent(nomeOriginal)}`, updates);
  return response.data;
}

export const deleteRing = async (nome: string) => {
  await api.delete(`/${encodeURIComponent(nome)}`)
}