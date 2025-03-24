import axios from "axios"

const API_URL = "http://localhost:3000/api/aneis"

export const fetchRings = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const createRing = async (ring) => {
  const response = await axios.post(API_URL, ring)
  return response.data
}

export const updateRing = async (id, ring) => {
  const response = await axios.put(`${API_URL}/${id}`, ring)
  return response.data
}

export const deleteRing = async (id) => {
  await axios.delete(`${API_URL}/${id}`)
}