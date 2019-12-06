import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ItemForm from "../shared/ItemForm";
import Layout from "../shared/Layout";
import apiUrl from '../../apiConfig'

class ItemCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      link: "",
      createdItem: null
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios({
      url: `${apiUrl}/users/${this.props.match.params.user_id}/items`,
      method: "POST",
      data: { title: this.state.title, link: this.state.link }
    })
      .then(res => this.setState({ createdItem: res.data.item }))
      .catch(console.error);
  };

  render() {
    const { handleChange, handleSubmit } = this;
    const { createdItem, title, link } = this.state;

    if (createdItem) {
      return <Redirect to={`/users/${this.props.match.params.user_id}`} />;
    }

    return (
      <Layout>
        <ItemForm
          item={{ title, link }}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </Layout>
    );
  }
}

export default ItemCreate;
