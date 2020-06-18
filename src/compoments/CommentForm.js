import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton'

//MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from "@material-ui/core/InputAdornment";


//Redux 
import { connect } from 'react-redux';
import {submitComment} from '../redux/actions/dataActions'

const styles = () => ({
    TextField: {
        margin: "10px auto 10px auto"
    },
    button: {
        marginTop: 20,
        position: "relative"
      }
})



    
    
export class CommentForm extends Component {
    state = {
        body :'',
        errors:{}
        }

      
    
    componentWillReceiveProps (nextProps) {
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body:''})
        }
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.submitComment(this.props.screamId,{body:this.state.body})
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render() {
        const {classes, authenticated,user:{credentials:{imageUrl}}} = this.props;
        const errors = this.state.errors;
        const commentFromMarkup = authenticated ? (
            <Grid item sm={12} style={{ textAlign:'center',padding:'20px 0'}} >
                <form onSubmit={this.handleSubmit} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                    {/* <Grid item sm={10} style={{marginRight:10}}>
                    <TextField name='body' type='text' label='Comment on post' error={errors.error ?  true: false}  helperText={errors.error} value={this.state.body} onChange={this.handleChange} fullWidth className={classes.TextField} />
                    </Grid>
                    <Grid item sm={2}>
                    <Button type='submit' variant='contained' color='primary' className={classes.button}><SendIcon /></Button>
                    </Grid> */}
                       <Grid item>
                        <img
                        src={imageUrl}
                        width="40px"
                        height="40px"
                        style={{ borderRadius: "50px" ,padding:5}}
                        alt="personal"
                        />
                    </Grid>
                    <Grid item sm={10}>
                        <TextField
                        name='body'
                        type='text'
                        error={errors.error ?  true: false}  helperText={errors.error} value={this.state.body} onChange={this.handleChange} fullWidth className={classes.TextField}
                        style={{
                            backgroundColor: "#eee",
                            borderRadius: "50px",
                            padding: 5,
                            paddingLeft: 10,
                            border: "none",
                        }}
                        className={classes.margin}
                        id="input-with-icon-textfield"
                        placeholder="Write comment"
                        fullWidth
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                            <InputAdornment position="start">
       
                                <Button type="submit" color="inherit"   >
                                    <SendIcon color="primary" />
                                </Button>

                            </InputAdornment>
                            )
                        }}
                        />
                    </Grid>
                </form>
                {/* <hr className={classes.visibleSeparator} /> */}
            </Grid>
        ):null
        return commentFromMarkup ;
    }
}

CommentForm.propTypes = {
    submitComment : PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired

}

const mapStateToProps = (state) => ({
    UI : state.UI,
    authenticated: state.user.authenticated,
    user: state.user
})

export default connect(mapStateToProps,{submitComment})(withStyles(styles)(CommentForm)) 
