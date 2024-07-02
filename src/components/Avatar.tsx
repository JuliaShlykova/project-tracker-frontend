import React from 'react';

const Avatar = ({name}: {name: string}) => {
  let str = name.substring(0,2);

  return (
    <div className='avatar'>
      {str}
    </div>
  )
}

export default Avatar