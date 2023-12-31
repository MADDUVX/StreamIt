import { Router } from "express";
import { User, loginValidate, regValidate } from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/register", async (req, res) => {
  const { error, value } = regValidate.validate(req.body);
  if (error) return res.status(400).send(error.message);
  const regUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  try {
    const resp = await regUser.save();
    res.status(201).send(resp);
  } catch (error) {
    res.status(500).send("Error from server");
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) return res.status(404).json("User not found");
    else {
      
      var bytes = CryptoJS.AES.decrypt(
        findUser.password,
        process.env.SECRET_KEY
      );
      var origPassword = bytes.toString(CryptoJS.enc.Utf8);

      const {password, ...info} = findUser._doc;
      if (origPassword === req.body.password) {
        const accessToken = jwt.sign({id:findUser._id, isAdmin:findUser.isAdmin}, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });  //using id and admin for signing
        res.status(200).json({...info, accessToken});
        res.s
      } 
      else res.status(401).json("Incorrect Password");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
