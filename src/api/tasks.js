import api from './privateRouteInstance';

export const getTasks = async() => {
  const response = await api.get('/tasks');
  return response;
};

export const getAllTasks = async() => {
  const response = await api.get('/tasks/all');
  return response;
};

export const getTaskInfo = async(taskId) => {
  const response = await api.get('/tasks/'+taskId);
  return response;
};

export const updateTask = async(taskId, data) => {
  const response = await api.post('/tasks/'+taskId+'/update', data);
  return response;
};

export const deleteTask = async(taskId) => {
  const response = await api.post('/tasks/'+taskId+'/delete');
  return response;
};

export const createTask = async(projectId, data) => {
  const response = await api.post('/projects/'+projectId+'/create-task', data);
  return response;
};