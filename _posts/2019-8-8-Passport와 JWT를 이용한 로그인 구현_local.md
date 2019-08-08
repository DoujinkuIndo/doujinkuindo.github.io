---
layout: post
title: Passport와 JWT를 이용한 로그인 구현_local
date: 2019-08-08
comments: true
categories: [Study, nodejs]
tags: [NodeJs, Passport, JWT]
excerpt: 요즘은 대부분의 서비스가 자체 사이트 회원가입과 로그인 뿐만 아니라 구글, 페이스북 등 기존 유저가 가지고 있던 어카운트를 활용하여 로그인 하는 소셜로그인 서비스를 제공한다.
---

요즘은 대부분의 서비스가 자체 사이트 회원가입과 로그인 뿐만 아니라 구글, 페이스북 등 기존 유저가 가지고 있던 어카운트를 활용하여 로그인 하는 소셜로그인 서비스를 제공한다. 한 가지의 소셜 로그인만 제공을 한다면 해당 SNS에서 제공하는 API를 사용하면 되겠지만, 여러가지 로그인 방법을 앱에 탑재하고 싶다면 **[Passport 모듈](https://github.com/jaredhanson/passport)을 활용**하는것이 좋을 것 같다.

Passport 모듈은 다양한 인증 API를 간편하게 구현할 수 있도록 하는 모듈로, user 정보를 session에 저장한다. 하지만 JWT을 사용하는 동시에 session을 사용하는 것은 불필요한 작업이다. 다행히도 Passport는 사용자 정보를 session에 저장하는 대신 request에 저장할 수 있는 기능을 제공하고 있다.

### Passport 설치

Passport는 각 SNS별 로그인 기능을 패키지화해서 제공하므로, `passport`와 원하는 패키지를 설치해 주면 되는데, 이번 포스팅은 local 로그인에 관한 내용을 다룰 것이므로, `passport`와 `passport-local`을 설치한다. 또한, JWT 구현을 위해 `passport-jwt`와 `jsonwebtoken`도 설치한다.

```bash
$ yarn add passport passport-local passport-jwt jsonwebtoken
```

### passport 폴더 내 index.js 작성

passport 디렉토리를 만들고, index.js 파일을 만든다.
회원가입 시, 비밀번호를 암호화하여 저장하였기 때문에, 저장된 암호화된 비밀번호와, 입력된 비밀번호의 암호화 값이 같은지를 확인하는 내용을 추가하였다.

```javascript
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const { Users } = require("../models");
const crypto = require("crypto");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pw"
    },
    function(email, password, cb) {
      let encryptedPw = crypto
        .createHash("sha1")
        .update(password)
        .digest("hex");

      return Users.findOne({ where: { email } })
        .then(user => {
          if (!user || user.dataValues.pw !== encryptedPw) {
            return cb(null, false, { message: "Incorrect email or password." });
          }
          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch(err => cb(err));
    }
  )
);
```

### users 라우터 작성

`/users/signin` 엔드포인트로 로그인을 하도록 작성했다. 이전에 작성한 passport 쪽 로그인 로직을 통해 user가 없거나, 비밀번호가 일치하지 않으면 `user = false` 값이 전달될 것이다. user 값이 있다면 이를 이용하여 token을 형성하여 front로 token을 전달하는 로직이다.

```javascript
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Users } = require("../models");

router.post("/signin", function(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400);
    }
    if (!user) {
      return res.status(200).json({
        message: "로그인에 실패했습니다.",
        success: false
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user.email, `${process.env.JWT_SECRET}`);
      return res.json({ userToken: token, success: true });
    });
  })(req, res);
});
```

### app.js 작성

app.js 파일에 passport를 import하고, `/users` 라우터를 작성한다.

```javascript
const passport = require("passport");
require("./passport");

app.use("/users", usersRouter);

module.exports = app;
```
