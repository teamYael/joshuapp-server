const verifyEmail = async (email) => {
  const aegStudentEmail = "@ikasle.aeg.eus";
  const aegTeacherEmail = "@aeg.eus";

  if (email === process.env.ROL_JOSHUA_GROUP) {
    return true;
  }

  if (email.includes(aegStudentEmail) || email.includes(aegTeacherEmail)) {
    console.log(`${email} is a valid email`);
    return true;
  }
  return false;
};
exports.verifyEmail = verifyEmail;
