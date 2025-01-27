import axios from "axios";
const apiUrl = "http://localhost:5000/api";

export const fetchRmFms = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getFmList`);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchCommunities = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/getRecords?tableName=st_community&fieldNames=id,name`
    );
    return response.data.result;
  } catch (error) {
    return error;
  }
};
export const fetchid = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/getRecords?tableName=dy_rm_fm_com_map&fieldNames=id`
    );
    return response.data.result;
  } catch (error) {
    return error;
  }
};

export const fetchRMs = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getFmList`);
    return response.data.result;
  } catch (error) {
    return error;
  }
};

export const fetchFMs = async () => {
  try {
    const response = await axios.get(`${apiUrl}/getFmList`);
    return response.data.result;
  } catch (error) {
    return error;
  }
};



