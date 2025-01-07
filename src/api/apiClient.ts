import axios from "axios";
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

export const apiClient = axios.create({
  baseURL: `${proxyUrl}https://users.roblox.com`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiPlace = axios.create({
  baseURL: `${proxyUrl}https://games.roblox.com`,
  headers: {
    "Content-Type": "application/json",
  },
});
