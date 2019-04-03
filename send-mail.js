const nodemailer = require("nodemailer");
const mjml2html = require('mjml');

// async..await is not allowed in global scope, must use a wrapper
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
    html: getHtml(project)
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)
  
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  return info
}

const getHtml = (project) => mjml2html(`
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>
          Te han invitado a unirte al ${project.name} de Essboard
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`).html

module.exports = {
  sendMail
}
