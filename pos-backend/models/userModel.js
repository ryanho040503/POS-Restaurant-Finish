const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required: true,
    },

    email : {
        type : String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /\S+@\S+\.\S+/.test(v);
            },
            message : "Email must be in valid format!"
        }
    },

    phone : {
        type : String,
        required : true,
        unique: true,
        validate : {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
        message : "Phone number must be 10 digits number!" 
        }
    },

    password : {
        type : String, 
        required : true,
    },

    role : {
        type : String,
        required : true,
    }
}, { timestamps: true })

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

module.exports = mongoose.model('User', userSchema);