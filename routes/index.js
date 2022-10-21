const express = require('express');
const router = express.Router();
const c = require('../controllers');
const mid = require('../helpers/middleware');

//Fitur untuk tabel user_game : daftar, login, ganti password, ganti name dan username
//dan hapus akun
router.post('/auth/register', c.auth.register);
router.post('/auth/login', c.auth.login);
router.put('/auth/changepassword', mid.mustLogin, c.auth.changePassword);
router.put('/auth/changeprofile', mid.mustLogin, c.auth.changeProfile);
router.delete("/auth/deleteaccount", mid.mustLogin, c.auth.deleteAccount);

//Fitur untuk tabel user_game_biodata : tampilkan data biodata, menambahkan biodata, mengubah biodata, 
//dan menghapus biodata
router.post("/bio/addbio", mid.mustLogin, c.bio.add);
router.get("/bio/showbio", mid.mustLogin, c.bio.show);
router.put("/bio/updatebio", mid.mustLogin, c.bio.update);
router.delete("/bio/deletebio", mid.mustLogin, c.bio.delete);

//Fitur untuk tabel user_game_biodata : tampilkan semua data history dari user, menambahkan history, mengubah history, 
//dan menghapus history
router.post("/history/addhistory", mid.mustLogin, c.history.add);
router.get("/history/showhistory", mid.mustLogin, c.history.showAll);
// router.put("/history/updatehistory", mid.mustLogin, c.history.update);
// router.delete("/history/deletehistory", mid.mustLogin, c.history.delete);

// router.get('/', c.auth.index)

module.exports = router;
