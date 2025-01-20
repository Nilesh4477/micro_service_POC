import axios from "axios";
import Post from "../model/post.model.js";

export const getAllPosts = async (req, res) => {

    try {
        const posts = await Post.find({});

        let userIds = [];
        posts.forEach((item) => {
            userIds.push(item.user_id)
        })

        // let postWithAllUser = await Promise.all(
        //     posts.map(async (post) => {
        //         const res = await axios.get(
        //             `${process.env.AUTH_MICRO_URL}/api/auth/getuser/${post.user_id}`
        //         )
        //         console.log(res)

        //         return {
        //             ...post.toObject(),
        //             ...res.data
        //         }
        //     })
        // )
        // console.log(postWithAllUser)

        //Method 2
        // let userIds = [];
        // posts.forEach((item)=>userIds.push(item.user_id))
        // console.log(userIds,"userIds")


        // const responseData = await axios.post(`${process.env.AUTH_MICRO_URL}/api/auth/getusers`,{userIds});
        // const users = responseData.data.users;
        // console.log(users,"responseData")

        // const postWithAllUser = await Promise.all(
        //     posts.map((post)=>{
        //         console.log(post,"post")
        //       const user = users.find((item)=> item._id == post.user_id)
        //       console.log(user,"sahgdy")
        //         return {
        //             ...post.toObject(),
        //             ...user
        //         }
        //     })
        // )

        // method 3

        const responseData = await axios.post(`${process.env.AUTH_MICRO_URL}/auth/getusers`, { userIds });
        console.log(responseData, "responseData")
        let users = {}
        responseData.data.users.forEach(item => {
            users[item._id] = item;
        });
        console.log(users, "users")

        const postWithAllUser = await Promise.all(
            posts.map((post) => {
                const user = users[post.user_id]

                return {
                    ...post.toObject(),
                    user
                }
            })
        )




        return res.status(200).json(postWithAllUser)

    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });

    }





}

export const storePost = async (req, res) => {

    try {
        const userData = req.user;
        const { title, content } = req.body;

        const post = await Post.create({
            user_id: userData.user_id,
            title,
            content
        })

        return res.status(201).json({
            message: "Post craeted successfully",
            post: post
        })
    } catch (error) {
        return res.status(500).json({ message: 'Error registering user', error });

    }



}