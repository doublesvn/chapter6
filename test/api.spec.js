const request = require("supertest");
const app = require("../app");
let token = "";

describe("/auth/register - succes", () => {
    let name = 'akun kedua';
    let username = 'username2';
    let password = 'password123';
    test("res.json { status : true, message :  success , data : { name :  akun pertama , username :  username10 }}", 
    async () => {
      const res = await request(app).post("/auth/register").send({
        name,
        username,
        password,
      });
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
    });
});

describe("/auth/register - duplicate username", () => {
    let name = 'username ketiga';
    let username = 'username2';
    let password = 'password123';
    test("res.json {  status : false,  message :  username already used!  }", async () => {
      const res = await request(app).post("/auth/register").send({
        name,
        username,
        password,
      });
      expect(res.body.status).toEqual(false);
      expect(res.statusCode).toEqual(409);
      expect(res.body).toHaveProperty("message");
    });
});

describe("/auth/login - Login Failed - Username mismatch ", () => {
    test("res.json { status: false, message: username or password doesn't match! }", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "username123",
        password: "password123",
      });
      expect(res.body.status).toEqual(false);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
});

describe("/auth/login - Login Failde - Username mismatch ", () => {
    test("res.json { status: false, message: username or password doesn't match! }", async () => {
      const res = await request(app).post("/auth/login").send({
        username: "username2",
        password: "password1",
      });
      expect(res.body.status).toEqual(false);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
});

describe("/auth/login - success", () => {
  test("res.json {  status : true,  message :  success ,  data : {  token :  {token} }}", async () => {
    const res = await request(app).post("/auth/login").send({
      username: "username2",
      password: "password123",
    });
    expect(res.body.status).toEqual(true);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    token = res.body.data.token;
  });
});

describe("/auth/changepassword- change password failed - password wrong", () => {
    test("res.json { status: false, message: old password does not match!}", async () => {
      const res = await request(app)
        .put("/auth/changepassword")
        .set("Authorization", `${token}`)
        .send({
          oldPassword: "password789",
          newPassword: "password789",
          confirmNewPassword: "password789",
        });
      expect(res.body.status).toEqual(false);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("message");
    });
});

describe("/auth/changepassword- change password failed - newpassword not same with confirmpassword", () => {
  test("res.json { status: false, message: new password and confirm new password doesnt match!}", async () => {
    const res = await request(app)
      .put("/auth/changepassword")
      .set("Authorization", `${token}`)
      .send({
        oldPassword: "password123",
        newPassword: "password789",
        confirmNewPassword: "password123",
      });
    expect(res.body.status).toEqual(false);
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty("message");
  });
});

describe("/auth/changepassword - success", () => {
    test("res.json { status: true, message: success, data: [id ] }", async () => {
      const res = await request(app)
        .put("/auth/changepassword")
        .set("Authorization", `${token}`)
        .send({
          oldPassword: "password123",
          newPassword: "password789",
          confirmNewPassword: "password789",
        });
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");

    });
});


describe("/auth/changeprofile - succes", () => {
    test("res.json { status: true, message: update success,data: [ id ] }", async () => {
      const res = await request(app)
        .put("/auth/changeprofile")
        .set("Authorization", `${token}`)
        .send({
          name: 'usernameupdate',
          username: 'username2'
        });
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
    });
});


describe("/bio/addbio - success", () => {
    test("res.json { status: false, message: success, data: { [data] } }", async () => {
      const res = await request(app)
        .post("/bio/addbio")
        .set("Authorization", `${token}`)
        .send({
          biodata : "fanny user 100% winrate uhuyy",
        });
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
    });
});

describe("/show/bio - success", () => {
    test("res.json { status: true, message: show success, data: { [data] } }", async () => {
        const res = await request(app)
        .get("/bio/showbio")
        .set("Authorization", `${token}`);
        expect(res.body.status).toEqual(true);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("data");
    });
});

describe("/bio/updatebio - success", () => {
    test("res.json { status: true, message: update bio success, data: [data]}", async () => {
      const res = await request(app)
        .put("/bio/updatebio")
        .set("Authorization", `${token}`)
        .send({
          biodata:"biodata baru"
        });
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");

    });
});

describe("/bio/deletebio - success", () => {
    test("res.json { status: true, message: success }", async () => {
        const res = await request(app)
        .delete("/bio/deletebio")
        .set("Authorization", `${token}`);
        expect(res.body.status).toEqual(true);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message");
    });
});
  
describe("/history/addhistory - success", () => {
    test("res.json { status: true, message: success, data: { [data] } }", async () => {
      const res = await request(app)
        .post("/history/addhistory")
        .set("Authorization", `${token}`)
        .send({
            character:"link",
            match_result:"lose"
        });
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("data");
    });
});
  

describe("/history/showhistory - success", () => {
    test("res.json { status: true, message: show success, data: [ { [data]}}", async () => {
        const res = await request(app)
        .get("/history/showhistory")
        .set("Authorization", `${token}`);
        expect(res.body.status).toEqual(true);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("data");
    });
});


describe("/auth/deleteaccount - success", () => {
  test("res.json { status: true, message: success }", async () => {
      const res = await request(app)
      .delete("/auth/deleteAccount")
      .set("Authorization", `${token}`);
      expect(res.body.status).toEqual(true);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message");
  });
});

