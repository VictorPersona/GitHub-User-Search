import React from 'react'
import '../App.css'

function UserCard(props) {
  function handleClick() {
    window.open(props.html_url, '_blank')
  }
  return (
    <div className="cardBody" onClick={handleClick}>
      <h3 className="userName">{props.login}</h3>
      <img src={props.avatar_url} alt="Avatar" />
    </div>
  )
}

export default UserCard
