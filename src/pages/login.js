import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import propTypes from 'prop-types';
import AppIcon from '../images/monkey.png';
import {Link} from 'react-router-dom';

// MUI stiff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})
   




export class login extends Component {
    constructor (){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if( nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
       
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes,UI:{loading} } = this.props;
        const {errors} = this.state
        return (
           <Grid container className={classes.form}>
               <Grid item sm />
               <Grid item sm >
                   <img src={AppIcon} alt="monkey" className={classes.image}/>
                   <Typography variant='h3' className={classes.pageTitle}>Login</Typography>
                   <form noValidate onSubmit={this.handleSubmit} >
                       <TextField id="email" name='email' type='email' label='Email' className={classes.TextField}
                        value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true: false } fullWidth></TextField>

                        <TextField id="password" name='password' type='password' label='Password' className={classes.TextField}
                        value={this.state.password}  onChange={this.handleChange} helperText={errors.password} error={errors.password ? true: false } fullWidth></TextField>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Button type='submit' variant='contained' color='primary' disabled={loading} className={classes.button } >Login
                        {loading && (
                            <CircularProgress className={classes.progress} size={20} />
                        )}
                        </Button><br />
                        <small>dont have an account ? sign up <Link to ='/signup'>here</Link></small>

                   </form>
               </Grid>
               <Grid item sm />

           </Grid>
        )
    }
    
}
login.propTypes = {
    classes :propTypes.object.isRequired,
    loginUser :propTypes.func.isRequired,
    user: propTypes.object.isRequired,
    UI: propTypes.object.isRequired


}
const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionToProps  = {loginUser}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));
