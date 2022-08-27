import { useState } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const client = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  });

  const sendRequest = async (url, data) => {
    setIsLoading(true);
    if (data) {
      try {
        const response = await client.post(url, data);
        if (!response.statusText === "OK") {
          throw new Error(response.message);
        }
        setIsLoading(false);
        return response.data;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    } else {
      try {
        const response = await client.get(url);
        if (!response.statusText === "OK") {
          throw new Error(response.message);
        }
        setIsLoading(false);
        return response.data;
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
        throw error;
      }
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    sendRequest,
    clearError,
  };
};
