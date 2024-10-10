const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/seu_banco'; // Use uma URI padrão se o MONGODB_URI não estiver definido
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Encerre o servidor se não conseguir se conectar ao MongoDB
    });

// Definição do schema do livro
const bookSchema = new mongoose.Schema({
    title: String,
    pages: Number,
    isbn: String,
    publisher: String,
});

const Book = mongoose.model('Book', bookSchema);

// Rota para obter todos os livros
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar os livros' });
    }
});

// Rota para adicionar um novo livro
app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao adicionar o livro' });
    }
});

// Rota para atualizar um livro
app.put('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar o livro' });
    }
});

// Rota para deletar um livro
app.delete('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o livro' });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
