import React from 'react'
import createHistory from "history/createBrowserHistory"


const App = () => {
  const history = createHistory()

  // Get the current location.
  const location = history.location
  console.log('location:',location)

  // Listen for changes to the current location.
  const unlisten = history.listen((location, action) => {
    // location is an object like window.location
    console.log('listen:',action, location.pathname, location.state)
  })

  // Use push, replace, and go to navigate around.
  history.push("/home", { some: "state" })

  // To stop listening, call the function returned from listen().
  unlisten()
  return (
    <div>
      <a href='/#/333'>333</a>
      <a href='/#/222'>222</a>      
    </div>
  )
}

export default App;