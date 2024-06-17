import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import Item from './models/item.js';

const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const database = `mongodb+srv://${dbUser}:${dbPassword}@experiment.1kzizi3.mongodb.net/sample?retryWrites=true&w=majority&appName=experiment`;

mongoose
  .connect(database)
  .then((result) => {
    console.log('Connected to database');
    app.listen(port, () => console.log(`App listening at port ${port}`));
  })
  .catch((err) => console.log(err));

const app = express();

// setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// routes
app.get('/', (req, res) => {
  Item.find()
    .then((result) => res.render('index', { items: result }))
    .catch((err) => console.log(err));
});

app.post('/new', (req, res) => {
  const item = new Item({
    user: 'Anonymous',
    text: req.body.message,
    added: new Date(),
  });

  item
    .save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log(err));
});

app.use((req, res) => {
  res.status(404).send('<p>404 not found</p>');
});
