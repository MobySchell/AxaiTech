import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Nav from './components/Nav';
import Product from './components/Product';
import Resources from './components/Resources';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import DoctorPortal from './components/DoctorPortal';
import PatientPortal from './components/PatientPortal';
// import background from './images/option7.jpg';
import Firebase from './firebase/firebase';
import Login from './components/login/Login';
import register from './components/login/register';
import PropsRoute from './components/routing/PropsRoute';
import GuardedRoute from './components/routing/GuardedRoute';
import StatusPage from './components/StatusPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loading: true,
      // role: '',
      // status: ''
      role: localStorage.getItem('role'),
      status: localStorage.getItem('status')
    };

    this.db = Firebase.firestore();
    this.auth = Firebase.auth();


  }


  /*
  this.setState(
    {selection: this.state.selection.concat(shop_item) },
    () => {
      this.saveToLocal();
    }
    );

  saveToLocal() {
       const local = this.state.favourites;
       this.localStorage.setItem(‘saveFavorites’, JSON.stringify(local));
   }

  this.setState(
    { selection: this.state.selection.concat(shop_item) },
    this.saveToLocal
  );
  */
  
  componentDidMount() {
    this.auth.onAuthStateChanged((user) => {
      this.setState({ user: user, loading: false });
      if (user !== null) {
        this.getUserRole(user.uid);
      }
    });
  }

  async getUserRole(userUid) {
    const snap1 = await this.db.collection('user-roles').where('userId', '==', userUid).get();
    snap1.forEach((doc) => {
      const role = doc.data().role;
      this.setState({ role: role });
      localStorage.setItem('role', role);
    });
    const {role} = this.state;
    if (role === "doctor") {
      const snap2 = await this.db.collection('doctors').where('userId', '==', userUid).get();
      snap2.forEach((doc) => {
      const status = doc.data().status;
        this.setState({ status: status });
        localStorage.setItem('status', status);
      });
    }
  }
    /*
    const snap = await this.db.collection('doctors').where('userId', '==', userUid).get();
    snap.forEach((doc) => {
      // const role = doc.data().role;
      const role = "doctor";
      const status = doc.data().status;
      this.setState({
        role: role,
        status: status
      });
    });
    */

  render() {
    // const { user, role, status, loading } = this.state;
    
    const { user, loading, role, status } = this.state;
  
    return (
      <div>
        {loading ? (
          <div>Loading</div>
        ) : (
          <BrowserRouter>
            <div className="backgroundImage"
              // style={{ backgroundImage: `url(${background}`}}
              >
              <Nav user={user} />
              <Route path="/product" exact component={Product} />
              <Route path="/" exact component={Home} />
              <Route path="/about" exact component={About} />
              <Route path="/resources" exact component={Resources} />
              <PropsRoute path="/login" exact component={Login} user={user} />
              <PropsRoute path="/register" exact component={register} user={user} />

              <GuardedRoute
                path="/patient-portal"
                exact
                component={PatientPortal}
                user={user}
                role={role}
                status={status}
              />
              <GuardedRoute
                path="/doctor-portal"
                exact
                component={DoctorPortal}
                user={user}
                role={role}
                status={status}
              />
              <GuardedRoute
                path="/status-page"
                exact
                component={StatusPage}
                user={user}
                role={role}
                status={status}
              />

              <Contact />
            </div>
          </BrowserRouter>
        )}
      </div>
    );
  }
}

export default App;