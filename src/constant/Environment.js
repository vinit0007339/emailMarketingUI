export const endPoints = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,

  api: {
    LOGIN_ENDPOINT: "auth/token",
    SIGNUP: "auth/register",
    EMAIL_VERIFIED: "auth/verify-email",
    VERIFY_NAME: "users/verify-name-change",
    FORGET_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
    //Email Marketing
    GET_ALL_CAMPAIGNS: "campaign",
    CREATE_CAMPAIGN: "campaign",

    //List Api
    GET_ALL_LIST: "lists/all",  //lists
    CREATE_LIST: "lists",
    UPDATE_LIST: "lists",
    DELETE_LIST: "lists",
    LIST_IN_CONTACT: (id) => `lists/${id}/contacts`,


    // create MEMBER
    CREATE_MEMBER: "contacts",
  },
  mode: "Development",
};

export default {};
