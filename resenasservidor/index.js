const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();

connectDB();

app.use(cors());

app.use(express.json({extended: true}));

const PORT = process.env.PORT || 4000; 

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/comentarios', require('./routes/comentarios'));
app.use('/api/albumes', require('./routes/albumes'));


app.listen(PORT, '0.0.0.0',  () => {
    console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});

const Album = require('./models/Album');

const data = {
    nombre: "Eternal",
    artista: "Stratovarius",
    imagen: "https://i.imgur.com/KfPBx3w.jpg"
}

const albumes = [
  {
    nombre: "Eternal",
    artista: "Stratovarius",
    imagen: "https://i.imgur.com/KfPBx3w.jpg"
  },
  {
    nombre: "Holy Land",
    artista: "Angra",
    imagen: "https://i.imgur.com/R4gmKJ5.jpg"
  },
  {
    nombre: "Demon Days",
    artista: "Gorillaz",
    imagen: "https://i.imgur.com/oTROxXH.jpg"
  },
  {
    nombre: "Selling England By The Pound",
    artista: "Genesis", 
    imagen: "https://i.imgur.com/KkHMqvp.png"
  } 
];

albumes.forEach(data => {
  Album.findOneAndUpdate(data, data, {
    new: true,
    upsert: true 
  }).exec();
});


