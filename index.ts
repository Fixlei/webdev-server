import express from "express";
const app = express();
app.get("/hello", (req, res) => {
  res.send("Lif is good! Hello World! Ming-");
});
app.get("/", (req, res)=>{
  res.send("Welcome to Full Stack Development!")
})
app.listen(4000);
