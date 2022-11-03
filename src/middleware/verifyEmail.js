
const verifyEmail = async (req, res, next) => {

    const email = req.body.claims.email;
    console.log(email);

    const aegStudentEmail = '@ikasle.aeg.eus';
    const aegTeacherEmail = '@aeg.eus';

    if( email.includes(aegStudentEmail) ||  email.includes(aegTeacherEmail) ) {
      console.log(`${email} is a valid email`);
       return next();
    } 
      return res
      .status(401)
      .send({
        status: "FAILED",
        message: "invalid email"
      });
  };
exports.verifyEmail = verifyEmail;