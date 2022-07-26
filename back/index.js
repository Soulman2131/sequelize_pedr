const express = require('express');
const colors = require('colors');
const logger = require('./middleware/logger');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const PORT = process.env.PORT || 5000;
const app = express();

//DB
const db = require('./models');

//LOGGER
app.use(logger);

//BODY-PARSER && CORS
app.use(bodyParser.json());
app.use(cors());

//ROUTES
app.use('/api/posts', require('./routes/postRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/likes', require('./routes/likeRoute'));

db.sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () =>
      console.log(
        `App listening on mode ${process.env.NODE_ENV} in the port ${process.env.PORT}`.white
          .inverse
      )
    );
  })
  .catch(err => console.log(err)).white;
