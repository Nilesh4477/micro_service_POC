import User from "../model/user.model.js";

export const getUser = async (req, res) => {
    try {
        const userId = req.params;
        const user = await User.findOne({
            _id: userId.id
        },
        {
            name : 1,
            email:1,
        }
    );

        return res.status(200).json({ user: user })

    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });

    }



} 

export const getUsers =  async (req,res)=>{
    try {
        const {userIds} = req.body;
console.log(req.body)
        const users = await User.find({_id:{$in: userIds}},{name:1,email:1,isActive:1});
        console.log(users,"users")
    
        return res.status(200).json({users})
    } catch (error) {
        
    }


}