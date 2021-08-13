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
  host: "",

  port: 465,
  auth: {
      user: "",
      
      pass: "",
  },
  secure:true
});



router.post("/doctorregister", (req, res) => {
  console.log("register was here")
  const name = req.body.name;
  const email = req.body.email;
  const hpcsa = req.body.hpcsa;

  const mail = {
    from: "",
    to: "", 
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
