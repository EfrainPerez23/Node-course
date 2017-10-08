let express = require('express');
let hbs = require('hbs');
let fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.render('welcome.hbs', {
        welcomeMessage: 'Welcome to Express Server',
        pageTitle: 'Home Page'
    })
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (request, response) => {
    response.send({ error: 'Unable to Handle Request!' });
});


app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});