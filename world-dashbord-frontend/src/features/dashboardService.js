
import axiosInstance from "../services/axiosInstancs";

export const getTotalPopulation = async () => {
  const response = await axiosInstance.get("/totalPopulation");
  return response.data;
};

export const getTop10Countries = async () => {
  const response = await axiosInstance.get("/top10PopulatedCon");
  return response.data;
};

export const getRegionStats = async () => {
  const response = await axiosInstance.get("/regionStats");
  return response.data;
};
