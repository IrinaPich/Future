import React, { Component } from 'react';
import './App.css';
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
      <p id="details">* Click any row for additional info</p>
    </div>

  );
}

class App extends Component {
  constructor() {
    super();
    this.checkData = this.checkData.bind(this);
    this.state = {
      items: [],
      bigData: false,
      error: null,
      isLoaded: false,
      showForm: false,
    };

    this.checkData = this.checkData.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.mySubmitHandler = this.mySubmitHandler.bind(this);
    this.appendData = this.appendData.bind(this);
  }

  mySubmitHandler(event) {
    event.preventDefault();
    const
      { items } = this.state,
      id = parseInt(this.refs.id.value),
      firstName = this.refs.firstName.value,
      lastName = this.refs.lastName.value,
      email = this.refs.email.value,
      phone = this.refs.phone.value,
      address = { city: '', streetAddress: '', state: '', zip: '' };
    this.setState({
     // showForm: false,
      items: [...items, {
        id,
        firstName,
        lastName,
        email,
        phone,
        address
      }]
    }, () => {
      this.refs.id.value = '';
      this.refs.firstName.value = '';
      this.refs.lastName.value = '';
      this.refs.email.value = '';
      this.refs.phone.value = '';
    });
  }

  appendData() {
    this.setState({
      showForm: true
    });
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
              showForm: false,
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
      fetch("http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}")
        .then(resp => resp.json())
        .then(
          (data) => {
            this.setState({
              items: data,
              bigData: false,
              isLoaded: true,
              showForm: false,
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
      //console.log('render', this.state.items);
      return (
        <div className="container">
          <h1>Table</h1>
          <form>
            <input
              type="checkbox"
              className="filled-in"
              checked={this.state.bigData}
              onChange={this.checkData}
            />
            {' '}
            <span>Small volume Data</span>
          </form>
          {this.state.showForm &&
            <form onSubmit={this.mySubmitHandler}>
              <input required
                type='number' pattern="\d+"
                ref='id'
                placeholder='id'
              />
              <input required
                type='text'
                ref='firstName'
                placeholder='firstName'
              />
              <input required
                type='text'
                ref='lastName'
                placeholder='lastName'
              />
              <input required
                type='email'
                ref='email'
                placeholder='email'
              />
              <input required
                type='text'
                ref='phone'
                placeholder='phone'
              />
              <input
                type='submit'
                value='Добавить в таблицу'
              />
            </form>
          }

          {!this.state.showForm &&
            <button onClick={(e) => this.appendData(e)}>Добавить</button>
          }
            <p id="append">* Click the button to add new data</p>

          {buildTable(items)}
        </div>
      )
    }
  }
}

export default App;