import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
   const q = `SELECT *, U.id, P.id as postId FROM users U 
                     left join posts P on U.id = P.uid`;

   db.query(q, (err, data) => {
      if (err) return res.status(500).json("cannot retrivew data");
      res.json(data);
   });
};

// get single user
export const singleUser = (req, res) => {
   const userId = req.params.id;
   const q = `SELECT * FROM users WHERE id = ?`;

   db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json("cannot retrivew data");
      res.json(data);
   });
};

// delete User
export const deleteUser = (req, res) => {
   const token = req.cookies.access_token;
   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const userId = req.params.id;
      const q = "DELETE FROM users WHERE `id`  = ?";
      db.query(q, [userId], (err, data) => {
         if (err)
            return res.status(403).json("You can delete only your username!");
         return res.json("User has been deleted");
      });
   });
};

// Update user

export const updateUser = (req, res) => {
   const token = req.cookies.access_token;
   if (!token) return res.status(401).json("Not authenticated");

   jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");

      const userId = req.params.id;
      const q =
         "UPDATE  users SET `username`=?, `email`=?,`img`=? WHERE `id` = ?";
      const values = [req.body.username, req.body.email, req.body.img];

      db.query(q, [...values, userId], (err, data) => {
         if (err) return res.status(500).json(err);
         return res.json("User has been updated");
      });
   });
};
