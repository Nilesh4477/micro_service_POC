import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
    try {
        

    const authHeader = req.headers.authorization;

    if (authHeader === null || authHeader === undefined || authHeader === "")
        return res.status(401).json({ message: "Unauthorized user" })

    const token = authHeader.split(" ")[1];

    await jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized user" });

        req.user = user;
        next()
    })

} catch (error) {
    return res.status(500).json({ message: 'Error registering user', error });

}
}