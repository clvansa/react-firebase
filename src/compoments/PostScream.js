import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton/IconButton'
import ToolTip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';




import { connect } from 'react-redux';
import {postScream,clearErrors,postScreamText} from '../redux/actions/dataActions';


const styles = {
    
    closeBtn:{
        position:'absolute',
        left:'91%',
        top:'6%'
    },
    submitBtn:{
        position:'relative',
        margin :'20px 0'
    },
    progressSpinner:{
        position:'absolute'
    }
}
const formData = new FormData();

const handleImageChange = (event) => {
    const image = event.target.files[0];
    formData.append('image', image, image.name);
    return formData
    
}

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };

    componentWillReceiveProps (nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body:'', open:false, errors:{} })
            
        }
    }
    handleOpen = () => {
        this.setState({open:true})
    }

    handleClose = () => {
        this.props.clearErrors()
        this.setState({open:false, errors:{}})
    }
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        if(document.getElementById('imageInput1').files.length === 0){
            this.props.postScreamText({body:this.state.body})
        }else {
            this.props.postScream({body:this.state.body},formData)
        }
        
    }
    

    handleEditPicture = () =>{
        const fileInput = document.getElementById('imageInput1');
        fileInput.click()
    }

    render() {
        const { errors } = this.state;
        const { classes , UI :{loading}} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip='Post a scream!'>
                    <AddIcon color='primary' />
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeBtn}>
                        <CloseIcon color='primary' />
                    </MyButton>
                    <DialogTitle>Post a new Post</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit} >
                            <TextField name='body' type='text' label='Post !' multiline rows='3' placeholder={`What in your mind ${this.props.user}`} error={errors.body ? true : false} helperText={errors.body} className={classes.TextField} onChange={this.handleChange} fullWidth></TextField>
                            <div className ='image-wrapper'>
                                {/* <img src={imageUrl} alt='profile' className='profile-image' /> */}
                                <input type='file' id='imageInput1' onChange={handleImageChange}></input>
                                <ToolTip title='Edit profile picture' placement='top' >
                                    <IconButton onClick={this.handleEditPicture} className='buttons'>
                                        <EditIcon color='primary' />
                                    </IconButton>
                                </ToolTip>
                            </div>
                            <Button type='submit' variant='contained' color='primary' className={classes.submitBtn} disabled={loading} >
                                Submit 
                                {loading && (
                                    <CircularProgress size={30} className={classes.progressSpinner} />
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes ={
    postScream: PropTypes.func.isRequired,
    classes : PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired,
    postScreamText:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    UI : state.UI,
    data:state.data
})

export default connect(mapStateToProps, { postScream,clearErrors,postScreamText })(withStyles(styles)(PostScream))
