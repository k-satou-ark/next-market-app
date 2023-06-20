// utils/schemaModels.js

import mongoose from "mongoose";

const Schema = mongoose.Schema;

//アイテム用スキーマ
const ItemSchema = new Schema({

    title: String,
    image: String,
    price: String,
    description: String,
    email: String,

});

//ユーザー用スキーマ(ユーザーデータをデータベースに保存するための下準備)
const UserSchema = new Schema({

    name:  {
        type: String,
        required: true
    },

    email:  {
        type: String,
        required: true,//一意制約チェック
        unique: true
    },

    password:  {
        type: String,
        required: true
    },
});


export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export const UserModel = mongoose.models.User || mongoose.model("User",UserSchema);