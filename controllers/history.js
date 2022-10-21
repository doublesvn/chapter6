const { user_game_history } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports ={
    add:async (req, res, next) => {

        try {
                const { character, match_result} = req.body;
                console.log("req body "+character+" "+match_result)
                const id_user = req.user.id
                console.log("id user "+id_user)
                const history = await user_game_history.create({
                    character : character,
                    match_result: match_result,
                    id_user_game : id_user
                });
    
                return res.status(201).json({
                    status: true,
                    message: 'success',
                    data: {
                        history
                    }
                });
        }catch(error){
            next(error);

        }
    },

    showAll:async (req, res, next) => {
        try{
            const id = req.user.id;
            console.log( req.user.id)
            const biodata = await user_game_history.findAll({ where: { id_user_game: id } });
            if (!biodata) {
                return res.status(404).json({
                  status: false,
                  message: "History kosong",
                });
            }
            return res.status(200).json({
                status: true,
                message: 'show success',
                data: biodata
            });
        }catch(error){
            next(error);

        }
    },
    // update: async (req, res, next) => {
    //     try {
    //         let { id, character, match_result } = req.body;
            
    //         const cekhis = await user_game_history.findOne({ where: { id:id, id_user_game: req.user.id } });
    //         if (!cekhis) return res.status(404).json({ success: false, message: 'History not found' });

    //         if (!cekhis){
    //             character=cekhis.biodata,
    //             match_result=cekhis.match_result
    //         }
    //         const updatedHis = await user_game_history.update({
    //             character: character,
    //             match_result:match_result
    //         }, {
    //             where: {
    //                 id : id
    //             }
    //         });

    //         return res.status(200).json({
    //             status: false,
    //             message: 'update bio success',
    //             data: {
    //                 id : id,
    //                 character: updatedHis.character,
    //                 match_result: updatedHis.match_result,
                    
    //             }
    //         });

    //     } catch (err) {
    //         next(err);
    //     }
    // },
    // delete: async (req, res, next) => {
    //     try {
    //         let { id } = req.body;
            
    //         const cekhis = await user_game_history.findOne({ where: { id:id, id_user_game: req.user.id } });
    //         if (!cekhis) return res.status(404).json({ success: false, message: 'History not found' });
        
    //         await user_game_history.destroy({ where: { id:id, id_user_game: req.user.id } });
    //         return res.status(200).json({
    //             status: true,
    //             message: "delete success",
    //         });
    //     } catch (error) {
    //       next(error);
    //     }
    //   }
}