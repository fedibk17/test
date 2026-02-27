const mongosse = require("mongoose");
//create user schema
const userSchema = new mongosse.Schema({
    
    first_name:{type: String,
        required: true
    },
    last_name:{type: String,
        required: true
    },
    email:{type: String,
        required: true
    },
    password:{type: String,
        required: true
    }

},{timestamps: true});//add createAt and updatedAt to the doc

module.exports = mongosse.model("User",userSchema);