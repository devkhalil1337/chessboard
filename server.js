const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./database/database');
const Player = require('./model/Player');

app.use(bodyParser.json()); // Enable JSON parsing for API requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sync database
sequelize.sync({ force: false }) // Change to `true` for development to reset tables
    .then(() => console.log('Database tables synced...'))
    .catch((err) => console.error('Error syncing tables:', err));

// CRUD Endpoints

// Create a new player
app.post('/api/players', async (req, res) => {
    try {
        const { name, rating, rank, type } = req.body;
        const player = await Player.create({ name, rating, rank, type });
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create player', details: error.message });
    }
});

// Get all players
app.get('/api/players', async (req, res) => {
    try {
        const players = await Player.findAll();
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch players', details: error.message });
    }
});

// Get players by type
app.get('/api/players/:type', async (req, res) => {
    const { type } = req.params;

    try {
        console.log(type)
        const players = await Player.findAll({
            where: { type: type.toLowerCase() } // Assuming type field in DB is lowercase
        });

        if (!players || players.length === 0) {
            return res.status(404).json({ message: 'No players found for this type.' });
        }

        res.json(players);
    } catch (err) {
        console.error('Error fetching players:', err);
        res.status(500).json({ message: 'An error occurred while fetching players.' });
    }
});


// Update a player
app.put('/api/players/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rating, rank, type } = req.body;
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        player.name = name;
        player.rating = rating;
        player.rank = rank;
        player.type = type;
        await player.save();
        res.status(200).json(player);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update player', details: error.message });
    }
});

// Delete a player
app.delete('/api/players/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const player = await Player.findByPk(id);
        if (!player) {
            return res.status(404).json({ error: 'Player not found' });
        }
        await player.destroy();
        res.status(200).json({ message: 'Player deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete player', details: error.message });
    }
});
