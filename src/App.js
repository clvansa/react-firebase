import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//Redux stuff
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions'

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user'
import Navbar from './compoments/Navbar';
import AuthRoute from './util/AuthRoute';
import chat from './compoments/ChatDetails'
import './App.css';

//MUI stuff
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import themeFile from './util/theme';

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;

if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  }else{
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}

export class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <div className='App'>
            <Router>
              <Navbar />
              <div className='container'>
                <Switch>
                  <Route path='/' exact component={home} />
                  <AuthRoute path='/login' exact component={login}  />
                  <AuthRoute path='/signup' exact component={signup}  />
                  <Route path='/users/:handle'  component={user}  />
                  <Route path='/chat/:userHandle' exact render={(props) => <chat userHandle={props.match.params.userHandle} {...props} />} component={chat}  />
                </Switch>
              </div>
            </Router>
          </div>
        </Provider>
        
      </MuiThemeProvider>
    )
  }
}

export default App
