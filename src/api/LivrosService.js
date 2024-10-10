import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/books';

export const LivrosService = {
  getLivros: async () => {
    return await axios.get(BASE_URL);
  },
  createLivro: async (livro) => {
    return await axios.post(BASE_URL, livro);
  },
  updateLivro: async (livroId, livro) => {
    return await axios.put(`${BASE_URL}/${livroId}`, livro);
  },
  deleteLivro: async (livroId) => {
    return await axios.delete(`${BASE_URL}/${livroId}`);
  },
  getLivro: async (livroId) => {
    return await axios.get(`${BASE_URL}/${livroId}`);
  },
};
