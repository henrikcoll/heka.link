const PORT = process.env.PORT || 3000;

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/api'));
app.use('/', require('./routes/short'));

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status)
  } else {
    res.status(500)
  }

  if (process.env.NODE_ENV === 'production')
    return res.json({ message: 'server error', code: 500 })

  res.json({
    message: error.message,
    stack: error.stack
  })
})

app.listen(PORT);