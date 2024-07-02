import React, { useState } from 'react'
import Avatar from '../Avatar'
import { Modal } from 'react-bootstrap';
import avatarSvg from '../../assets/avatar.svg';

interface Participant {
  _id: string;
  nickname: string;
  profileImgUrl: string|undefined;
}

const ParticipantImg = ({participant}: {participant: Participant}) => {
  const [show, setShow] = useState(false);

  return (
    <>
    <div onClick={() => setShow(true)} title={participant.nickname} className='participant-profile-img'>
    {participant.profileImgUrl
    ?<img src={participant.profileImgUrl} className='profile-img' alt='profile image'/>
    :<Avatar name={participant.nickname}/>}
    </div>
    <Modal show={show} animation={false} onHide={() => setShow(false)} fullscreen='sm-down'>
    <Modal.Header closeButton>
      <Modal.Title>{participant.nickname}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div className="d-flex justify-content-center">
        {participant.profileImgUrl
        ?<img src={participant.profileImgUrl} alt="profile image" className="profile-img-big" />
        :(
          <div className="profile-img-big">
            <img src={avatarSvg} />
          </div>
        )}
      </div>
    </Modal.Body>
  </Modal>
  </>
)}

export default ParticipantImg