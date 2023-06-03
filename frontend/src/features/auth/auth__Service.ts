import axios from 'axios';
import { toast } from 'react-toastify';

import { I_AuthRequest, I_AuthResponse } from '../../interfaces/UserInterfaces';

const API_URL = '/api/auth';

// Register user
const register = async (
  userData: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const response = await axios.post(`${API_URL}/register`, userData);
  const currentUser = response.data.userInfo;
  const message = response.data.message;

  // if (currentUser) {
  //   localStorage.setItem('userInfo', JSON.stringify(currentUser));
  // }
  toast.success(message);

  return currentUser ? currentUser : null;
};

const login = async (
  userData: I_AuthRequest
): Promise<I_AuthResponse | null> => {
  const response = await axios.post(`${API_URL}/login`, userData);
  const currentUser = response.data.userInfo;
  const message = response.data.message;

  // if (currentUser) {
  //   localStorage.setItem('userInfo', JSON.stringify(currentUser));
  // }
  toast.success(message);

  return currentUser ? currentUser : null;
};

const logout = async () => {
  const response = await axios.get(`${API_URL}/logout`);
  const message = response.data.message;
  toast.success(message);
  // localStorage.removeItem('userInfo');
};
const getUserProfile = async (): Promise<I_AuthResponse | null> => {
  const response = await axios.get(`${API_URL}/profile`);
  const currentUser = response.data.userInfo;
  // const message = response.data.message;
  // toast.success(message);

  return currentUser ? currentUser : null;
};

// Update user Details
const updateUserProfile = async (userData: I_AuthRequest) => {
  const response = await axios.put(`${API_URL}/profile`, userData);
  const message = response.data.message;
  toast.success(message);
};

const current__Service = {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
};

export default current__Service;
