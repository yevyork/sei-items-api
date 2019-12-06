import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Layout from '../shared/Layout'
import apiUrl from '../../apiConfig'
class Users extends Component {
  constructor (props) {
    super(props)
    this.state = {
      users: []
    }
  }
  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/users/`)
      this.setState({ users: response.data.users })
    } catch (err) {
      console.error(err)
    }
  }
  render () {
    const users = this.state.users.map(user => (
      <li key={user.id}>
          {`${user.id} `}
        <Link exact to={`/users/${user.id}/items`}>{user.firstName}</Link>
      </li>
    ))
    return (
      <Layout>
        <h4>Items</h4>
        <ul>
          {users}
        </ul>
      </Layout>
    )
  }
}
export default Users