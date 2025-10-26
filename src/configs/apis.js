import api from "./axois";

export const authAPI = {
    authPath:'/users',
    login: (data) => api.post(`${authAPI.authPath}/login`, data),
    signup: (data) => api.post(`${authAPI.authPath}/signup`, data),
  logout: () => api.post(`${authAPI.basePath}/logout`),
  getEmployees: () => api.get(`${authAPI.basePath}/get-employees`),
  resetPassword: (id, data) =>
    api.put(`${authAPI.basePath}/reset-password/${id}`, data),
};

export const nationalIDAPI = {
  nationalIdsPath:"/national-ids",
  addNationalIDs:(data) => api.post(`${nationalIDAPI.nationalIdsPath}/add`, data),
}


export const statisticsAPI = {
  statisticsPath:"/statistics",
  addStatistics:(data) => api.post(`${statisticsAPI.statisticsPath}/add`, data),
  getStatistics:(id) => api.get(`${statisticsAPI.statisticsPath}/${id}`)
}