import axios from "axios"

const API_URL = '/api/aneis'

// Configure uma instância Axios global
const api = axios.create({
  baseURL: API_URL,
});

export interface Ring {
  nome: string;
  poder?: string;
  portador?: string;
  forjadoPor?: string;
  imagem?: string;
}

export const createRing = async (formData: FormData) => {
  const response = await api.post('', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Atualize as outras funções para usar a instância configurada
export const fetchRings = async () => {
  const response = await api.get('');
  return response.data;
};

export async function updateRing(nomeOriginal: string, updates: Partial<Ring>): Promise<any>;
export async function updateRing(nomeOriginal: string, updates: FormData): Promise<any>;
export async function updateRing(nomeOriginal: string, updates: any) {
  if (updates instanceof FormData) {
    const response = await api.put(`/${encodeURIComponent(nomeOriginal)}`, updates, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
  
  const response = await api.put(`/${encodeURIComponent(nomeOriginal)}`, updates);
  return response.data;
}

export const deleteRing = async (nome: string) => {
  await api.delete(`/${encodeURIComponent(nome)}`)
}