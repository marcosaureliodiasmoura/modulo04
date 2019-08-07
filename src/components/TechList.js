import React, { Component } from "react";

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    newTech: "",
    techs: []
  };

  componentDidMount() {
    const techs = localStorage.getItem("techs");

    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  handleInputChange = e => {
    // console.log(e.target.value);
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    this.props.tech;
    e.preventDefault();
    // console.log(this.state.newTech);
    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ""
    });
  };

  handleDelete = tech => {
    // console.log(tech);
    this.setState({ techs: this.state.techs.filter(t => t !== tech) });
  };

  render() {
    // console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <h1>{this.state.newTech}</h1> */}
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            />
          ))}
          {/* <TechItem /> */}
        </ul>
        <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
