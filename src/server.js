const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(3000, () => console.log("Server Running"));



const transport = nodemailer.createTransport({
  host: "darkstorm.aserv.co.za",

  port: 465,
  auth: {
      user: "noreply@copp.co.za",
      
      pass: "Mn(1aJ*HHB{3",
  },
  secure:true
});



router.post("/register", (req, res) => {
  console.log("register was here")
  const name = req.body.name;
  const email = req.body.email;
  const hpcsa = req.body.hpcsa;

  const mail = {
    from: "noreply@copp.co.za",
    to: "nzayamuia02@gmail.com ", 
    subject: "register Form Submission",
    html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>hpcsa: ${hpcsa}</p>`,
  };

  transport.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});
