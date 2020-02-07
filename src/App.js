import React, { Component } from 'react';
import './App.css';
//import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hideList: true,
      items: [],
      id: -1,
      showWindowPortal: false,
    };
  }

  componentDidMount() {
    fetch("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
      .then(resp => resp.json())
      .then(
        (data) => {
          console.log(data)
          this.setState({
            isLoaded: true,
            items: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
      window.addEventListener('beforeunload', () => {
        this.closeWindowPortal();
      });
  }

  handleChange(id) {
    this.setState(state => ({
      hideList: !state.hideList,
      id: id
    }));
 
  }

  render() {
    //const { error, isLoaded, items, id } = this.state;

    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
        Table
        </div>
      )
    }
  }
}

    export default App;
