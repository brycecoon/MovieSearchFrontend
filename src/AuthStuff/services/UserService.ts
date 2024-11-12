import axios from "axios";

const baseUrl = "http://localhost:5152";
export const callAuthEndpoint = async (idToken: string) => {
//   console.log(idToken);
  const response = await axios.get(baseUrl + "/api/user/testAuthorize", {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  console.log("Response was: ")
  console.log(response);
  return response.data
};
