import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';
import { Link } from "react-router-dom";

const Livros = () => {
  const [livros, setLivros] = useState([]);

  const getLivros = async () => {
    try {
      const { data } = await LivrosService.getLivros();
      setLivros(data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      alert('Erro ao buscar livros');
    }
  };

  const deleteLivro = async (livroId) => {
    const valida = confirm(`Você realmente deseja remover o livro de ID: ${livroId}`);
    if (valida) {
      try {
        await LivrosService.deleteLivro(livroId);
        alert('Livro removido com sucesso');
        // Atualize o estado diretamente para remover o livro excluído
        setLivros((prevLivros) => prevLivros.filter(livro => livro.id !== livroId));
      } catch ({ response: { data, status } }) {
        alert(`${status} - ${data.mensagem}`);
      }
    }
  };

  useEffect(() => {
    getLivros();    
  }, []);  

  return (
    <>
      <Header/>    
      <SubmenuLivros/>
      <div className='livros'>
        <h1>Escolha o seu livro</h1>        
        <ul>
          {livros.map((livro) => (
            <li key={livro.id}>
              {livro.titulo} 
              <span>{livro.editora}</span>
              <div className='botoes'>
                <div>
                  <Link className='btn edit' to={`/livros/edicao/${livro.id}`}>
                    {/* SVG para editar */}
                  </Link>
                </div>
                <div>
                  {/* Alterado para um botão */}
                  <button className='btn delete' onClick={() => deleteLivro(livro.id)}>
                    {/* SVG para deletar */}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Livros;
