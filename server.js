const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');

const app = express();

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded());
app.use(express.json());
app.use(passport.initialize());
app.use(cors())

require('./app/auth/passport');

app.use(require('./app/auth/routes'));
app.use(require('./app/post/routes'))
app.use(require('./app/story/routes'));
app.use(require('./app/comments/routes'));
app.use(require('./app/subscription/routes'));
app.use(require('./app/like/routes'));



const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});