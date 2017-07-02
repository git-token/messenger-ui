import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import { Dashboard, Login } from './components/index'
import { store, history } from './store'

// // Create a history of your choosing (we're using a browser history in this case)
// const history = createHistory()
//
// // Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history)
//
// // Add the reducer to your store on the `router` key
// // Also apply our middleware for navigating
// const store = createStore(
//   combineReducers({
//     ...reducers,
//     router: routerReducer
//   }),
//   applyMiddleware(middleware),
//   applyMiddleware(thunk),
// )


ReactDOM.render(
  <BrowserRouter history={history}>
    <Provider store={store}>
        <div>
          <Route exact path="/" component={Dashboard}/>
        </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app')
)
