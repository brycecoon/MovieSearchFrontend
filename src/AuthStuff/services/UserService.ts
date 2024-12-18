import axios from "axios";

const baseUrl = "http://localhost:5152";
export const callAuthEndpoint = async (idToken: string) => {
  const response = await axios.get(baseUrl + "/api/user/testAuthorize", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data
};
