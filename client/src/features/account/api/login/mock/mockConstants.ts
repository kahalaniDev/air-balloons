export const MOCK_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY";

export const MOCK_403_RESPONSE = [
  401,
  { message: "Incorrect username or password", statusCode: 401 },
];

export const MOCK_GLOBAL = false;
export const MOCK_GLOBAL_RESPONSE = [
  500,
  {
    message: "Unable to login, please try again",
    statusCode: 500,
  },
];
