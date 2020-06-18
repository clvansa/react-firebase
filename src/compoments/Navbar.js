import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propType from 'prop-types';
import MyButton from '../util/MyButton';
import PostScream from './PostScream';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

//MUI icon
import HomeIcon from '@material-ui/icons/Home';
import Notifications from '@material-ui/icons/Notifications';

export class Navbar extends Component {
    scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    render() {
        const { authenticated,user: {credentials : {handle}}} = this.props
        return (
           <AppBar position='fixed'>
               <Toolbar className='nav-container'>
                {authenticated ? (
                <Fragment>
                   <PostScream user={handle}/>
                    <Link to='/'>
                        <MyButton tip='Home' onClick={ this.scrollTop } >
                            <HomeIcon color='primary' />
                        </MyButton>
                    </Link>
                    <MyButton tip='Notificatios' >
                        <Notifications color='primary' />
                    </MyButton>
                </Fragment>
                ):(
                    <Fragment>
                    <Button color='inherit' component={Link} to='/login'>Login</Button>
                   <Button color='inherit' component={Link} to='/'>Home</Button>
                   <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                    </Fragment>
                )}
               </Toolbar>
           </AppBar>
        )
    }
}

Navbar.propType = {
    authenticated: propType.bool.isRequired
}

const mapStateToProps =  (state) => ({
    authenticated: state.user.authenticated,
    user: state.user
})

export default connect(mapStateToProps,null)(Navbar)
