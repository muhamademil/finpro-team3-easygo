import api from "../lib/axios";

export const getFacilitiesAPI = () => {
  return api.get('/facilities');
};
