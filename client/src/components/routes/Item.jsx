import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import apiUrl from '../../apiConfig'
import Layout from "../shared/Layout";

class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      deleted: false
    };
  }

  async componentDidMount() {
    try {
      const response = await axios(
        `${apiUrl}/users/${this.props.match.params.user_id}/items/${this.props.match.params.item_id}`
      );
      this.setState({ item: response.data.item });
    } catch (err) {
      console.error(err);
    }
  }

  destroy = () => {
    axios({
      url: `${apiUrl}/items/${this.props.match.params.item_id}`,
      method: "DELETE"
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error);
  };

  render() {
    const { item, deleted } = this.state;

    if (!item) {
      return <p>Loading...</p>;
    }

    if (deleted) {
      return (
        <Redirect
          to={{ pathname: "/", state: { msg: "Item succesfully deleted!" } }}
        />
      );
    }

    return (
      <Layout>
        <h4>{item.title}</h4>
        <p>Link: {item.link}</p>
        <button onClick={this.destroy}>Delete Item</button>
        <button
          onClick={() =>
            this.props.history.push(
              `/users/${this.props.match.params.user_id}/items/${item.id}/edit`
            )
          }
        >
          Edit
        </button>
        <Link to={`/users/${this.props.match.params.user_id}/items/`}>
          Back to all items
        </Link>
      </Layout>
    );
  }
}

export default Item;
