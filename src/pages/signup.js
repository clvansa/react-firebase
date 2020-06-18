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
import { signupUser } from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
})
   



class signup extends Component {
    constructor (){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            handle: '',
            loading: false,
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
        this.setState({
            loading:true
        })
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history);
        
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const {classes, UI:{ loading } } = this.props;
        const {errors} = this.state
        return (
           <Grid container className={classes.form}>
               <Grid item sm />
               <Grid item sm >
                   <img src={AppIcon} alt="monkey" className={classes.image}/>
                   <Typography variant='h3' className={classes.pageTitle}>Signup</Typography>
                   <form noValidate onSubmit={this.handleSubmit} >
                       <TextField id="email" name='email' type='email' label='Email' className={classes.TextField}
                        value={this.state.email} onChange={this.handleChange} helperText={errors.email} error={errors.email ? true: false } fullWidth></TextField>

                        <TextField id="password" name='password' type='password' label='Password' className={classes.TextField}
                        value={this.state.password}  onChange={this.handleChange} helperText={errors.password} error={errors.password ? true: false } fullWidth></TextField>

                        <TextField id="confirmPassword" name='confirmPassword' type='password' label='Confirm password' className={classes.TextField}
                        value={this.state.confirmPassword}  onChange={this.handleChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true: false } fullWidth></TextField>

                        <TextField id="handle" name='handle' type='text' label='Username' className={classes.TextField}
                        value={this.state.handle}  onChange={this.handleChange} helperText={errors.handle} error={errors.handle ? true: false } fullWidth></TextField>
                        {errors.general && (
                            <Typography variant='body2' className={classes.customError}>{errors.general}</Typography>
                        )}
                        <Button type='submit' variant='contained' color='primary' className={classes.button} >Signup
                        {loading && (
                            <CircularProgress className={classes.progress} size={20} />
                        )}
                        </Button><br />
                        <small>Already have an account ? login <Link to ='/signup'>here</Link></small>

                   </form>
               </Grid>
               <Grid item sm />

           </Grid>
        )
    }
    
}
signup.propTypes = {
    classes :propTypes.object.isRequired,
    signupUser :propTypes.func.isRequired,
    user :propTypes.object.isRequired,
    UI :propTypes.object.isRequired

}

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
})

const mapActionToProps  = {signupUser}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(signup));
