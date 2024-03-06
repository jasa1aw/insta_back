const bcrypt = require('bcrypt');
const User = require('./User');
const jwt = require('jsonwebtoken');
const {jwtOptions} = require('./passport');

const signUp = async(req, res) => {
    try {
        if(
            req.body.email.length > 0 &&
            req.body.full_name.length > 0 &&
            req.body.username.length > 0 &&
            req.body.password.length > 0
        ){
            const findUser = await User.findOne({where: {email: req.body.email}});
            if(findUser){
                res.status(401).send({message: 'such a user already exists'});
            }else{
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, function(err, hash){
                        const user = User.create({
                            email: req.body.email,
                            full_name: req.body.full_name,
                            username: req.body.username,
                            password: hash
                        });
                        res.status(200).send(user);
                    });
                });
            }
        }else{
            res.status(401).send({message: 'fill in the blanks'});
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const signIn = async (req, res) =>{
    try {
        const user = await User.findOne({where: {email: req.body.email}});
        if(!user){
            return res.status(401).json({message: 'Неверный email или пароль'});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch){
            return res.status(401).json({message: 'Неверный email или пароль'});
        }
        // Проверка имени пользователя и пароля в базе данных
        // При успешной аутентификации, создайте JWT токен
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            username: user.username,
            phone: user.phone
        }, jwtOptions.secretOrKey,
        {
            // продолжительность токена
            expiresIn: 24 * 60 * 60
        });
        res.status(200).json({message: 'Вход выполнен успешно', token});
    } catch (error) {
        res.status(500).send(error);
    }
};

const editUser = async(req, res) =>{
    try {
        if(
            req.body.email.length > 0 &&
            req.body.full_name.length > 0 &&
            req.body.username.length > 0
        ){
            const user = await User.update({
                email: req.body.email,
                full_name: req.body.full_name,
                username: req.body.username,
                phone: req.body.phone || null
            },{where: {id: req.user.id}}
            )
            res.status(200).end();
        }else{
            res.status(403).send({message: 'Заполните все поля'});
        }
    } catch (error) {
        res.status(500).send(error)
    }
};


const userDetailInfo = async(req, res) => {
    try {
        const user = await User.findOne({
            where: {username: req.params.username},
            attributes: { exclude: ['password'] }, // Исключаем поле password из выборки
        });
        if(user) res.status(200).send(user)
        else res.status(404).send({message: "User not found"})
    } catch (error) {
        res.status(500).send(error)
    }
};

const getUserInfoById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {id: req.params.id},
            attributes: { exclude: ['password'] }, // Исключаем поле password из выборки
    })
        if(user) res.status(200).send(user);
        else res.status(404).send({message: "User not found"});
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {signUp, signIn, editUser, userDetailInfo, getUserInfoById}