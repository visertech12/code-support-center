
import axios from "@/lib/axios";

interface LoginCredentials {
  email: string;
  password: string;
}

const BASE_URL = "https://mystock-admin.scriptbasket.com/api";

export const apiService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }
};
