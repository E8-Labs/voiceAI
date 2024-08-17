const BasePath = 'https://www.blindcircle.com:444/voice/'//'https://www.blindcircle.com:444/voice/' //;'http://localhost:8005/'

const Apis = {
    SignUp: `${BasePath}api/user/login`,
    sendVerificationCode: `${BasePath}api/user/sendVerificationCode`,
    verifyCode: `${BasePath}api/user/verifyCode`,
    checkPhone: `${BasePath}api/user/checkPhoneNumber`,
    addCard: `${BasePath}api/user/add_card`,
    MakeCall: `${BasePath}api/calls/make_a_call`,
}

export default Apis;
