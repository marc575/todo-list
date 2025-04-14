import React from 'react'

function Avatar({username}) {
  return (
    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
        <img src={`https://ui-avatars.com/api/?name=${username}&background=random`} className="rounded-full" size={16} />
    </div>
  )
}

export default Avatar
