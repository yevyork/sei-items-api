import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import ItemForm from '../shared/ItemForm'
import apiUrl from '../../apiConfig'

class ItemEdit extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: {
        title: '',
        link: ''
      },
      updated: false
    }
  }

  async componentDidMount() {
    try {
      const response = await axios(
        `${apiUrl}/items/${this.props.match.params.item_id}`
      )
      this.setState({ item: response.data.item })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedItem = Object.assign(this.state.item, updatedField)

    this.setState({ item: editedItem })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/items/${this.props.match.params.item_id}`,
      method: 'PUT',
      data: { item: this.state.item }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }

  render() {
    const { item, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return (
        <Redirect
          to={`/users/${this.props.match.params.user_id}/items/${this.props.match.params.item_id}`}
        />
      )
    }

    return (
      <ItemForm
        item={item}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/users/${this.props.match.params.user_id}/items/${this.props.match.params.item_id}`}
      />
    )
  }
}

export default ItemEdit