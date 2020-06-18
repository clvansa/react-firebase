import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import Scream from '../compoments/Scream';
import Grid from '@material-ui/core/Grid'
import StaticProfile from '../compoments/StaticProfile'

import { connect } from 'react-redux';
import {getUserData} from '../redux/actions/dataActions'
 

export class user extends Component {
    state = {
        profile:null
    }
    componentDidMount () {
        const handle = this.props.match.params.handle;
        this.props.getUserData(handle)
        axios.get(`/user/${handle}`)
            .then((res) => {
                this.setState({profile: res.data.user})
            }).catch(err => console.log(err))
    }

    render() {
       const {screams,loading} = this.props.data;
       let recentScreamsMarkup = loading ? (
       <p>Loading ... </p>
       ) : screams === null ? (
           <p>No Scream from this users</p>
       ) : (
           screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
       )

       
     
        return (
          <Grid container spacing={10}>
            <Grid item sm={7}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={5}>
               {this.state.profile === null ? (
                   <p>Loading profile ...</p>
               ) :  (<StaticProfile profile={this.state.profile} />)}
            </Grid>
          </Grid>
        )
    }
}

user.propTypes = {
    getUserData:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data : state.data
})

const ActionToProps = {
    getUserData
}


export default connect(mapStateToProps,ActionToProps)(user)
