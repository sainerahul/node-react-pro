const mongoose = require('mongoose')
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const {ObjectId} = mongoose.Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    // complicated long string
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    photo:{
        data:Buffer,
        contentType: String
    },
    about:{
        type:String,
        trim:true
    },
    following:[{type:ObjectId,ref:"User"}],
    followers:[{type:ObjectId,ref:"User"}]

    // reset p/w
    // resetPasswordLink: {
    //     data: String,
    //     default: ""
    // },

})

// virtual field (for passwords)
userSchema.virtual("password").set(function (password) {
    // temporary variable
    this._password = password;
    // generate a timestamp
    this.salt = uuidv1();
    // encryptPassword();
    this.hashed_password = this.encryptPassword(password);
}).get(function () {
    return this.password;
})
// methods
userSchema.methods ={
    authenticate: function(plaintext){
        return this.encryptPassword(plaintext)===this.hashed_password;
    },

    encryptPassword: function(password){
        if(!password) return "";
        try{
            return crypto.createHmac("sha1",this.salt).update(password).digest("hex");
        }
        catch(err){
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema)