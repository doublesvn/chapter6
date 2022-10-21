const { user_game_biodata } = require('../models');

module.exports ={
    add:async (req, res, next) => {

        try {
                const { biodata} = req.body;

                const cekbio = await user_game_biodata.findOne({ where: { id_user_game: req.user.id } });
                if (cekbio) {
                    return res.status(409).json({
                        status: false,
                        message: 'bio sudah ada'
                    });
                }

                const id_user = req.user.id
                console.log(id_user)
                const user = await user_game_biodata.create({

                    biodata : biodata,
                    id_user_game : id_user
                });
    
                return res.status(201).json({
                    status: true,
                    message: 'success',
                    data: {
                        user
                    }
                });
        }catch(error){
            next(error);

        }
    },

    show:async (req, res, next) => {
        try{
            const id = req.user.id;
            console.log( req.user.id)
            const biodata = await user_game_biodata.findOne({ where: { id_user_game: id } });
            if (!biodata) {
                return res.status(404).json({
                  status: false,
                  message: "Biodata kosong",
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
    update: async (req, res, next) => {
        try {
            let { biodata } = req.body;
            
            const cekbio = await user_game_biodata.findOne({ where: { id_user_game: req.user.id } });
            if (!cekbio) return res.status(404).json({ success: false, message: 'Biodata not found' });

            if (!biodata){
                biodata=cekbio.biodata
            }
            console.log(biodata)
            const updatedBio = await user_game_biodata.update({
                biodata: biodata
            }, {
                where: {
                    id_user_game: req.user.id 
                }
            });

            return res.status(200).json({
                status: true,
                message: 'update bio success',
                data: updatedBio
            });

        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
          const { id } = req.user;
          const bio = await user_game_biodata.findOne({ where: { id_user_game: id } });
          if (!bio) {
            return res.status(404).json({
              status: false,
              message: "user not found!",
            });
          }
    
          await user_game_biodata.destroy({ where: { id_user_game: id } });
          return res.status(200).json({
            status: true,
            message: "success",
          });
        } catch (error) {
          next(error);
        }
      }
}