import { api } from '.';

export const getUser = (payload: string) => api.get(`/users/${payload}`);
