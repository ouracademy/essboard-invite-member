const nodemailer = require("nodemailer");
const mjml2html = require('mjml');

// var mailgunTransport = require('nodemailer-mailgun-transport');
 
// // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
// var auth = {
//   auth: {
//     api_key: 'key-1234123412341234',
//     domain: 'one of your domain names listed at your https://mailgun.com/app/domains'
//   }
// }
 
// const nodemailerMailgun = nodemailer.createTransport(mailgunTransport(auth));
 
async function sendMail(from, to, project){

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Essboard" <essboard.team@gmail.com>', // sender address
    to: to.email, // list of receivers
    subject: `${from.name} te ha invitado al proyecto ${project.name} de Essboard`,
    html: getHtml(from, project)
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return info
}

const getHtml = (from, project) => mjml2html(`
<mjml>
  <mj-body background-color="#ccd3e0" font-size="13px">
    <mj-section background-color="#fff" padding-bottom="20px" padding-top="20px">
      <mj-column width="100%">
        <mj-image src="https://essboard.netlify.com/assets/images/logo/logo-horizontal.png" alt="" align="center" border="none" width="200px" padding-left="0px" padding-right="0px" padding-bottom="10px" padding-top="10px"></mj-image>
      </mj-column>
    </mj-section>
    <mj-section background-color="#5fbed0" padding-bottom="5px" padding-top="0">
      <mj-column width="100%">
        <mj-text align="center" color="#FFF" font-size="14px" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="28px" padding-top="28px"><span style="font-size:20px; font-weight:bold">
        ¡Hola!, ${from.name} le ha invitado unirse al proyecto ${project.name} </span></mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff" padding-bottom="5px">
      <mj-column>
        <mj-text align="center" color="#9e9d99" font-size="16px" font-family="Ubuntu, Helvetica, Arial, sans-serif"  padding="25px">
          <strong>Estoy trabajando en este proyecto en Essboard y quería compartirlo con usted.</strong>
         </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff" padding-bottom="20px" padding-top="5px">
      <mj-column width="50%">
        <mj-button background-color="#6fcf85" color="#FFF" font-size="18px" align="center" 
        font-weight="bold" border="none" padding="15px 30px" border-radius="5px" 
        href="https://essboard.netlify.com/me/projects/${project.id}" font-family="Helvetica" padding-left="25px" padding-right="25px" padding-bottom="10px">Ir al proyecto</mj-button>
      </mj-column>
    </mj-section>
    <mj-section background-color="#fff" >
       <mj-column width="50%">
        <mj-text align="center" color="#9e9d99" font-size="13px" font-family="Helvetica">Essboard Team</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`).html

module.exports = {
  sendMail
}
