const baseURL = "https://62fd5d88b9e38585cd50fe2f.mockapi.io/tasks/v1/Task";

export const Endpoints = {
  getTasks: () => `${baseURL}`,
  getTask: (taskId) => `${baseURL}/${taskId}`,
  putTask: (taskId) => `${baseURL}/${taskId}`,
  postTask: () => `${baseURL}`,
};
