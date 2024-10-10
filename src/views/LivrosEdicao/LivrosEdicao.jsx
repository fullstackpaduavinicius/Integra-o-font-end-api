import { useEffect, useState, useCallback } from 'react';
import Header from '../../components/Header/Header';
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';
import './index.scss';

const LivrosEdicao = () => {  
  let { livroId } = useParams();
  const [livro, setLivro] = useState({});

  // Função para buscar o livro
  const getLivro = useCallback(async () => {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro(data);
    } catch (error) {
      alert('Erro ao buscar livro');
    }
  }, [livroId]); // Dependendo do livroId

  // Função para editar o livro
  async function editLivro() {
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora,
    };

    // Verificação se os campos obrigatórios estão preenchidos
    if (livro.id && livro.titulo && livro.num_paginas && livro.isbn && livro.editora) {
      try {
        const { data } = await LivrosService.updateLivro(Number(livro.id), body);
        alert(data.mensagem);
      } catch ({ response: { data, status } }) {
        alert(`${status} - ${data}`);
      }
    } else {
      alert('Todos os campos devem ser preenchidos.');
    }  
  }

  // Usando useEffect para buscar o livro na montagem do componente
  useEffect(() => {
    getLivro();    
  }, [getLivro]);

  return (
    <>
      <Header />    
      <SubmenuLivros />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={(e) => { e.preventDefault(); editLivro(); }}>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required value={livro.id || ''} />
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input 
                type="text" 
                required 
                onChange={(event) => setLivro({ ...livro, titulo: event.target.value })} 
                value={livro.titulo || ''} 
              />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input 
                type="text"  
                required 
                onChange={(event) => setLivro({ ...livro, num_paginas: event.target.value })} 
                value={livro.num_paginas || ''} 
              />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input 
                type="text"  
                required 
                onChange={(event) => setLivro({ ...livro, isbn: event.target.value })} 
                value={livro.isbn || ''} 
              />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input 
                type="text"  
                required 
                onChange={(event) => setLivro({ ...livro, editora: event.target.value })} 
                value={livro.editora || ''} 
              />
            </div> 
            <div className='form-group'>
              <button type="submit">Atualizar Livro</button>  
            </div>                   
          </form>
        </div>        
      </div>
    </>
  );
};

export default LivrosEdicao;
