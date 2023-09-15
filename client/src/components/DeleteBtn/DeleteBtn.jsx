import React from 'react'

const DeleteBtn = ({ onClick }) => {
  return (
    <div>
      <button onClick={onClick} className="delete-button">
        Delete
      </button>
    </div>
  )
}

export default DeleteBtn
