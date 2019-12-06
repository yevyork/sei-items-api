import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import Users from './components/routes/Users'
import Item from './components/routes/Item'
import ItemEdit from './components/routes/ItemEdit'
import ItemCreate from './components/routes/ItemCreate'
import Home from './components/routes/Home'
import Items from './components/routes/Items'

const App = props => (
  <React.Fragment>
    <h3>{props.location.state ? props.location.state.msg : null}</h3>
    <Route exact path="/" component={Home} />
    <Route exact path="/users" component={Users} />
    <Route exact path="/users/:user_id" component={Users} />
    <Route exact path="/users/:user_id/items" component={Items} />
    <Route exact path="/users/:user_id/create-item" component={ItemCreate} />
    <Route exact path="/users/:user_id/items/:item_id" component={Item} />
    <Route
      exact
      path="/users/:user_id/items/:item_id/edit"
      component={ItemEdit}
    />
  </React.Fragment>
)

export default withRouter(App)