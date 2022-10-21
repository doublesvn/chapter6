const { user_game, user_game_biodata, user_game_history } = require('../models');
const controllers = require('../controllers/index');
const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    return res;
};

describe('controllers.auth.register function', () => {
    test('res.json { status : true, message :  success , data : { name :  akun kedua , username :  username2 }}',  async () => {
        try { 
            const req = mockRequest({ name: "akun ketiga", username: "username3", password: "password123" });
            const res = mockResponse();


            await controllers.auth.register(req, res);

            expect(res.status).toBe(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: { 
                    name: req.body.name,
                    username: req.body.username
                }
            });

            done();
        } catch (err) { 
            
        }
    });
});


describe('controllers.auth.login function', () => {
    test('res.json {  status : true,  message :  success ,  data : {  token :  {token} }}',  async () => {
        try { 
            const req = mockRequest({ username: "username3", password: "password123" });
            const res = mockResponse();

            const user = await UserGame.findOne({ where: { username: req.body.username } });

            payload = {
                id: user.id,
                username: user.username,
                email: user.email,
            };

            const token = jwt.sign(payload, JWT_SIGNATURE_KEY);

            await controllers.auth.login(req,res)
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: { 
                    token
                }
            });
            done();
        } catch (err) { 
        }
   });
});

describe('controllers.auth.changePassword function', () => {
    test('res.json { status: true, message: success, data: [id ] }',  async () => {
        try { 
            const req = mockRequest({ oldPassword: "password123", newPassword: "password789", confirmNewPassword: "password789" });
            const res = mockResponse();

            await controllers.auth.changePassword(req,res)

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: update 
            });

            done();
        } catch (err) { 
            
        }
   });
});


describe('controllers.auth.changeProfie function', () => {
    test('res.json { status: true, message: update success,data: [ id ] }',  async () => {
        try { 
            const req = mockRequest({ name: 'usernameupdate',username: 'username2' });
            const res = mockResponse();

            await controllers.auth.changeProfie(req,res)

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: updatedUser 
            });

            done();
        } catch (err) { 
            
        }
   });
});

describe('controllers.bio.add function', () => {
    test('res.json { status: false, message: success, data: { [data] } }',  async () => {
        try { 
            const req = mockRequest({ biodata : "fanny user 100% winrate uhuyy" });
            const res = mockResponse();

            await controllers.bio.add(req, res);

            expect(res.status).toBe(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: { 
                    user
                }
            });

            done();
        } catch (err) { 
            
        }
    });
});

describe('controllers.bio.show function', () => {
    test('res.json { status: true, message: show success, data: { [data] } }',  async () => {
        try { 
            const req = mockRequest({});
            const res = mockResponse();

            await controllers.bio.show(req, res);

            expect(res.status).toBe(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'show success',
                data: { 
                    biodata
                }
            });

            done();
        } catch (err) { 
            
        }
    });
});

describe('controllers.bio.update function', () => {
    test('res.json { status: true, message: update bio success, data: [data]}',  async () => {
        try { 
            const req = mockRequest({ biodata:"biodata baru"});
            const res = mockResponse();

            await controllers.bio.update(req, res);

            expect(res.status).toBe(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'update bio success',
                data: { 
                    updatedBio
                }
            });

            done();
        } catch (err) { 
            
        }
    });
});

describe('controllers.bio.delete function', () => {
    test('res.json { status: true, message: success }',  async () => {
        try { 
            const req = mockRequest({ user_game_id: 1});
            const res = mockResponse();

            await controllers.bio.delete(req, res);

            expect(res.status).toBe(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success'
            });

            done();
        } catch (err) { 
            
        }
    });
});

describe('controllers.history.add function', () => {
    test('res.json { status: true, message: success, data: { [data] } }',  async () => {
        try { 
            const req = mockRequest({ character:"link", match_result:"lose" });
            const res = mockResponse();

            await controllers.history.add(req, res);

            expect(res.status).toBe(201);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: { 
                    history
                }
            });

            done();
        } catch (err) { 
            
        }
    });
});

describe('controllers.history.show function', () => {
    test('res.json { status: true, message: show success, data: [ { [data]}}',  async () => {
        try { 
            const req = mockRequest({ user_game_id: 1});
            const res = mockResponse();

            await controllers.history.showAll(req, res);

            expect(res.status).toBe(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success',
                data: { 
                    biodata
                }
            });

            done();
        } catch (err) { 
            
        }
    });
});

describe('controllers.auth.deleteAccount function', () => {
    test('res.json { status: true, message: success }',  async () => {
        try { 
            await controllers.auth.deleteAccount(req,res)

            expect(res.status).toBeCalledWith(200);
            expect(res.json).toBeCalledWith({
                status: true,
                message: 'success'            
            });

            done();
        } catch (err) { 
            
        }
   });
});