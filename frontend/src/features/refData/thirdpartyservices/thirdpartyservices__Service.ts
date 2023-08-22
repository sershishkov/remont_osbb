import axios from 'axios';
import { toast } from 'react-toastify';

import { I_ThirdPartyService } from '../../../interfaces/AccountingInterfaces';
import { I_ServerResponse } from '../../../interfaces/CommonInterfaces';

const API_URL = '/api/refdata/thirdpartyservices';

const item__add = async (
  dataObject: I_ThirdPartyService
): Promise<I_ThirdPartyService> => {
  const response = await axios.post(`${API_URL}`, dataObject);
  const message = response.data.message;
  toast.success(message);
  return response.data.my_data;
};

const item__update = async (
  dataObject: I_ThirdPartyService
): Promise<I_ThirdPartyService> => {
  const { _id } = dataObject;
  delete dataObject._id;

  const response = await axios.put(`${API_URL}/${_id}`, dataObject);
  const message = response.data.message;
  toast.success(message);

  return response.data.my_data;
};

const item__get_all = async (
  dataObject?: I_ThirdPartyService
): Promise<I_ServerResponse<I_ThirdPartyService>> => {
  const response = await axios.get(
    `${API_URL}/?page=${dataObject?.page}&limit=${dataObject?.limit}&filter=${dataObject?.filter}`
  );
  // const message = response.data.message;
  // toast.success(message);

  return response.data.my_data;
};

const item__get_one = async (
  dataObject: I_ThirdPartyService
): Promise<I_ThirdPartyService> => {
  const response = await axios.get(`${API_URL}/${dataObject._id}`);
  const message = response.data.message;
  toast.success(message);
  return response.data.my_data;
};

const item__delete_one = async (
  dataObject: I_ThirdPartyService
): Promise<I_ThirdPartyService> => {
  const response = await axios.delete(`${API_URL}/${dataObject._id}`);
  const message = response.data.message;
  toast.success(message);
  return response.data.my_data;
};

const current__Service = {
  item__add,
  item__update,
  item__get_one,
  item__delete_one,
  item__get_all,
};

export default current__Service;
