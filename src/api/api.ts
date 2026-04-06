import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:9999';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const getPageConfig = async () => {
  const response = await instance.get('/cau-hinh-trang/public');
  return response.data.data;
};

export const getProfileFull = async () => {
  const response = await instance.get('/thong-tin-ca-nhan/full');
  return response.data.data;
};

export const getProjects = async () => {
  const response = await instance.get('/quan-li-du-an');
  return response.data.data.collection;
};

export const getTechnologies = async () => {
  const response = await instance.get('/cong-nghe');
  return response.data.data.collection;
};

export const submitContact = async (data: {
  hoTen: string;
  email: string;
  soDienThoai?: string;
  chuDe?: string;
  noiDung: string;
}) => {
  const response = await instance.post('/quan-ly-lien-he/public', data);
  return response.data;
};

export default instance;
