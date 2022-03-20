import axios from 'axios';
import { apiUrl } from "../constants";

export const callAPI = async (endpoint, method, params = null, data = null) => {
    try {
    const response =  await axios({
      method,
      url: `${apiUrl}${endpoint}`,
      headers: {
        'Content_type': 'application/json'
      },
      params,
      data,
    });
    return response;

    } catch(e){
      const error = e.response ? e.response.data: e;
      throw error;
    }
};

export const checkEmailExist = async (email, id) => {
  // const employees = getState();
  // const isExist = employees.find(item => item.email.toLowerCase() === email.toLowerCase() && id != item.id);
  // return isExist;
}