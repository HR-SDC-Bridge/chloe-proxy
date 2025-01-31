const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 4000;
app.use(express.static(path.join(__dirname, '/../public')));
app.use(cors());

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

// C.Tan: Commenting out other services (in dev).
// app.get('/api/product/:id', (req, res) => {
//   // res.redirect(`http://localhost:3003/api/product/${req.params.id}`);
//   res.redirect(`http://ec2-54-67-28-46.us-west-1.compute.amazonaws.com:5003/api/product/${req.params.id}`);

// });

// app.get('/images/org/:id', (req, res) => {
//   res.redirect(`http://localhost:3004/images/org/${req.params.id}`);

// });

// app.get('/api/sizes/:id', (req, res) => {
//   res.redirect(`http://ec2-18-221-34-3.us-east-2.compute.amazonaws.com:3002/api/sizes/${req.params.id}`);

// });

// app.get('/api/reviews/:id/details', (req, res) => {
//   res.redirect(`http://ec2-100-25-191-161.compute-1.amazonaws.com/${req.params.id}`);

// });

app.get('/similar-products-by-views/:id', (req, res) => {
  // C.Tan: Switching to use my local instead (in dev).
  // axios.get(`http://18.222.25.224:3005/similar-products-by-views/${req.params.id}`)
  // axios.get(`http://localhost:5500/similar-products-by-views/${req.params.id}`
  // C.Tan: Switching to use my deployed service instead.
  // C.Tan 6/16/2021: Switching to use my load balancer IP instead.
  // axios.get(`http://3.143.80.36:5500/similar-products-by-views/${req.params.id}`)
  axios.get(`http://18.224.149.180/similar-products-by-views/${req.params.id}`)
    .then((result) => {
      res.send(result.data);
    })
    .catch((err) => {
      console.error('GET OTHERS ALSO VIEWED FAILED: ', err);
      res.sendStatus(500);
    });
});

const server = app.listen(port, function () {
  console.log(`listening on port:${port}`);
});

module.exports = server;