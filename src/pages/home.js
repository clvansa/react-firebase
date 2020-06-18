import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'

import Scream from '../compoments/Scream';
import Profile from '../compoments/profile';
import {connect} from 'react-redux';
import {getScreams} from '../redux/actions/dataActions'



export class home extends Component {
    state = {
        screams : null
    }
    componentDidMount(){
        this.props.getScreams()
    }
   

    render() {
            const {screams, loading} = this.props.data;
            let recentScreamMarkup = !loading ? 
            screams.map((scream) => 
                <Scream key={scream.screamId} scream={scream} /> )
            : <p>Loading ...</p>
        return (
           <Grid container spacing={10} >
               <Grid item sm={8} xs={12}>
                    <div>{recentScreamMarkup}</div>
               </Grid>
               <Grid item sm={4} xs={12}>
                   <div><Profile /></div>
               </Grid>
           </Grid>
        )
    }
}

home.propTypes = {
    getScreams : PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStatetoProps = (state) => ({
    data : state.data
})

export default connect(mapStatetoProps,{getScreams})(home)
