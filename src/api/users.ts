import { apiClient, apiPlace } from "./apiClient";

export interface User {
  id: number;
  name: string;
  email: string;
}

const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export const postUserName = async (body: {
  usernames: string[];
}): Promise<User[]> => {
  const response = await apiClient.post("/v1/usernames/users", body);
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const getPlace = async (
  id: number,
  sortOrder: string,
  limit: number
): Promise<User> => {
  const response = await apiPlace.get(
    `/v2/users/${id}/games?sortOrder=${sortOrder}$limit=${limit}`
  );
  return response.data;
};
