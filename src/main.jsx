import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss';
import Home from './views/Home/Home';
import Livros from './views/Livros/Livros';
import LivrosCadastro from './views/LivrosCadastro/LivrosCadastro';
import LivrosEdicao from './views/LivrosEdicao/LivrosEdicao';

// Definindo as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/livros",
    element: <Livros />,
  },
  {
    path: "/livros/cadastro",
    element: <LivrosCadastro />,
  },
  {
    path: "/livros/edicao/:livroId",
    element: <LivrosEdicao />,
  },
]);

// Componente App
const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

// Renderizando o aplicativo
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Exportando App
export default App;
