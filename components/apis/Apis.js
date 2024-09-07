const BasePath = 'https://www.blindcircle.com:444/voice/' //'https://www.blindcircle.com:444/voice/' //;'http://localhost:8005/'

const Apis = {
    //user flow apis
    SignUp: `${BasePath}api/user/login`,
    sendVerificationCode: `${BasePath}api/user/sendVerificationCode`,
    verifyCode: `${BasePath}api/user/verifyCode`,
    checkPhone: `${BasePath}api/user/checkPhoneNumber`,
    addCard: `${BasePath}api/user/add_card`,
    MakeCall: `${BasePath}api/calls/make_a_call`,
    Caller_to_Creator: `${BasePath}api/user/updateUserRole`,
    BuildAI: `${BasePath}api/ai/buildAi`,
    BuildScript: `${BasePath}api/ai/buildAiScript`,


    GetRecentCalls: `${BasePath}api/calls/get_recent_calls`,
    GetAssistantData: `${BasePath}api/user/getProfileFromUsername`,


    //apis for voice creator onboarding
    checkUserName: `${BasePath}api/user/checkUsernameExists`,
    checkUserEmail: `${BasePath}api/user/checkEmailExists`,
    RegisterLogin: `${BasePath}api/user/login`,
    KnowledgeBaseApi: `${BasePath}api/ai/addKnowledgebase`,
    CreateSubscription: `${BasePath}api/user/subscribe`,
    CallsApi: `${BasePath}api/user/creator_calls`,
    DashBoardApi: `${BasePath}api/user/creator_dashboard`,


    //user profile apis
    MyAiapi: `${BasePath}api/user/my_ai`,
    CallerCallLogs: `${BasePath}api/user/call_logs`,
    CallerInvoices: `${BasePath}api/user/invoices`,
    GetCardList: `${BasePath}api/user/list_cards`,
    CallerDashboard: `${BasePath}api/user/caller_dashboard`,
    BuyProduct: `${BasePath}api/user/buy_product`,
    makeDefaultCard: `${BasePath}api/user/make_default`,
    updateProfile: `${BasePath}api/user/updateProfile`,
    DeleteCard: `${BasePath}api/user/delete_card`,
    verifyEmail: `${BasePath}api/user/verifyEmail`
}

export default Apis;
