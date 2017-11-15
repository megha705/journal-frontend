import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EntryPreview from './EntryPreview';
import NavBar from './NavBar'
import api from '../api.js'
import auth from '../auth.js';


/*
logic:
1. h1 needs to display the user's name by fetching that data from the database
2. p: would be cool of p used an api to cycle through quotes: https://codepen.io/catapixel/pen/LpVEgy / 
could also make our own api of quotes so they're relevant 
3. fairly certain the carosal type thing will be in Entry Preview not Dashboard. 
can experiment more when we have backend to populate

todo: state only has contents that user put into create account
todo: remove history props from nav bar

fix dashboard if logged out situation!!! 
on component did mount or render or will mount to check if user is logged in and reroutes
*/


class Dashboard extends Component {
  constructor() {
    super();
    this.state = {userObj: {},
                  entries: [],                  
  }
  }

  componentDidMount() {
    api.requestEntries(auth.getToken())
    .then(reply => this.setState({ entries: reply.body.entries } ));
    const userObj = auth.getUser();
    console.log('userobj', userObj)
    this.setState({userObj})

  }

  displayEntryPreviews = (entryObj) => {
    return (
      <EntryPreview data={entryObj} key={entryObj.id} />
    )
  }
  
  render() {
    console.log('the state: ', this.state)
    return (
      <div className="dashboard">
        <NavBar hist={this.props.history} />
        <div className="topWrapper">
          <h1>Hey {this.state.userObj.firstName} </h1>
          <p>Quote</p>
          <Link to="/writeentry"><button>+</button></Link>
        </div>
        <div className="entriesWrapper">
          <div className="entriesWrapperA">
            <h3>Your entries</h3>
          </div>
          <div className="entriesWrapperB">
          {this.state.entries.map(this.displayEntryPreviews)}
          </div>
          <div className="entriesWrapperD">
            <div>next-arrow</div>
            <div>the past</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
