const BasePath = 'https://www.blindcircle.com/voice/' // Link for live or git //'https://www.blindcircle.com:444/voice/'

const Apis = {
    //user flow apis
    SignUp: `${BasePath}api/user/login`,
    sendVerificationCode: `${BasePath}api/user/sendVerificationCode`,
    verifyCode: `${BasePath}api/user/registerOrLogin`,
    checkPhone: `${BasePath}api/user/checkPhoneNumber`,
    addCard: `${BasePath}api/user/add_card`,
    MakeCall: `${BasePath}api/calls/make_a_call`,
    Caller_to_Creator: `${BasePath}api/user/updateUserRole`,
    BuildAI: `${BasePath}api/ai/buildAi`,
    BuildScript: `${BasePath}api/ai/buildAiScript`,


    GetRecentCalls: `${BasePath}api/calls/get_recent_calls`,
    GetAssistantData: `${BasePath}api/user/getProfileFromUsername`,
    Login_Google: `${BasePath}api/user/login_google`,


    //apis for voice creator onboarding
    checkUserName: `${BasePath}api/user/checkUsernameExists`,
    checkUserEmail: `${BasePath}api/user/checkEmailExists`,
    RegisterLogin: `${BasePath}api/user/login`,
    KnowledgeBaseApi: `${BasePath}api/ai/addKnowledgebase`,
    CreateSubscription: `${BasePath}api/user/subscribe`,
    CallsApi: `${BasePath}api/user/creator_calls`,
    DashBoardApi: `${BasePath}api/user/creator_dashboard`,

    DelKnowledgeBase: `${BasePath}api/ai/deleteKb`,
    EmailVerificationCode: `${BasePath}api/user/sendVerificationEmail`,
    //user profile apis
    MyAiapi: `${BasePath}api/ai/my_ai`,
    CallerCallLogs: `${BasePath}api/user/call_logs`,
    CallerInvoices: `${BasePath}api/user/invoices`,
    GetCardList: `${BasePath}api/user/list_cards`,
    CallerDashboard: `${BasePath}api/user/caller_dashboard`,
    BuyProduct: `${BasePath}api/user/buy_product`,
    makeDefaultCard: `${BasePath}api/user/make_default`,
    updateProfile: `${BasePath}api/user/updateProfile`,
    DeleteCard: `${BasePath}api/user/delete_card`,
    verifyEmail: `${BasePath}api/user/verifyEmail`,
    MyProfile: `${BasePath}api/user/myProfile`,
    GetCreators: `${BasePath}api/user/getCreatorsx`,
    UpdateCreatorAdminSide: `${BasePath}api/user/updateCreatorAI`,
    UpdateBuilAI: `${BasePath}api/ai/updateAi`,



    //new apis for creator dashboard flow
    AddTrait: `${BasePath}api/ai/addTrait`,
    DeleteTrait: `${BasePath}api/ai/deleteTrait`,
    UpdateTrait: `${BasePath}api/ai/updateTrait`,
    AddValues: `${BasePath}api/ai/addUserValue`,
    DeleteValues: `${BasePath}api/ai/deleteUserValue`,
    UpdateValues: `${BasePath}api/ai/updateUserValue`,
    AddBeliefs: `${BasePath}api/ai/addUserBelief`,
    DeleteBeliefs: `${BasePath}api/ai/deleteUserBelief`,
    UpdateBeliefs: `${BasePath}api/ai/updateUserBelief`,
    AddFrameWork: `${BasePath}api/ai/addFramework`,
    UpdateFramWork: `${BasePath}api/ai/updateFramework`,
    DeleteFrameWork: `${BasePath}api/ai/deleteFramework`,
    AddIntractions: `${BasePath}api/ai/addIntractionExample`,
    DeleteIntractions: `${BasePath}api/ai/deleteIntractionExample`,
    UpdateIntractions: `${BasePath}api/ai/updateIntractionExample`,
    AddPhilosophy: `${BasePath}api/ai/addUserPhilosophy`,
    DeletePhilosophy: `${BasePath}api/ai/deleteUserPhilosophy`,
    UpdatePhilosophy: `${BasePath}api/ai/updateUserPhilosophy`,
    AddDonot: `${BasePath}api/ai/addDonotDiscuss`,
    UpdateDonot: `${BasePath}api/ai/updateDonotDiscuss`,
    DeleteDonot: `${BasePath}api/ai/deleteDonotDiscuss`,
    AddPhrase: `${BasePath}api/ai/addPhraseAndQuote`,
    DeletePhrase: `${BasePath}api/ai/deletePhraseAndQuote`,
    UpdatePhrase: `${BasePath}api/ai/updatePhraseAndQuote`,
    AddCommunicationInst: `${BasePath}api/ai/addCommunicationInstruction`,
    DeleteCommunicationInst: `${BasePath}api/ai/deleteCommunicationInstruction`,
    UpdateCommunicationInst: `${BasePath}api/ai/updateCommunicationInstruction`,
    AddCallStrategy: `${BasePath}api/ai/addCallStrategy`,
    DelCallStrategy: `${BasePath}api/ai/deleteCallStrategy`,
    UpdateCallStrategy: `${BasePath}/api/ai/updateCallStrategy`,
    AddObjection: `${BasePath}api/ai/addObjectionHandling`,
    DelObjection: `${BasePath}api/ai/deleteObjectionHandling`,
    UpdateObjection: `${BasePath}api/ai/updateObjectionhandling`,
    AddDemeanor: `${BasePath}api/ai/addDemeanor`,
    DelDemeanor: `${BasePath}api/ai/deleteDemeanor`,
    UpdateDemeanor: `${BasePath}api/ai/updateDemeanor`,
    AddInterPersonalSkills: `${BasePath}api/ai/addInterpersonalSkills`,
    UpdateInterPersonalSkills: `${BasePath}api/ai/updateInterpersonalSkills`,
    DelInterPersonalSkills: `${BasePath}api/ai/deleteInterpersonalSkills`,
    ProcessObjectiveProfession: `${BasePath}/api/ai/processObjectiveAndProfession`


}

export default Apis;
