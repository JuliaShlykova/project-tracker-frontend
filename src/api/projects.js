import api from './privateRouteInstance';

export const getProjects = async() => {
  const response = await api.get('/projects');
  return response;
};

export const getAllProjects = async() => {
  const response = await api.get('/projects/all');
  return response;
};

export const getProjectsWithPossibleAssignees = async() => {
  const response = await api.get('/projects/assignees');
  return response;
}

export const getProject = async(projectId) => {
  const response = await api.get('/projects/'+projectId);
  return response;
};

export const getUsersToInvite = async(projectId) => {
  const response = await api.get('/projects/'+projectId+'/users-to-invite');
  return response;
};

export const createProject = async(data) => {
  const response = await api.post('/projects/create', data);
  return response;
};

export const inviteUsers = async(projectId, data) => {
  const response = await api.post('/projects/'+projectId+'/invite', data);
  return response;
};

export const updateProject = async(projectId, data) => {
  const response = await api.post('/projects/'+projectId+'/update', data);
  return response;
};

export const leaveProject = async(projectId) => {
  const response = await api.post('/projects/'+projectId+'/leave');
  return response;
};

export const deleteProject = async(projectId) => {
  const response = await api.post('/projects/'+projectId+'/delete');
  return response;
};

