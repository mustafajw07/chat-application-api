const mongoose = require('mongoose');


const userModel = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true,
        },
        pic : {
            type : String,
            default : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fuser_149071&psig=AOvVaw3hTmPcu3u-w_TJPUb47SAe&ust=1690700797365000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICKo7Wts4ADFQAAAAAdAAAAABAR"
        }
    },
    {
        timestamp : true
    }
)

const User = mongoose.model("User" , userModel);
module.exports = User;