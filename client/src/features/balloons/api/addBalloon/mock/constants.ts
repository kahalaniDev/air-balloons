export const BALLOON_DEFAULT_POSITIONS = {
  longitude: 37.43739229501583,
  latitude: 34.73389066351245,
  altitude: 10,
};

export const MOCK_404 = false;
export const MOCK_404_RESPONSE = [
  404,
  {
    message: "Missing fields",
    statusCode: 404,
  },
];

export const MOCK_401 = false;
export const MOCK_401_RESPONSE = [
  401,
  {
    message: "Unauthorized user",
    statusCode: 401,
  },
];

export const MOCK_GLOBAL = false;
export const MOCK_GLOBAL_RESPONSE = [
  500,
  {
    message: "Unable to add Balloon, please try again",
    statusCode: 500,
  },
];

export const MOCK_409_RESPONSE = [
  409,
  {
    message: "Name already exists, choose different name",
    statusCode: 409,
  },
];
