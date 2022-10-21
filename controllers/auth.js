const { user_game } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    JWT_SIGNATURE_KEY
} = process.env;

module.exports = {
    index: (req, res) => {
        return res.status(200).json({
            status: true,
            message : 'hello world!'
        })
    },
    register: async (req, res, next) => {
        try {
            const { name, username, password } = req.body;

            const existUser = await user_game.findOne({ where: { username: username } });
            if (existUser) {
                return res.status(409).json({
                    status: false,
                    message: 'username already used!'
                });
            }

            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await user_game.create({
                name,
                username,
                password: encryptedPassword
            });

            return res.status(201).json({
                status: true,
                message: 'success',
                data: {
                    name: user.name,
                    username: user.username
                }
            });
        } catch (err) {
            next(err);
        }
    },

    login: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            console.log(req.body)

            const user = await user_game.findOne({ where: { username: username } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'username or password doesn\'t match!'
                });
            }

            const correct = await bcrypt.compare(password, user.password);
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: 'username or password doesn\'t match!'
                });
            }

            // generate token
            payload = {
                id: user.id,
                name: user.name,
                username: user.username,
            };
            const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

            return res.status(200).json({
                status: true,
                message: 'success',
                data: {
                    token: token
                }
            });
        } catch (err) {
            next(err);
        }
    },

    
 
    changePassword: async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            
            if (newPassword !== confirmNewPassword) {
                return res.status(422).json({
                    status: false,
                    message: 'new password and confirm new password doesnt match!'
                });
            }

            const user = await user_game.findOne({ where: { id: req.user.id } });
            if (!user) return res.status(404).json({ success: false, message: 'User not found!' });
            console.log(oldPassword);
            console.log(user.password);
            const correct = await bcrypt.compare(oldPassword, user.password);
            if (!correct) {
                return res.status(400).json({
                    status: false,
                    message: 'old password does not match!'
                });
            }

            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUser = await user_game.update({
                password: encryptedPassword
            }, {
                where: {
                    id: user.id
                }
            });

            return res.status(200).json({
                status: true,
                message: 'success',
                data: updatedUser
            });

        } catch (err) {
            next(err);
        }
    },

    changeProfile: async (req, res, next) => {
        try {
            let { name, username } = req.body;
            
            const user = await user_game.findOne({ where: { id: req.user.id } });
            if (!user) return res.status(404).json({ success: false, message: 'User not found!' });

            if (!name){
                name=user.name
            }
            if (!username){
                username=user.username
            }
            console.log(name , username)
            const updatedUser = await user_game.update({
                name: name,
                username: username
            }, {
                where: {
                    id: user.id
                }
            });

            return res.status(200).json({
                status: true,
                message: 'update success',
                data: updatedUser
            });

        } catch (err) {
            next(err);
        }
    },

    deleteAccount: async (req, res, next) => {
        try {
            const { id } = req.user;
            const user = await user_game.findOne({ where: { id: id } });
            if (!user) {
                return res.status(404).json({
                status: false,
                message: "user not found!",
                });
            }
            await user_game.destroy({ where: { id: id } });
            return res.status(200).json({
                status: true,
                message: "success",
            });
        }catch (error) {
            next(error);
        }
    },
    
}