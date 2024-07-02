import { redirect } from "react-router-dom";
import { setToken, setUser } from "./services/localStorage";
import formDataToJSON from './utils/formDataToJSON';
// import { createProject, createTask, deleteProject, deleteTask, updateProject, updateTask } from "../fakedDb";
import { login, signup } from "./api/auth";
import { createTask, updateTask, deleteTask } from "./api/tasks";
import { createProject, updateProject, deleteProject } from "./api/projects";


export async function loginAction({ request, params }) {
  try {
    const formData = await request.formData();
    await login(formData);
    return redirect('/dashboard');
  } catch(err) {
    if (err.response?.status===422||err.response?.status===401) {
      return err.response.data.errors;
    }
    throw new Response('', {
      status: 500,
      statusText: err.message
    });
  }
}

export async function signupAction({ request, params }) {
  try {
    const formData = await request.formData();
    const confirm_password = formData.get('confirm_password');
    const password = formData.get('password');
    if (confirm_password !== password) {
      return [{msg: 'Passwords must be the same'}]
    }
    await signup(formData);
    return redirect('/dashboard');
  } catch(err) {
    if (err.response?.status===422||err.response?.status===409) {
      return err.response.data.errors;
    }
    throw new Response('', {
      status: 500,
      statusText: err.message
    });
  }
}

export async function createTaskAction({ request, params }) {
  try {
    console.log("in action of creating task");
    const formData = await request.formData();
    formData.set("dueDate", (new Date(formData.get("dueDate"))).toISOString());
    const data = formDataToJSON(formData);
    const response = await createTask(params.projectId, data);
    return redirect('/dashboard');
  } catch(err) {
    if (err.response?.status===422) {
      return err.response.data.errors;
    }
    throw new Response('', {
      status: 500,
      statusText: err.message
    });
  }
}

export async function createProjectAction({ request }) {
  try {
    console.log("in action of creating project");
    let formData = await request.formData();
    if (formData.get('deadline')) {
      formData.set("deadline", (new Date(formData.get("deadline"))).toISOString());
    }
    const data = formDataToJSON(formData);
    const response = await createProject(data);
    console.log('response: ', response)
    return redirect('/projects/'+response.data._id);
  } catch(err) {
    if (err.response?.status===422) {
      return err.response.data.errors;
    }
    throw new Response('', {
      status: err.response?.status||500,
      statusText: err.response?.data?.error?.message||err.message
    });
  }
}

export async function editProjectAction({ request, params }) {
  let formData = await request.formData();
  if (formData.get('deadline')) {
    formData.set("deadline", (new Date(formData.get("deadline"))).toISOString());
  }
  const data = formDataToJSON(formData);
  const response = await updateProject(params.projectId, data);
  return response.data;
}

export async function deleteProjectAction({ params }) {
  await deleteProject(params.projectId);
  return redirect('/projects');
}

export async function editTaskAction({ request, params }) {
    let data = await request.json();
    const updatedTask = await updateTask(params.taskId, data);
    return updatedTask.data;
}

export async function deleteTaskAction({ params }) {
  await deleteTask(params.taskId);
  return redirect('/dashboard');
}

export async function updateNickname({request}) {
  let data = await request.formData();
  await updateNickname(data);
  return;
}