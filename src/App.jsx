import { useState } from 'react'
import UserCard from './assets/UserCard'

import './App.css'

function App() {
  /*
  > Create a variable to store the data from the user
  > run the api
  > store the result in another variable
  > display the result
  > debouncing
*/

  const [userQuery, setUserQuery] = useState('')
  const [apiRespose, setApiResponse] = useState(null)
  let userList = null

  if (apiRespose && apiRespose.items) {
    userList = apiRespose.items.map((item) => {
      return (
        <UserCard
          key={item.id}
          login={item.login}
          avatar_url={item.avatar_url}
          html_url={item.html_url}
        />
      )
    })
  }
  function handleUserQuery(event) {
    event.preventDefault()
    fetch(`https://api.github.com/search/users?q=${userQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setApiResponse(data)
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error)
      })
    setUserQuery('')
  }

  return (
    <>
      <h1 className="mainHeading">Github User Search</h1>
      <form onSubmit={handleUserQuery}>
        <input
          type="text"
          name="userName"
          value={userQuery}
          onChange={(event) => setUserQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="userList">{userList}</div>
    </>
  )
}

export default App
