import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useFetcher, useParams } from 'react-router-dom'

const ModalInvite = ({showInvite, setShowInvite}) => {
  const { projectId } = useParams();
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/projects/' + projectId + '/invite');
    }
  }, [fetcher, projectId]);

  return (
    <Modal show={showInvite} onHide={() =>setShowInvite(false)} fullscreen='sm-down'>
      <Modal.Header closeButton>
        <Modal.Title>Invite to project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          fetcher.data
          ?
            <fetcher.Form method="post" action={'/projects/' + projectId + '/invite'} id="invite-project-form">
            <fieldset>
              <legend>Possible participants: </legend>
              <div className="vstack gap-2">
              {fetcher.data.map(user=>(
                <label key={user._id}>
                  <input type="checkbox" name="participants" value={user._id} />
                  {user.profileImgUrl
                    ?<img src={user.profileImgUrl} alt="profile image" className='profile-img ms-2' />
                    :null}
                  <span className='ms-2'>{user.nickname}</span>
                </label>
              ))}
              </div>
            </fieldset>
            </fetcher.Form>
          :<p>Loading...</p>
        }
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={() => setShowInvite(false)}>
        Close
      </Button>
      <Button 
        type='submit' 
        form="invite-project-form"
        disabled={fetcher.state!=='idle'}
      >
        {fetcher.state!=='idle'?'Loading...':'Invite'}
      </Button>
    </Modal.Footer>
    </Modal>
  )
}

export default ModalInvite