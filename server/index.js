const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');


// Routes
const routes = require('./routes/api');

// Error Middlewares
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express();
// Connect to mongodb
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}))
dotenv.config();

app.use('/api', routes);

// Error handling middleware
// app.use((err, req, res, next) => {
//     const { message } = err.errors.name;
//     const errorName = err.name;
//     console.log(err);
//     res.send({
//         error: {
//             errorName: errorName,
//             message: message,
//             stack: err.stack
//         }
//     })
// })

app.use(errorMiddleware.notFound);
app.use(errorMiddleware.errorHandlerMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Now listening to port ${port}`);
})