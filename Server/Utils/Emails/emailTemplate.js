function otpMailTemplate(otp) {
  return `
    <div style="font-family: Arial; padding: 20px;">
      <h2>Your OTP Code</h2>
      <p>Use the OTP below to continue:</p>
      <div style="font-size: 26px; font-weight: bold; background: #f2f2f2; 
                  padding: 12px 18px; display: inline-block; border-radius: 6px;">
        ${otp}
      </div>
      <p style="margin-top: 20px; color: #555;">
        This OTP is valid for 10 minutes.
      </p>
    </div>
  `;
}

module.exports = otpMailTemplate;
