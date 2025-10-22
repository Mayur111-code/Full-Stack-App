// //Create a server
// const express = require('express');
// const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/auth.routes')
// const foodRoutes = require('./routes/food.routes')
// const foodPartnerRoutes = require('./routes/food-partner.routes');



// import cors from 'cors';

// const app = express();
// app.use(cors({
//     origin: "http://localhost:5174/",
//     Credential: true
// }));
// app.use(cookieParser());
// app.use(express.json());
// //app.use(express.urlencoded({ extended: true })); // to parse form data


// app.get('/', (req, res) => {
//     res.send("HELLO WORLD");
// })

// app.use('/api/auth', authRoutes);
// app.use('/api/food', foodRoutes);
// app.use('/api/food-partner', foodPartnerRoutes);

// module.exports = app;


// Create a server
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Use require for CommonJS
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // if you need form data

app.get('/', (req, res) => {
    res.send("HELLO WORLD");
});

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;
