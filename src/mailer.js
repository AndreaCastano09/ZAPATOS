const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "yulay.castano39012@ucaldas.edu.co",
      pass: "ggbi syow joxu zecv",
    },
  });

  transporter.verify().then( () => {
    console.log ('Listo para enviar correo electrónico');
  });

  module.exports = transporter;
