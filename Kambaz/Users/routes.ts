import UsersDao from "./dao";

export default function UserRoutes(app, db){
    const dao = UsersDao(db);
    let currentUser = null;
    const signup = (req, res)=>{
        const user= dao.findUserByUsername(req.body.username);
        if(user){
            res.status(400).json({message:"Username already in use"});        
        return;
    }
     currentUser = dao.createUser(req.body);
     res.json(currentUser);   
    };
    const signin = (req, res)=>{
        const {username, password}=req.body;
        currentUser = dao.findUserByCredentials(username, password);
       if(currentUser){
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
       }else {
        res.status(401).json({message:"Unable to login try again later ... "});
       }
    };

    const updateUser = (req, res)=>{
        const userId = req.params.userId;
        const userUpdates = req.body;
        dao.updateUser(userId, userUpdates);
        currentUser = dao.findUserById(userId);
        res.json(currentUser);
    };
    const signout = (req, res)=>{
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = (req, res) =>{
        const currentUser = req.session["currentUser"];
        if(!currentUser){
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };

    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/profile", profile);
    app.post("/api/users/signout", signout);
}