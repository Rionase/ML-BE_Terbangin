exports.emailOTP = (otp) => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your login</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 10px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: center;">
                    <div style="padding-bottom: 20px;"><img
                        src="https://res.cloudinary.com/dheywvvbq/image/upload/v1716467262/lmdrqxkvilbnt4atwene.png" alt="Terbangin"
                        style="width: 161px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(147, 75, 170);">
                    <div style="color: rgb(255, 255, 255); text-align: left;">
                      <h1 style="margin: 1rem 0; color: rgb(255, 255, 255);">Verification code</h1>
                      <p style="padding-bottom: 16px; color: #E3E3E3;">Please use the verification code below.</p>
                      <p style="padding-bottom: 16px"><strong style="font-size: 130%">${otp}</strong></p>
                      <p style="padding-bottom: 16px; color: #E3E3E3;">OTP is valid for <strong style="color: rgb(255, 255, 255);">10 minutes</strong>. If you didn't request this, you can ignore this email.</p>
                      <p style="padding-bottom: 16px; color: rgb(255, 255, 255);">Thanks,<br>Terbangin team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(74, 74, 74); text-align: center;">
                    <p style="padding-bottom: 16px">Made with ♥ from us</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
    `;
};

exports.verifyLink = (link) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your login</title>
  <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important} .link a:hover {background: #dddddd} </style><![endif]-->
</head>

<body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
  <table role="presentation"
    style="width: 100%; border-collapse: collapse; border: 10px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(255, 255, 255);">
    <tbody>
      <tr>
        <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
          <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
            <tbody>
              <tr>
                <td style="padding: 40px 0px 0px;">
                  <div style="text-align: center;">
                    <div style="padding-bottom: 20px;"><img
                        src="https://res.cloudinary.com/dheywvvbq/image/upload/v1716467262/lmdrqxkvilbnt4atwene.png" alt="Terbangin"
                        style="width: 161px;"></div>
                  </div>
                  <div style="padding: 20px; background-color: rgb(147, 75, 170);">
                    <div style="color: rgb(255, 255, 255); text-align: left;">
                      <h1 style="margin: 1rem 0; color: rgb(255, 255, 255);">Trouble signing in?</h1>
                      <p style="padding-bottom: 16px; color: #E3E3E3;">We've received a request to reset the password for this user account.</p>
                      <p class="link" style="padding-bottom: 16px"><a href=${link} target="_blank"
                          style="padding: 12px 24px; border-radius: 4px; color: #934baa; background: #FFFFFF;display: inline-block;margin: 0.5rem 0;text-decoration: none;">Reset
                          your password</a></p>
                      <p style="padding-bottom: 16px; color: #E3E3E3;">Verification link is valid for <strong style="color: rgb(255, 255, 255);">20 minutes</strong>. If you didn't ask to reset your password, you can ignore this email.</p>
                      <p style="padding-bottom: 16px; color: rgb(255, 255, 255);">Thanks,<br>Terbangin team</p>
                    </div>
                  </div>
                  <div style="padding-top: 20px; color: rgb(74, 74, 74); text-align: center;">
                    <p style="padding-bottom: 16px">Made with ♥ from us</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
    `;
};
