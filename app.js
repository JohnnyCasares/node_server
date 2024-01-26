const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');
//express app
const app = express();
//connect to mongoDB
const uri = "mongodb link";
mongoose.connect(uri)
    .then((result) => {
        //listen for requests only after connection is established with database
        app.listen(3000);
        console.log('connected to database\nlocalhost:3000');
    })
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

//Morgan package: middleware for logging
app.use(morgan('dev'));

// middleware and static
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.use(
    (req, res, next) => {

        console.log('New requestmade:');
        console.log('Host: ', req.hostname);
        console.log('path: ', req.path);
        console.log('method: ', req.method);
        next();
    }
);

app.use(blogRoutes);

app.use(
    (req, res, next) => {

        console.log('IN THE NEXT MIDDLEWARE');

        next();
    }
);
app.get(
    '/about',
    (req, res) => {

        // res.send('<p>about page</p>'); 
        // res.sendFile('./views/about.html', { root: __dirname });
        res.render('about',
            {
                title: 'About'
            });
    }
);
//404 page
app.use(
    (req, res) => {
        // res.status(404).sendFile('./views/404.html', { root: __dirname });
        res.status(404).render('404',
            {
                title: '404'
            });
    }
);


