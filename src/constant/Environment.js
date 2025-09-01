export const endPoints = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL ,
  
  api: {
    LOGIN_ENDPOINT: "auth/token",
    SIGNUP: "auth/register",
    EMAIL_VERIFIED: "auth/verify-email",
    VERIFY_NAME: "users/verify-name-change",
    FORGET_PASSWORD: "auth/forgot-password",
    RESET_PASSWORD: "auth/reset-password",
    FILE_UPLOAD: "file/upload",
    DOWNLOAD_FILE: "file/download",
    GET_MY_FILES: "file/my-files",
    ENVELOPES: "envelopes",
    ENVELOPES_TYPES: "envelope-types",
    GET_PDF: "file/download/",
    ADD_SIGNATURE: "documents/{envelope_id}/fields",
    SEND_ENVELOPE_MAIL: "documents/{envelope_id}/sign",
    //user signature
    SIGNATURE_LIST: "users/me/signature-templates",
    SEND_ENVELOPE: "envelopes/{envelope_id}/send",
    ADD_USER_SIGNATURE: "users/{user_id}/signatures",
    DOWNLOAN_SIGNED_PDF: "envelopes/{envelope_id}/download",
    UPDATE_ENVELOPE: "envelopes/{envelope_id}/status",
    //user profile
    UPDATE_USER_INFO: "users",
    GET_USER_COLORS: "envelopes/{envelope_id}/",
    SEND_INVITATION: "envelopes/{envelope_id}/send-invitations",
    GET_PARTICIPANT_COORDINATES: "envelopes/participant-coordinates",
  },
  mode: "Development",
};

export default {};
