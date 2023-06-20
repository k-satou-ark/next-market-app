// utils/auth.js
//createやupdateなどに該当するファイルが実行される前にトークンを確認して、ログイン状態を調べるもの
//このように特定の機能を持ってほかの処理を補助するものをミドルウェアといい、auth.jsもミドルウェアに該当するファイル

import jwt from "jsonwebtoken"

const secret_key = "nextmarket"
const auth = (handler) => {

    return async(req, res) => {

        if (req.method === "GET") {
            return handler(req, res)
        }

        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imstc2F0b3VAYXJrbGluZS5jby5qcCIsImlhdCI6MTY4NzIyNDAzMiwiZXhwIjoxNjg3MzA2ODMyfQ.IGu9JvWXVKw9Xn90gLoQWbUEYoNDXrt4KIuLykJmjRA";

        if (!token) {
            return res.status(401).json({message: "トークンがありません"});
        }

        try {
             const decoded = jwt.verify(token, secret_key);
             //console.log(decoded);
             req.body.email = decoded.email;
             return handler(req,res);
        } catch (err) {
            return res.status(401).json({message: "トークンが正しくないので、ログインしてください"});
        }

    }

};

export default auth;