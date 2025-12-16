const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const bcrypt = require('bcrypt');

const UserObject = require("../models/user");

const config = require("../config");

const JWT_MAX_AGE = "6m"; // 6 months

const hashPassword = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pass, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error with hash', error);
        throw error;
    }
};

// Authentification (sign in)
router.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
    return res.status(400).send({
        ok: false,
        code: "USERNAME_AND_PASSWORD_REQUIRED",
        message: "Username and password are required",
    });

    try {
        const user = await UserObject.findOne({ username });

        if (!user)
        return res.status(401).send({
            ok: false,
            code: "INVALID_USER",
            message: "Username doesn't exist",
        });

        const match =
        // config.ENVIRONMENT === "development" ||
        (await user.verifyPassword(password, user.password));
        if (!match)
        return res.status(401).send({
            ok: false,
            code: "PASSWORD_INVALID",
            message: "Password is invalid",
        });

        const token = jwt.sign({ _id: user.id }, config.SECRET, {
        expiresIn: JWT_MAX_AGE,
        });

        return res.status(200).send({ ok: true, token, data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ ok: false, code: "SERVER_ERROR" });
  }

});


// User by id
router.get("/:id", async (req, res) => {
    try {
        const user = await UserObject.findById(req.params.id);
        if (!user) {
            res.status(404).send({ ok: false, message: "User not found" });
        }
        res.status(200).send({ ok: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
    }
});

// All users
router.get("", async (req, res) => {
    try {
        const allUsers = await UserObject.find();
        if (!allUsers) {
            res.status(404).send({ ok: false, message: "No users found" });
        }
        res.status(200).send({ ok: true, data: allUsers });
    } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
    }
});

// Create user/Sign up
router.post("",
    async (req, res) => {
        const { username, password } = req.body;

        if (!username || !password)
        return res.status(400).send({
            ok: false,
            code: "USERNAME_AND_PASSWORD_REQUIRED",
            message: "Username and password are required",
        });

        try {
            const existingUser = await UserObject.findOne({ username });

            if (existingUser)
            return res.status(401).send({
                ok: false,
                code: "INVALID_USERNAME",
                message: "Username is taken",
            });

            const hashedPassword = await hashPassword(password);

            const user = new UserObject({
                password: hashedPassword,
                username: username
            });
            await user.save();
            res.status(200).send({ ok: true, data: user });
        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// Update user
router.put("/:id",
//   passport.authenticate(["user", "admin"], {
//     session: false,
//     failWithError: true,
//   }),
    async (req, res) => {
        try {
        // if (req.user._id !== req.params.id && req.user._type !== "admin")
        // return res.status(403).send({ ok: false, code: "FORBIDDEN" });

        const user = await UserObject.findById(req.params.id);
        const { password } = req.body;
        const hashedPassword = await hashPassword(password);

        user.set({ password: hashedPassword });
        await user.save();
        res.status(200).send({ ok: true, data: user });

        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);

// Delete user
router.delete("/:id",
    async (req, res) => {
        try {
        // if (req.user._id !== req.params.id && req.user._type !== "admin")
        // return res.status(403).send({ ok: false, code: "FORBIDDEN" });

        const result = await UserObject.deleteOne({ _id: req.params.id });
        res.status(200).send({ ok: true, message: `${result.deletedCount} user(s) deleted` });

        } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, code: "SERVER_ERROR", error });
        }
    }
);




module.exports = router;