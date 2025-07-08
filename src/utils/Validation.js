import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

export const registerSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Too short").required("Required"),
});
export const productSchema = yup.object().shape({
  name: yup.string().required("Required"),
  price: yup.number().positive("Must be positive").required("Required"),
  description: yup.string().required("Required"),
  image: yup.string().url("Invalid URL").required("Required"),
  category: yup.string().required("Required"),
});
export const categorySchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().optional(),
});
export const cartItemSchema = yup.object().shape({
  productId: yup.string().required("Required"),
  quantity: yup
    .number()
    .positive("Must be positive")
    .integer("Must be an integer")
    .required("Required"),
  color: yup.string().optional(),
  size: yup.string().optional(),
});
export const orderSchema = yup.object().shape({
  items: yup.array().of(
    yup.object().shape({
      productId: yup.string().required("Required"),
      quantity: yup
        .number()
        .positive("Must be positive")
        .integer("Must be an integer")
        .required("Required"),
      color: yup.string().optional(),
      size: yup.string().optional(),
    })
  ),
  total: yup.number().positive("Must be positive").required("Required"),
  shippingAddress: yup.string().required("Required"),
});
export const reviewSchema = yup.object().shape({
  productId: yup.string().required("Required"),
  rating: yup
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Required"),
  comment: yup.string().optional(),
});
export const profileSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Too short").optional(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .optional(),
});
export const addressSchema = yup.object().shape({
  street: yup.string().required("Required"),
  city: yup.string().required("Required"),
  state: yup.string().required("Required"),
  zipCode: yup.string().required("Required"),
  country: yup.string().required("Required"),
});
export const paymentSchema = yup.object().shape({
  cardNumber: yup.string().required("Required"),
  cardHolderName: yup.string().required("Required"),
  expirationDate: yup.string().required("Required"),
  cvv: yup.string().required("Required"),
});
export const couponSchema = yup.object().shape({
  code: yup.string().required("Required"),
  discount: yup
    .number()
    .positive("Must be positive")
    .max(100, "Cannot exceed 100%")
    .required("Required"),
});
export const contactSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  message: yup.string().min(10, "Too short").required("Required"),
});
export const newsletterSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});
export const feedbackSchema = yup.object().shape({
  rating: yup
    .number()
    .min(1, "Minimum rating is 1")
    .max(5, "Maximum rating is 5")
    .required("Required"),
  comment: yup.string().optional(),
});
export const searchSchema = yup.object().shape({
  query: yup.string().required("Search query is required"),
  category: yup.string().optional(),
  priceRange: yup.array().of(yup.number().positive()).optional(),
  sortBy: yup.string().oneOf(["relevance", "price", "rating"]).optional(),
});
export const wishlistSchema = yup.object().shape({
  userId: yup.string().required("Required"),
  productId: yup.string().required("Required"),
});
export const notificationSchema = yup.object().shape({
  userId: yup.string().required("Required"),
  message: yup.string().required("Required"),
  type: yup.string().oneOf(["info", "warning", "error"]).required("Required"),
  read: yup.boolean().optional(),
});
export const adminSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().min(6, "Too short").required("Required"),
  role: yup.string().oneOf(["admin", "editor", "viewer"]).required("Required"),
});
export const settingsSchema = yup.object().shape({
  theme: yup.string().oneOf(["light", "dark"]).required("Required"),
});
export const analyticsSchema = yup.object().shape({
  startDate: yup.date().required("Required"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date")
    .required("Required"),
  metrics: yup
    .array()
    .of(yup.string().oneOf(["visitors", "sales", "conversionRate"]))
    .required("Required"),
});
export const importSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Unsupported file format", (value) => {
      return value && value.type === "application/json";
    }),
});
export const exportSchema = yup.object().shape({
  format: yup.string().oneOf(["json", "csv"]).required("Required"),
  includeHeaders: yup.boolean().optional(),
  dateRange: yup.array().of(yup.date()).optional(),
});
export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  newPassword: yup.string().min(6, "Too short").required("Required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});
export const twoFactorAuthSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  code: yup.string().length(6, "Code must be 6 digits").required("Required"),
});
export const subscriptionSchema = yup.object().shape({
  plan: yup.string().oneOf(["free", "basic", "premium"]).required("Required"),
  paymentMethod: yup.string().required("Required"),
  billingCycle: yup.string().oneOf(["monthly", "yearly"]).required("Required"),
});
export const apiKeySchema = yup.object().shape({
  name: yup.string().required("Required"),
  permissions: yup.array().of(yup.string()).required("Required"),
  expiresAt: yup.date().optional(),
});
export const importExportSchema = yup.object().shape({
  action: yup.string().oneOf(["import", "export"]).required("Required"),
  fileType: yup.string().oneOf(["json", "csv"]).required("Required"),
  includeHeaders: yup.boolean().optional(),
  dateRange: yup.array().of(yup.date()).optional(),
});
export const localizationSchema = yup.object().shape({});
export const languageSchema = yup.object().shape({
  code: yup.string().required("Required"),
  name: yup.string().required("Required"),
  rtl: yup.boolean().optional(),
});
export const timezoneSchema = yup.object().shape({
  name: yup.string().required("Required"),
  offset: yup.number().required("Required"),
  isDaylightSaving: yup.boolean().optional(),
});
export const roleSchema = yup.object().shape({
  name: yup.string().required("Required"),
  permissions: yup.array().of(yup.string()).required("Required"),
  description: yup.string().optional(),
});
export const permissionSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().optional(),
  actions: yup.array().of(yup.string()).required("Required"),
});
export const auditLogSchema = yup.object().shape({
  userId: yup.string().required("Required"),
  action: yup.string().required("Required"),
  timestamp: yup.date().required("Required"),
  details: yup.string().optional(),
});
export const webhookSchema = yup.object().shape({
  url: yup.string().url("Invalid URL").required("Required"),
  events: yup.array().of(yup.string()).required("Required"),
  secret: yup.string().optional(),
  active: yup.boolean().optional(),
});
export const customFieldSchema = yup.object().shape({
  name: yup.string().required("Required"),
  type: yup
    .string()
    .oneOf(["text", "number", "date", "select"])
    .required("Required"),
  required: yup.boolean().optional(),
  options: yup
    .array()
    .of(yup.string())
    .when("type", {
      is: "select",
      then: yup
        .array()
        .of(yup.string())
        .required("Options are required for select fields"),
      otherwise: yup.array().of(yup.string()).optional(),
    }),
});
export const customValidationSchema = yup.object().shape({
  fieldName: yup.string().required("Field name is required"),
  validationType: yup
    .string()
    .oneOf(["regex", "minLength", "maxLength", "customFunction"])
    .required("Validation type is required"),
  regexPattern: yup.string().when("validationType", {
    is: "regex",
    then: yup
      .string()
      .required("Regex pattern is required for regex validation"),
    otherwise: yup.string().optional(),
  }),
  minLength: yup.number().when("validationType", {
    is: "minLength",
    then: yup
      .number()
      .required("Minimum length is required for minLength validation"),
    otherwise: yup.number().optional(),
  }),
  maxLength: yup.number().when("validationType", {
    is: "maxLength",
    then: yup
      .number()
      .required("Maximum length is required for maxLength validation"),
    otherwise: yup.number().optional(),
  }),
  customFunction: yup.string().when("validationType", {
    is: "customFunction",
    then: yup
      .string()
      .required(
        "Custom function code is required for customFunction validation"
      ),
    otherwise: yup.string().optional(),
  }),
});
export const fileUploadSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("File is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value &&
        ["image/jpeg", "image/png", "application/pdf"].includes(value.type)
      );
    }),
  description: yup.string().optional(),
  tags: yup.array().of(yup.string()).optional(),
});
export const imageUploadSchema = yup.object().shape({
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (value) => {
      return value && ["image/jpeg", "image/png"].includes(value.type);
    }),
  altText: yup.string().optional(),
  caption: yup.string().optional(),
});
export const videoUploadSchema = yup.object().shape({
  video: yup
    .mixed()
    .required("Video is required")
    .test("fileType", "Unsupported file format", (value) => {
      return value && ["video/mp4", "video/webm"].includes(value.type);
    }),
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
});
export const audioUploadSchema = yup.object().shape({
  audio: yup
    .mixed()
    .required("Audio file is required")
    .test("fileType", "Unsupported file format", (value) => {
      return value && ["audio/mpeg", "audio/wav"].includes(value.type);
    }),
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
});
export const documentUploadSchema = yup.object().shape({
  document: yup
    .mixed()
    .required("Document is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["application/pdf", "application/msword"].includes(value.type)
      );
    }),
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
});
export const formSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  fields: yup.array().of(
    yup.object().shape({
      label: yup.string().required("Field label is required"),
      type: yup
        .string()
        .oneOf(["text", "email", "number", "select"])
        .required(),
      required: yup.boolean().optional(),
      options: yup
        .array()
        .of(yup.string())
        .when("type", {
          is: "select",
          then: yup.array().of(yup.string()).required("Options are required"),
          otherwise: yup.array().of(yup.string()).optional(),
        }),
    })
  ),
});
export const surveySchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  questions: yup.array().of(
    yup.object().shape({
      question: yup.string().required("Question is required"),
      type: yup
        .string()
        .oneOf(["text", "multipleChoice", "rating"])
        .required("Question type is required"),
      options: yup
        .array()
        .of(yup.string())
        .when("type", {
          is: "multipleChoice",
          then: yup.array().of(yup.string()).required("Options are required"),
          otherwise: yup.array().of(yup.string()).optional(),
        }),
    })
  ),
});
export const eventSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  date: yup.date().required("Date is required"),
  time: yup.string().required("Time is required"),
  location: yup.string().optional(),
  description: yup.string().optional(),
  attendees: yup.array().of(yup.string()).optional(),
});
export const taskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  dueDate: yup.date().optional(),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
  status: yup
    .string()
    .oneOf(["pending", "in-progress", "completed"])
    .optional(),
  assignee: yup.string().optional(),
});
export const projectSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  description: yup.string().optional(),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().optional(),
  teamMembers: yup.array().of(yup.string()).optional(),
  status: yup
    .string()
    .oneOf(["not-started", "in-progress", "completed"])
    .optional(),
});
export const milestoneSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  dueDate: yup.date().required("Due date is required"),
  projectId: yup.string().required("Project ID is required"),
  status: yup
    .string()
    .oneOf(["not-started", "in-progress", "completed"])
    .optional(),
});
export const issueSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
  status: yup.string().oneOf(["open", "in-progress", "closed"]).optional(),
  assignee: yup.string().optional(),
  projectId: yup.string().required("Project ID is required"),
});
export const bugReportSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  stepsToReproduce: yup.string().optional(),
  expectedResult: yup.string().optional(),
  actualResult: yup.string().optional(),
  severity: yup.string().oneOf(["low", "medium", "high"]).optional(),
  status: yup.string().oneOf(["open", "in-progress", "closed"]).optional(),
});
export const featureRequestSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  benefits: yup.string().optional(),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
  status: yup.string().oneOf(["open", "in-progress", "closed"]).optional(),
});
export const knowledgeBaseArticleSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  category: yup.string().optional(),
  tags: yup.array().of(yup.string()).optional(),
});
export const faqSchema = yup.object().shape({});
export const supportTicketSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
  status: yup.string().oneOf(["open", "in-progress", "closed"]).optional(),
  assignee: yup.string().optional(),
});
export const chatMessageSchema = yup.object().shape({
  senderId: yup.string().required("Sender ID is required"),
  recipientId: yup.string().required("Recipient ID is required"),
  content: yup.string().required("Message content is required"),
  timestamp: yup.date().optional(),
});
export const notificationSettingsSchema = yup.object().shape({
  emailNotifications: yup.boolean().optional(),
  pushNotifications: yup.boolean().optional(),
  smsNotifications: yup.boolean().optional(),
  notificationFrequency: yup
    .string()
    .oneOf(["immediate", "daily", "weekly"])
    .optional(),
});
export const userPreferencesSchema = yup.object().shape({});
export const privacySettingsSchema = yup.object().shape({
  profileVisibility: yup.string().oneOf(["public", "private"]).optional(),
  dataSharing: yup.boolean().optional(),
  adPersonalization: yup.boolean().optional(),
  cookieConsent: yup.boolean().optional(),
});

export const securitySettingsSchema = yup.object().shape({
  twoFactorAuthentication: yup.boolean().optional(),
  loginAlerts: yup.boolean().optional(),
  sessionTimeout: yup.number().min(1).optional(),
  passwordStrength: yup.string().oneOf(["weak", "medium", "strong"]).optional(),
});
