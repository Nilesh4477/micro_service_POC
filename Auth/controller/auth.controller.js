import bcrypt, { hash } from "bcrypt";
import User from "../model/user.model.js"
import jwt from "jsonwebtoken";
const salt = 10;


export const register = async (req, res) => {
    try {
        const payload = req.body;
        const isUserExist = await User.findOne({ email: payload.email });

        if (isUserExist) return res.status(400).json({ message: "User already present" });

        payload.password = await bcrypt.hash(payload.password, salt)
        const user = await User(payload).save();
        console.log(user)

        res.status(201).json({ message: 'User registered successfully!', user });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }

}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Enter valid creadentials" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "Enter valid creadentials" })
        }
        const payload = {
            email,
            user_id : user.id,
            user_name : user.name
        }
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY)
        res.status(200).json({ message: "login successfully", access_token : `Bearer ${token}` })

    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });
    }
}

export const user = async(req,res)=>{
    const user = req.user;
    return res.status(200).json({user : user})
}