// import { getAllProjects, getAllTasks, getProject, getProjects, getProjectsWithPossibleAssignees, getTasks, getUsers, getTaskInfo } from '../fakedDb';
import { getTasks, getAllTasks, getTaskInfo } from './api/tasks';
import { getProjects, getProjectsWithPossibleAssignees, getAllProjects, getProject } from './api/projects';
import { getUsers } from './api/users';

export async function dashboardLoader() {
  console.log('dashboard loader');
  const response = await getTasks();
  return response.data;
}

export async function allTasksdLoader() {
  console.log('allTasks loader');
  const response = await getAllTasks();
  return response.data;
}

export async function projectsLoader() {
  console.log('projects loader');
  const response = await getProjects();
  return response.data;
}

export async function editTaskLoader({params}) {
  console.log('edit task loader');
  try {
    const response = await getTaskInfo(params.taskId);
    return response.data
  } catch(err) {
    if (err.response.status===404) {
      throw new Response('', {
        status: 404, 
        statusText: "id \"" + params.taskId + "\" is not found in tasks"
      });
    }
    throw new Response('', {
      status: 500,
      statusText: err.message
    });
  }
}

export async function createTaskLoader({params}) {
  console.log('projects loader with assignees');
  const response = await getProjectsWithPossibleAssignees();
  const projects = response.data;
  if (params.projectId&&!projects.some(project=>project._id===params.projectId)) {
    throw new Response('', {
      status: 404, 
      statusText: "id \"" + params.projectId + "\" is not found in projects in progress"
    });
  }
  return projects;
}

export async function createProjectLoader() {
  console.log('create project loader');
  const response = await getUsers();
  return response.data;
}

export async function allProjectsLoader() {
  console.log('projects loader');  
  const response = await getAllProjects();
  return response.data;
}

export async function projectLoader({ params }) {
  console.log('project loader');
  try {
    const response = await getProject(params.projectId);
    return response.data;
  } catch(err) {
    if (err.response?.status===404) {
      throw new Response('', {
        status: 404, 
        statusText: "id \"" + params.taskId + "\" is not found in tasks"
      });
    }
    throw new Response('', {
      status: 500,
      statusText: err.message
    });
  }
}
