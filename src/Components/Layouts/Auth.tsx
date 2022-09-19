import axios from "axios";
import { API_BASE_URL } from "../../Constant";

/***************** Login Api  ******************/

export const loginData = (values: any) => {
  return axios
    .post(`${API_BASE_URL}auth/login`, values)
    .then((response) => response)
    .catch((err) => err);
};

/***************** All User Api  ******************/
export const GetAllUsers = (search: string) => {
  try {
    return axios
      .get(`${API_BASE_URL}users/search?q=${search ?? ""}`)
      .then((response) => {
        console.log("All User ======>>", response.data);
        return response;
      });
  } catch (error) {
    console.log(error);
  }
};

/***************** Delete User Api  ******************/
export const DeleteUser = async (id: number) => {
  try {
    return axios.delete(`${API_BASE_URL}users/${id}`).then((response) => {
      console.log("Delete User ======>>", response.data);
      return response;
    });
  } catch (error) {
    console.log(error);
  }
};

/***************** All Product Api  ******************/

export const GetAllProduct = (search: string) => {
  try {
    return axios
      .get(`${API_BASE_URL}products/search?q=${search ?? ""}`)
      .then((response) => {
        console.log("All Products ======>>", response.data);
        return response;
      });
  } catch (error) {
    console.log(error);
  }
};

/***************** Delete User Api  ******************/
export const DeleteProduct = async (id: number) => {
  try {
    return axios.delete(`${API_BASE_URL}users/${id}`).then((response) => {
      console.log("Delete User ======>>", response.data);
      return response;
    });
  } catch (error) {
    console.log(error);
  }
};
