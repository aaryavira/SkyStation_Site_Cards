import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";


const app = express();

const PORT = 5000;


app.use(cors());

app.use(express.json());


app.get("/", (req,res)=>{

    res.send(
        "PDF Server Running"
    );

});

app.post("/generate-pdf", async (req, res) => {

    console.log("✅ POST /generate-pdf reached");

    console.log("Request Body:");

    console.log(req.body);

    res.json({
        success: true,
        message: "Server received the request"
    });

});




app.listen(

PORT,

()=>{

console.log(

`PDF Server running on http://localhost:${PORT}`

);

}

);