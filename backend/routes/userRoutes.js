const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

//getting current user info

router.get('/me',auth, async(req,res)=>{
    const user= await User.findById(req.user.id).select('-password');
    if(!user) return res.status(400).json({msg:'user not found'});
    res.json(user);
});

//recharge wallet
router.post('/recharge',auth,async (req,res)=>{
    try{
        const {amount,bank} = req.body;
        if(!amount||amount<50) return res.status(400).json({msg:'Minimum Rechagr 50+'});
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });
        user.balance+=Number(amount);
        await user.save();

        res.json({msg:'Payment Successful',balance: user.balance});
    }catch(err){
        console.error(err);
        res.status(500).json({msg:'Server Error'});
    }
})

module.exports = router;