const { User } = require('../models/user.model');
const bcrypt = require('bcrypt')
const register = async (req, res) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try {
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });

        console.log(newUser);
        const savedUser = await newUser.save();

        if (savedUser) {
            res.status(200).json(savedUser);
        } else {
            console.log('we are here');
            res.status(404).json({ message: 'Error in data' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
}
const authentication = async(req, res)=>{
    const {email, password} = req.body 

    
    try
    {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const match = await bcrypt.compare(password, user.password)
        if(match)
        {
            console.log('... matched')
            const {password, ...others} = user._doc 
                res.status(200).json(others)  
        }
        else
        {
            res.status(404).json({message: 'Invalid password'})
        }
    }
    catch(err)
    {   
        console.error(err)
        res.status(500).json({message: err.message})
    }   
}

module.exports = { register, authentication };
