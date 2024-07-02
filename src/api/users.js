import api from './privateRouteInstance';
import apiImg from './privateRouteImageInstance';

export const getUsers = async() => {
  try {
    const possibleParticipants = api.get('/users');
    return possibleParticipants;
  } catch(err) {
    return Promise.reject(err);
  }
}

export const updateNickname = async(newName) => {
  try {
    await api.post('/users/update-nickname', {nickname: newName});
    return;
  } catch(err) {
    return Promise.reject(err);
  }
};

export const updateProfileImg = async(userImg) => {
  try {
    const response = await apiImg.post('/users/upload-profile-img', {userImg});
    return response.data.profileImgUrl;
  } catch(err) {
    return Promise.reject(err);
  }
};