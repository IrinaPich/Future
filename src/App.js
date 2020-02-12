import React, { Component } from 'react';
import './App.css';
//import { DataTable } from 'react-data-components';
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

function buildTable(data) {
  const columns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'firstName', accessor: 'firstName' },
    { Header: 'lastName', accessor: 'lastName' },
    { Header: 'email', accessor: 'email' },
    { Header: 'phone', accessor: 'phone' },
  ];

  return (
    <div>
      <ReactTable
        className="container"
        keys="email"
        Header="Table"
        columns={columns}
        data={data}
        resolveData={data => data.map(row => row)}
        initialPageLength={5}
        initialSortBy={{ prop: 'lastName', order: 'descending' }}
        pageSizeOptions={[5, 20, 50]}
        defaultPageSize={10}
        progressPending={true}
        filterable={true}

        loadingText={'Loading...'}
        loading={false}
        getLoadingProps={() => ({})}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              //console.log('It was in this row:', rowInfo)
              document.getElementById("details").innerHTML =
                `Выбран пользователь <b> ${rowInfo.original.firstName}</b><br>
              Описание:<br><textarea>${rowInfo.original.description}</textarea><br>
              Адрес проживания: <b>${rowInfo.original.address.streetAddress}</b>
              <br>Город: <b>${rowInfo.original.address.city}</b><br>
              Провинция/штат: <b>${rowInfo.original.address.state}</b><br>
              Индекс: <b>${rowInfo.original.address.zip}</b>`;

              if (handleOriginal) {
                handleOriginal()
              }
            }
          }
        }}
      />
      <p id="details" className="container">Additional info of onClicked row</p>
    </div>

  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.checkData = this.checkData.bind(this);
    this.state = {
      items: [],
      bigData: false,
      error: null,
      isLoaded: false,
    };

    this.checkData = this.checkData.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  checkData(e) {
    this.fetchData()
    this.setState(state => ({
      bigData: !this.state.bigData
    }));
  }

  fetchData() {

    if (!this.state.bigData) {
      fetch("http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
        .then(resp => resp.json())
        .then(
          (data) => {
            this.setState({
              items: data,
              bigData: true,
              isLoaded: true,
            });
          },

          (error) => {
            this.setState({
              error
            });
          }
        );
    }
    else if (this.state.bigData) {
      //console.log("1000")
      fetch("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")

        .then(resp => resp.json())
        .then(
          (data) => {
            this.setState({
              items: data,
              bigData: false,
              isLoaded: true,
            });
          },

          (error) => {
            this.setState({
              error
            });
          }
        );
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    if (this.state.error) {
      return <div>Error: {this.state.error.message}</div>;
    } else if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
    const { items } = this.state;
    return (
      <div>
        <h1 className="container">Table</h1>
        <form>
          <p className="container">
            <label>
              <input
                type="checkbox"
                className="filled-in"
                checked={this.state.bigData}
                onChange={this.checkData}
              />
              {' '}
              <span>Small volume Data</span>
            </label>
          </p>
        </form>
        {buildTable(items)}
      </div>
    )
  }
}
}


export default App;