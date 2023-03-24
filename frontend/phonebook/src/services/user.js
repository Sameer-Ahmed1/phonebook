import axios from "axios";
const baseUrl = "/api/users";
const createUser = async (newObj) => {
  const response = await axios.post(baseUrl, newObj);
  return response.data;
};
export default { createUser };
