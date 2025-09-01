export const EnvelopeStatus = Object.freeze({
  DRAFT: 1,
  SENT: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  REJECTED: 5,
});

export const FieldType = Object.freeze({
  SIGNATURE: 1,
  INITIALS: 2,
  FIRST_NAME: 3,
  LAST_NAME: 4,
  EMAIL: 5,
  COMPANY: 6,
  TITLE: 7,
  NAME: 8,
});

export const SignatureInput = Object.freeze({
  TYPE: 1,
  DRAWN: 2,
  UPLOADED: 3,
});

export const ParticipantStatus = Object.freeze({
  PENDING: 1,
  SIGNED: 2,
  REJECTED: 3,
  SKIPPED: 4,
});

export const UserRole = Object.freeze({
  SIGNER: 1,
  REVIEWER: 2,
  APPROVER: 3,
});

export const SignatureType = Object.freeze({
  IMAGE: "image-signature",
  INITIALS: "initials",
  FIRST_NAME: "first-name",
  LAST_NAME: "last-name",
  EMAIL: "email",
  COMPANY: "company",
  TITLE: "title",
  NAME: "name",
});

export const SignatureLabel = Object.freeze({
  SIGNATURE: "Signature",
  INITIALS: "Initials",
  FIRST_NAME: "First Name",
  LAST_NAME: "Last Name",
  EMAIL: "Email",
  COMPANY: "Company",
  TITLE: "Title",
  NAME: "Name",
});
