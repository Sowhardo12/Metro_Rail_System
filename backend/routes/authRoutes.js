const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function getMetroId(){
    return 'METRO-'+Math.floor(1000+Math.random()*9000);
}

//signup for both user and admin
router.post('/signup',async(req,res)=>{
    try{
        const{fullName,email,phone,nid,password,role} = req.body;
        if(!fullName || !email || !password) return res.status(400).json({msg:'Missing Fields'});
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({msg:'Email Already used'});

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(password, salt);

        const user = new User({
            fullName,email,phone,nid,password:hashed,
            role: role||'user',
            userId:getMetroId(),
            balance:role&&role!='user' ? 0 : 50 
        });
        await user.save();

        const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.json({token,user:{fullName:user.fullName,email:user.email,role:user.role, balance:user.balance,userId:user.userId}});
    }catch(err){
        console.log(err);
        res.status(500).json({msg:'Server error'});
    }
});

//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { fullName: user.fullName, email: user.email, role: user.role, balance: user.balance, userId: user.userId }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;