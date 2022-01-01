require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

// DataBase and Auth
const connectDB = require("./db/connect.js")

// Routes
const authRoutes = require('./routes/auth.routes.js')
const postRoutes = require('./routes/post.routes.js')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// Middlewares - Security
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin:true,
  credentials:true
}));
app.use(xss());


// API-DOCUMENTATION

app.get('/', (req, res) => {
  res.send('<h1>News API</h1>');
});
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routes
app.use("/api/v1/users",authRoutes);
app.use("/api/v1/posts",postRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);




const port = process.env.PORT || 3000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
