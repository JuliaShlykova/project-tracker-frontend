import classNames from 'classnames';
import React, { useReducer } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useFetcher } from 'react-router-dom'

const DoneIcon = ({task}) => {
  const fetcher = useFetcher();
  let done = task.done;
  if (fetcher.json) {
    done = fetcher.json.done;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    fetcher.submit(
      {done: formData.get("done")==="true"},
      {
        method: "post",
        action: "/tasks/" + task._id + "/edit",
        encType: "application/json"
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className='d-flex justify-content-stretch'> 
    <input 
      name="done" 
      value={done ? "false" : "true"} 
      hidden 
      readOnly
    />
    <button 
      type="submit" 
      className={classNames("btn-done", done?'text-success':'text-gray')}
      aria-label={
        done
          ? "Mark undone"
          : "Mark done"
      }
      title={
        done
          ? "Mark undone"
          : "Mark done"
      }
    >
    ✔
    </button>
    </form>
  )
}

export default DoneIcon