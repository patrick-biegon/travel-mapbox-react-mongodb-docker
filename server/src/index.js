const express = require('express');
const promClient = require('prom-client');
require('dotenv').config();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

const middlewares = require('./middlewares');
const logs = require('./api/logs');
const user = require('./api/user');


const app = express();

// const apiMetrics = require('prometheus-api-metrics');
// app.use(apiMetrics());

// const checkoutsTotal = new promClient.Counter({
//     name: 'node_request_visits_total',
//     help: 'The total number of processed requests'
// });

// const histogram = new promClient.Histogram({
//     name: 'node_request_duration_seconds',
//     help: 'Histogram for the duration in seconds.',
//     buckets: [1, 2, 5, 6, 10]
// });

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
    // checkoutsTotal.inc();

    // var start = new Date()
    // var simulateTime = 1000

    // setTimeout(function (argument) {
    //     // execution time simulated with setTimeout function
    //     var end = new Date() - start
    //     histogram.observe(end / 1000); //convert to seconds
    // }, simulateTime);

    res.json({
        message: 'Hello 😎',
    });
});

// app.get('/metrics', (req, res) => {
//     console.log('Scraped');
//     res.send(promClient.register.metrics());
// });

app.use('/api/logs', logs);
app.use('/api/user', user);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});