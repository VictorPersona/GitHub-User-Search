import { useState, useEffect } from 'react'
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
  const [apiResponse, setApiResponse] = useState(null)
  let userList = null

  if (apiResponse && apiResponse.items) {
    userList = apiResponse.items.map((item) => {
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

    setUserQuery('')
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      if (userQuery.trim() !== '') {
        fetch(`https://api.github.com/search/users?q=${userQuery}`)
          .then((res) => res.json())
          .then((data) => {
            setApiResponse(data)
          })
          .catch((error) => {
            console.error(
              'There was a problem with the fetch operation:',
              error
            )
          })
      } else {
        setApiResponse(null)
      }
    }, 1000)

    return () => clearTimeout(getData)
  }, [userQuery])

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
