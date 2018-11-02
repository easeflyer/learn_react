import React from 'react'
import App1Model from './App1Model'
import App2Model from './App2Model'

const Model = {
  App1Model,
  App2Model,
}

const AppCtx = React.createContext(Model)


/**
 * 1) 把全局 store 传递给 Controller 的 props
 * 2) 把 Route 传递过来的 props 合并到 Controller
 */
// const ctx = (Controller) => {
//   const Re = (props) => (
//     <AppCtx.Provider value={Model}>
//       <AppCtx.Consumer>
//         {(store) => <Controller {...store} {...props} />}
//       </AppCtx.Consumer>
//     </AppCtx.Provider>
//   )
//   return Re;
// }

const ctx = (Controller) => {
  const Re = (props) => (
    <Controller {...Model} {...props}/>
  )
  return Re;
}


export { ctx };
export default Model;