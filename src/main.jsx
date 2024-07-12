import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import PrivateRoot from './routes/PrivateRoot.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import { clearStorage, getToken, getUser } from './services/localStorage.js';
import Login from './routes/Login.jsx';
import removeTokenCookie from './utils/removeCookies.js';
import Dashboard from './routes/Dashboard.jsx';
import { allProjectsLoader, allTasksdLoader, createProjectLoader, createTaskLoader, dashboardLoader, editTaskLoader, inviteUsersLoader, projectLoader, projectsLoader } from './loaders.jsx';
import Project from './routes/Project.jsx';
import Projects from './routes/Projects.jsx';
import { createProjectAction, createTaskAction, deleteProjectAction, deleteTaskAction, editProjectAction, editTaskAction, inviteToProjectAction, leaveProjectAction, loginAction, signupAction, updateNickname } from './actions.jsx';
import Landing from './routes/Landing.jsx';
import Signup from './routes/Signup.jsx';
import CreateProject from './routes/CreateProject.jsx';
import CreateTask from './routes/CreateTask.jsx';
import AllIssues from './routes/AllIssues.jsx';
import AllProjects from './routes/AllProjects.jsx';
import EditTask from './routes/EditTask.jsx';
import Root from './routes/Root.jsx';
import ServerError from './routes/ServerError.jsx';
import CustomErrorPage from './routes/CustomErrorPage.jsx';

const router = createBrowserRouter([
  {
    path: '/error-page',
    element: <CustomErrorPage />
  },
  {
    path: '/server-error',
    element: <ServerError />
  },
  {
    errorElement: <CustomErrorPage />,
    element: <Root />,
    children:[
  {
    path: '/',
    element: <Landing />,
    loader: () => {
      if (getToken()&&getUser()) {
        return redirect('/dashboard');
      }
      return null;
    }
  },
  {
    element: <PrivateRoot />,
    loader: () => {
      if (!getToken()||!getUser()) {
        clearStorage();
        removeTokenCookie();
        console.log('no token for private route');
        return redirect('/');
      }
      console.log('there is token');
      return null;
    },
    children: [{
      errorElement: <ErrorPage />,
      children: [
      {
        path: '/dashboard',
        loader: dashboardLoader,
        element: <Dashboard />
      },
      {
        path:'/dashboard/all',
        element: <AllIssues />,
        loader: allTasksdLoader
      },
      {
        path: '/projects',
        loader: projectsLoader,
        element: <Projects />
      },
      {
        path:'/projects/:projectId?/create-task',
        element: <CreateTask />,
        loader: createTaskLoader,
        action: createTaskAction
      },
      {
        path: '/projects/create',
        element: <CreateProject />,
        loader: createProjectLoader,
        action: createProjectAction,
      },
      {
        path: '/projects/all',
        element: <AllProjects />,
        loader: allProjectsLoader
      },
      {
        path:'/projects/:projectId',
        element: <Project />,
        loader: projectLoader,
        action: editProjectAction,
        shouldRevalidate: ({ actionResult }) => {
          if (actionResult) {
            return false;
          }
          return true;
        }
      },
      {
        path:'/projects/:projectId/delete',
        action: deleteProjectAction
      },
      {
        path:'/projects/:projectId/invite',
        action: inviteToProjectAction,
        loader: inviteUsersLoader
      },
      {
        path:'/projects/:projectId/leave',
        action: leaveProjectAction
      },
      {
        path: '/tasks/:taskId/edit',
        element: <EditTask />,
        action: editTaskAction,
        loader: editTaskLoader,
        shouldRevalidate: ({ actionResult }) => {
          if (actionResult) {
            return false;
          }
          return true;
        }
      },
      {
        path: '/tasks/:taskId/delete',
        action: deleteTaskAction
      },
      {
        path: '/users/update-nickname',
        action: updateNickname
      }
    ]}]
  },
  {
    path: '/login',
    element: <Login />,
    loader: () => {
      if (getToken()&&getUser()) {
        return redirect('/dashboard');
      }
      return null;
    },
    action: loginAction
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: () => {
      if (getToken()&&getUser()) {
        return redirect('/dashboard');
      }
      return null;
    },
    action: signupAction
  }
]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)