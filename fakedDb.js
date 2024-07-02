import { faker } from '@faker-js/faker';
const getUser = () => {
  return {nickname: 'john smith', _id: '1'};
}

const fakeAvatar = faker.image.avatar();

const createRandomUser = () => {
  return {
    _id: faker.string.uuid(),
    nickname: faker.internet.userName(),
    profileImgUrl: faker.image.avatar()
  };
};

const createRandomTask = (projectId, data={}) => {
  let done = faker.datatype.boolean();
  const { name, description, taskType, dueDate } = data;
  return {
    _id: faker.string.uuid(),
    name: name?name:faker.lorem.words({ min: 1, max: 3 }),
    description: description?description:faker.lorem.sentence({ min: 3, max: 5 }),
    taskType: taskType?taskType:faker.helpers.arrayElement(['Issue', 'Task']),
    done: done,
    dueDate: dueDate?dueDate:faker.date.between({ from: '2024-06-16T00:00:00.000Z', to: '2024-06-22T00:00:00.000Z' }).toISOString(),
    completedDate: done?faker.date.past({ years: 1 }):undefined,
    assignee: {nickname: getUser().nickname, profileImgUrl: fakeAvatar, _id: getUser()._id},
    createdAt: faker.date.past({ years: 1 }),
    project: projectId
  }
}

const createRandomProject = (data) => {
  let name = data?.name;
  let participants = data?.participants;
  let deadline = data?.deadline;
  return {
    _id: faker.string.uuid(),
    name: name?name:faker.lorem.words({ min: 1, max: 2 }),
    status: faker.helpers.arrayElement(['In progress', 'Finished', 'Dropped']),
    // author: {nickname: getUser().nickname, profileImgUrl: fakeAvatar, _id: getUser()._id},
    author: {nickname: getUser().nickname, _id: getUser()._id},
    createdAt: faker.date.past({ years: 1 }),
    participants: participants?participants:[],
    deadline: deadline?deadline:faker.date.future( { years: 1 }).toISOString()
  }
}

const generateFakeDb = () => {
  const users = faker.helpers.multiple(createRandomUser, {count: 5});
  const projects = faker.helpers.multiple(createRandomProject, {count: 20});
  let tasks = [];
  projects.forEach(project => {
    let projectTasks = faker.helpers.multiple(()=>createRandomTask(project._id), {count: 5});
    tasks.push(...projectTasks);
  });
  return {users, projects, tasks};
};

let {users, projects, tasks} = generateFakeDb();
export {users};
tasks.sort((taskA, taskB) => new Date(taskA.dueDate) - new Date(taskB.dueDate));
projects.sort((projectA, projectB) => new Date(projectA.deadline) - new Date(projectB.deadline))

export const getProjects = async() => {
  const response = {data: projects.filter(project=>project.status==='In progress')};
  return response;
};

export const getProjectsWithPossibleAssignees = async() => {
  const response = {data: projects.filter(project=>project.status==='In progress').map(project=>({...project, participants: users}))};
  return response;
};

export const getAllProjects = async() => {
  const response = {data: projects};
  return response;
};

export const getProject = async(projectId) => {
  const response = {
    data: {
      project: projects.find(project=>project._id===projectId),
      tasks: tasks.filter(task=>task.project===projectId)}};
  return response;
};

export const getUsers = async() => {
  const response = {data: users};
  return response;
}

export const getUsersToInvite = async(projectId) => {
  const response = {data: users};
  return response;
};

export const createProject = async(data) => {
  const response = createRandomProject(JSON.parse(data));
  projects.push(response);
  return {data: response};
};

export const inviteUsers = async(projectId, data) => {
  const projectIndex = projects.findIndex(project=>project._id===projectId);
  projects[projectIndex].participants.push(data);
  const response = {data: {participants: projects[projectIndex].participants}};
  return response;
};

export const updateProject = async(projectId, data) => {
  const projectIndex = projects.findIndex(project=>project._id===projectId);
  projects[projectIndex] = {...projects[projectIndex], ...JSON.parse(data)}
  return {data: projects[projectIndex]};
};

export const leaveProject = async(projectId) => {
  return true;
};

export const deleteProject = async(projectId) => {
  const projectIndex = projects.findIndex(project=>project._id===projectId);
  projects = [...projects.slice(0,projectIndex), ...projects.slice(projectIndex+1)]
  return true;
};

export const createTask = async(projectId, data) => {
  const response = createRandomTask(projectId, JSON.parse(data));
  tasks.push(response);
  return response;
};

export const getTasks = async () => {
  const response = {data: tasks
    .map(task=>{
      if (!task.done) {
        let projectId = task.project;
        let project = projects.find(project=>project._id===projectId);
        let projectInfo = {name: project.name, _id: projectId};
        return {...task, project: projectInfo};
      }
    })
    .filter(task=>task!==undefined)};
  return response;
};

export const getAllTasks = async() => {
  let data = tasks.map(task=>{
    let projectId = task.project;
    let project = projects.find(project=>project._id===projectId);
    let projectInfo = {name: project.name, _id: projectId};
    return {...task, project: projectInfo};
  });
  const response = {data};
  return response;
};

export const getTaskInfo = async(taskId) => {
  const taskInfoWithoutProject = tasks.find(task=>task._id===taskId);
  let projectId = taskInfoWithoutProject.project;
  let project = projects.find(project=>project._id===projectId);
  return {data: {...taskInfoWithoutProject, project: {_id: projectId, name: project.name}}}
}

export const updateTask = async(taskId, data) => {
  const taskIndex = tasks.findIndex(task=>task._id===taskId);
  let newTask = {...tasks[taskIndex], ...data};
  let projectId = newTask.project;
  let project = projects.find(project=>project._id===projectId);
  tasks[taskIndex] = newTask;
  return {data: {...tasks[taskIndex], project: {_id: projectId, name: project.name}}};
};

export const deleteTask = async(taskId) => {
  const taskIndex = tasks.findIndex(task=>task._id===taskId);
  tasks = [...tasks.slice(0,taskIndex), ...tasks.slice(taskIndex+1)]
  return true;
};