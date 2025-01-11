import { apiAvatar, apiClient, apiPlace } from "./apiClient";

// Интерфейс для пользователя
export interface User {
  id: number;
  name: string;
  email: string;
}

// Тип для API-ответа с массивом пользователей
type ApiResponse = {
  data: User[];
};

// Обновленная функция postUserName
export const postUserName = async (body: {
  usernames: string[];
}): Promise<ApiResponse> => {
  const response = await apiClient.post<ApiResponse>(
    "/v1/usernames/users",
    body
  );
  return response.data;
};

// Функция для получения пользователя по ID
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<{ data: User }>(`/users/${id}`);
  return response.data.data; // Достаем пользователя из объекта data
};

// Функция для получения места (предполагаю, что это аналогично fetchUserById)
export const getPlace = async (id: number): Promise<any> => {
  const response = await apiPlace.get<{ data: any }>(`/v2/users/${id}/games`);
  return response.data.data; // Достаем пользователя из объекта data
};

export const getUserAvatar = async (userID: number): Promise<any> => {
  const response = await apiAvatar.get<{ data: any }>(
    `/v1/users/avatar?userIds=${userID}&size=100x100&format=Png&isCircular=true`
  );
  return response.data.data;
};

export const getUserGamePass = async (id: number): Promise<any> => {
  const response = await apiPlace.get<{ data: any }>(
    `/v1/games/${id}/game-passes?limit=100&sortOrder=Asc`
  );
  return response.data.data;
};
