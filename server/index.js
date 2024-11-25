const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

app.get('/estoque', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM estoque ORDER BY id');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar o estoque' });
    }
});

app.post('/estoque', async (req, res) => {
    const { nome, quantidade } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO estoque (nome, quantidade) VALUES ($1, $2) RETURNING *',
            [nome, quantidade]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao adicionar o item ao estoque' });
    }
});

app.put('/estoque/:id', async (req, res) => {
    const { id } = req.params;
    const { quantidade } = req.body;
    try {
        const result = await pool.query(
            'UPDATE estoque SET quantidade = $1 WHERE id = $2 RETURNING *',
            [quantidade, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar o item do estoque' });
    }
});

app.delete('/estoque/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM estoque WHERE id = $1', [id]);
        res.status(204).send();
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar o item do estoque' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
