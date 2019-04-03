const nodemailer = require("nodemailer");
const mjml2html = require('mjml');

async function sendMail(from, to, project) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'essboard.team@gmail.com',
      pass: 'Diana20.'
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
  return await transporter.sendMail(mailOptions)
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
