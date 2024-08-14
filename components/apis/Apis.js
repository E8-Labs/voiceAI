const BasePath = 'http://localhost:8005/'//'https://www.blindcircle.com:444/neo/' //;'http://localhost:8005/'

const Apis = {
    SignUp: `${BasePath}api/user/login`,
    sendVerificationCode: `${BasePath}api/user/sendVerificationCode`,
    verifyCode: `${BasePath}api/user/verifyCode`,
    checkPhone: `${BasePath}api/user/checkPhoneNumber`
}

export default Apis;
