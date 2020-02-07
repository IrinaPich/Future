import React, { Component } from 'react';
import './App.css';
import { DataTable } from 'react-data-components';


function buildTable(data) {

  const tableColumns = [
    { title: 'id', prop: 'id' },
    { title: 'firstName', prop: 'firstName' },
    { title: 'lastName', prop: 'lastName' },
    { title: 'email', prop: 'email' },
    { title: 'phone', prop: 'phone' },
  ];

  return (
    <DataTable
      className="container"
      keys="email"
      columns={tableColumns}
      initialData={data}
      initialPageLength={5}
      initialSortBy={{ prop: 'lastName', order: 'descending' }}
      pageLengthOptions={[5, 20, 50]}
    />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          //  console.log(data)
          this.setState({
            items: data
          });
        },
      );
  }

  //handleChange(id) {
  //  this.setState(state => ({
  //    hideList: !state.hideList,
  //    id: id
  //  }));

  //}



  render() {
    console.log(this.state);
    const { items } = this.state;
    return (
      buildTable(items)

      )
  }
}

export default App;
