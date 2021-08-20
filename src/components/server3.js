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



router.post("/doctor-portal", (req, res) => {
  console.log("register was here")
  const recipient = req.body.recipient;
  const subject = req.body.subject;
  const text = req.body.text;

  const mail = {
    from: "noreply@copp.co.za",
    to: `${recipient}`, 
    subject: `${subject}`,
    html: `<p>Welcome to the AxaiTech platform you are one step closer to joining the team.</p>
            <p>Please click on this link to complete your profile ${text}</p>`,
  };

  transport.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});