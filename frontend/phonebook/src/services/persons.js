import axios from "axios";
const baseUrl = "/api/persons";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.get(baseUrl, config);
};
const createPerson = (newbject) => {
  const config = {
    headers: { Authorization: token },
  };

  return axios.post(baseUrl, newbject, config);
};
const updateNumber = (updatedObject) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config);
};
const deletePerson = (id) => {
  const config = {
    headers: { Authorization: token },
  };
  return axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, createPerson, deletePerson, updateNumber, setToken };
