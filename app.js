import express from 'express';
import morgan from 'morgan';

const port = process.env.PORT || 3000;
const app = express();
const items = [
  {
    user: 'Anonymous',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, laudantium!',
    added: new Date(),
  },
  {
    user: 'Jeff',
    text: 'I love bânna, so I would love to taste your banana',
    added: new Date(),
  },
];

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

// setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index', { items });
});

app.post('/new', (req, res) => {
  const item = {
    user: 'Anonymous',
    text: req.body.message,
    added: new Date(),
  };
  items.push(item);
  res.redirect('/');
});

app.use((req, res) => {
  res.status(404).send('<p>404 not found</p>');
});
