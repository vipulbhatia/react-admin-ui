const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
    mysql = require('mysql'),
    bcrypt = require('bcrypt'),
    morgan = require('morgan'),
    multer = require('multer'),
    path = require('path'),
    { spawn } = require('child_process'),
    config = require('./config'),
    cors = require('cors');

const connection = mysql.createConnection({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB
});

const saltRounds = 10;
const upload = multer({ dest: '/home/vipul/Downloads/uploads/' });
const handleError = (err, res) => {
    console.log(err);
    res.status(200).json({ error: err });
}
const verify = (req, res, next) => {
    if(req.url != '/api/login' && req.url != '/api/register') {
        var error,
            clientJwt = req.get('Authorization') || req.query.access_token;
        console.log(clientJwt);
        jwt.verify(clientJwt, config.SECRET, (err, decoded) => {
            if(err) next(err);
            else next();
        });
    } else next();
}

connection.connect((err) => {
    if(err) throw err;
    console.log('connected to database...');
    connection.query(config.CREATE_USERS_TABLE, [], (err, results, fields) => {
        if(err) throw err;
        console.log('USERS table created or exists!');
    });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/static/', express.static(path.resolve(__dirname, '../build/static/')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.resolve(__dirname, '../build/favicon.ico')));
app.get('/service-worker.js', (req, res) => res.sendFile(path.resolve(__dirname, '../build/service-worker.js')));
app.use(verify);

app.get(/^\/(?!api)/, (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));
app.post('/api/upload', upload.single('zip_file'), (req, res, next) => {
    console.log(req.file);
    console.log(req.get('Authorization'));
    var unzip = spawn('unzip', ['-o', req.file.path, '-d', req.file.destination]);
    unzip.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
    res.status(200).json({ results: 'ok' });
});
app.get('/api/verify', (req, res, next) => {
    res.status(200).json({ results: 'ok' });
});
app.post('/api/login', (req, res, next) => {
    var error = '',
        email = req.body.email,
        password = req.body.password;
    connection.query('SELECT email, password FROM users WHERE email=? LIMIT 1', [email], (err, results, fields) => {
        if(err) next(err);
        else if(results.length) {
            bcrypt.compare(password, results[0].password, (err, match) => {
                if(err) next(err);
                else if(match) {
                    const token = jwt.sign({
                        email: email,
                        permissions: {
                            routes: {
                                'admin': true
                            }
                        }
                    }, config.SECRET, { expiresIn: '12h' });
                    res.status(200).json({ results: token });
                } else next('incorrect password!');
            });
        } else next('email does not exist!');
    });
});
app.post('/api/register', (req, res, next) => {
    console.log(req.body);
    var error = '',
        email = req.body.email,
        password = req.body.newPassword,
        confirmPassword = req.body.confirmPassword;
    (password === confirmPassword) ? error = '' : error = 'passwords do not match!';
    if(error) next(error);
    connection.query('SELECT email FROM users WHERE email=? LIMIT 1', [email], (err, results, fields) => {
        if(err) next(err);
        else if(results.length) next('email already exists!');
        else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                if(err) next(err);
                bcrypt.hash(password, salt, (err, hash) => {
                    connection.query('INSERT INTO users(email, password) values(?,?)', [email, hash], (err, results, fields) => {
                        if(err) next(err);
                        else {
                            res.status(200).json({ results: 'Email registered successfully!' });
                        }
                    });
                });
            });
        }
    });
});
app.get('/api/users', (req, res, next) => {
    connection.query('SELECT email, status, privilege FROM users', [], (err, results, fields) => {
        if(err) next(err);
        else res.status(200).json({ results: results });
    });
});

app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    if(typeof(err) !== 'string') err = err.message;//'something broke!';
    res.status(500).json({ error: err });
});

var server = app.listen(config.PORT, () => console.log('server running on port', server.address().port));
