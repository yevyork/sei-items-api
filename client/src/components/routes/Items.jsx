import React, { Component } from "react";
import axios from "axios";
import apiUrl from '../../apiConfig'

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    try {
      const {
        params: { user_id }
      } = this.props.match;
      const response = await axios(
        `${apiUrl}/users/${user_id}/items`
      );
      this.setState({ items: response.data.items });
    } catch (err) {
      console.error(err);
    }
  }

  renderItems = () => {
    // checking if the array of items is filled before rendering
    if (this.state.items.length) {
      return this.state.items.map(item => {
        return (
          <div key={item.id}>
            <h5>{item.title}</h5>
            <button
              onClick={() =>
                this.props.history.push(
                  `/users/${this.props.match.params.user_id}/items/${item.id}`
                )
              }
            >
              More Details
            </button>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <>
        <h4>Items</h4>
        <button
          onClick={() =>
            this.props.history.push(`/users/${this.props.match.params.user_id}`)
          }
        >
          Go Back
        </button>
        <ul>{this.renderItems()}</ul>
      </>
    );
  }
}

export default Items;
