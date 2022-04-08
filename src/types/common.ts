type ResponseErrorFields = {
  message: string;
  requiredFields: string[];
};

export type ResponseError = {
  error: string | ResponseErrorFields;
};

export type RequestRecommended = {
  type: string;
  description: string;
  url: string;
};
