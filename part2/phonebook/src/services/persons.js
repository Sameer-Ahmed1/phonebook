import axios from "axios";
const baseUrl = "http://localhost:3001/persons";
const getAll = () => {
  return axios.get(baseUrl);
};
const createPerson = (newbject) => {
  return axios.post(baseUrl, newbject);
};
const updateNumber = (updatedObject) => {
  return axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject);
};
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, createPerson, deletePerson, updateNumber };
