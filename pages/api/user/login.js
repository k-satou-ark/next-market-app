// /pages/api/user/login.js
//648fb24e4bdd60733c4f2c85

//JWTインポート
import jwt from "jsonwebtoken"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

//トークンのシークレットキー
const secret_key = "nextmarket";


const loginUser = async(req,res) =>{
    try {

        await connectDB();
        const savedUserData = await UserModel.findOne({email: req.body.email});
        //console.log(savedUserData);
        if (savedUserData) {//これできるんだ、JSは存在しないとか存在するという概念がtrueやfalseとリンクしてていいな
            //ユーザーデータが存在する場合の処理
            if (req.body.password === savedUserData.password) {
                //パスワードが正しい場合の処理

                //トークンのペイロード
                const payload = {
                    email: req.body.email,
                }

                //トークンを発行
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"});
                console.log(token);

                return res.status(200).json({massage: "ログイン成功", token: token});
            } else {
                //パスワードが間違っている場合の処理
                return res.status(400).json({message: "ログイン失敗: パスワードが間違っています"});
            }
            
        } else {
            //ユーザーデータが存在しない場合の処理
            return res.status(400).json({message: "ログイン失敗: ユーザー登録をしてください"});
        }

    } catch(err) {
        return res.status(400).json({message: "ログイン失敗"});
    }
    

}

export default loginUser;