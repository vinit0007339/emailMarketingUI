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
    UPDATE_CAMPAIGN: "campaign",
    DELETE_CAMPAIGN: "campaign",

    //List Api
    GET_ALL_LIST: "lists/all",  //lists
    GET_LIST_BY_ID:"lists",
    CREATE_LIST: "lists",
    UPDATE_LIST: "lists",
    DELETE_LIST: "lists",
    LIST_IN_CONTACT: (id) => `lists/${id}/contacts`,
    LIST_IN_FAVORITE: (id) => `lists/${id}/favorite`,
    DELETE_IN_CONTACT_FROM_LIST: (contactId,listId) => `contacts/${contactId}/lists/${listId}`,

    // create MEMBER
    CREATE_MEMBER: "contacts",

    // Campaign Targets API
    GET_CAMPAIGN_TARGETS: (campaignId) => `campaign_targets/${campaignId}/targets`,
    POST_CAMPAIGN_TARGETS: (campaignId) => `campaign_targets/${campaignId}/targets`,

    // Template API
    GET_ALL_TEMPLATES: "templates",
    CREATE_TEMPLATE: "templates",
    UPDATE_TEMPLATE: "templates",
    DELETE_TEMPLATE: "templates",
    GET_TEMPLATE_BY_ID: (templateId) => `templates/${templateId}`,
  },
  mode: "Development",
};

const defaultExport = {};
export default defaultExport;
