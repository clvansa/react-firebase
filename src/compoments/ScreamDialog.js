import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import MyButton from '../util/MyButton';
import PropTypes from 'prop-types';
import  { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm'

// MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from "@material-ui/core/Collapse";



//Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';


//Redux Stuff
import { connect } from 'react-redux';
import {getScream,clearErrors} from '../redux/actions/dataActions'

const styles = (theme) =>({
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator :{
        width: '100%',
        boderBottom: '1px solid rbga(0,0,0,0.1)',
        margin: 0
    },
    profileContainer : {
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    profileImage: {
        width:100,
        height:100,
        borderRadius:'50%',
        objectFit :'cover',
    }, 
    dialogContent : {
        padding: 20,
    },
    closeBtn: {
        position:'absolute',
        left:'90%'
    },
    content:{
        display:'flex',
        justifyContent:'center',
        alignItems:'flex-start',
        flexDirection:'column'
    },
    expendButton: {
        position:'absolute',
        left:'88%'
    },
    spinnerDiv: {
        textAlign:'center',
        marginTop:50,
    
    },
    media: {
        height:0,
        paddingTop: "56.25%"
    }
})


 class ScreamDialog extends Component {
    state = {
         open: false,

    }
    handleOpen = () => {
        this.setState({open: true});
        this.props.getScream(this.props.screamId)
    }
    handleClose = () => {
        this.setState({open: false});
        this.props.clearErrors()
    }

    handleChange = () => {
        this.setState({checked :true});
    };

   

    render() {
        const { classes, 
            scream:  {screamId, body, createdAt, likeCount, commentCount, userImage, userHandle,comments,screamImage},
            UI:{loading}} = this.props;
            
            const dialogMarkup = loading ? (
                <div className={classes.spinnerDiv} >
                    <CircularProgress size={100} />
                </div>
            ) : (
                <Grid container spacing={2}>
                    <Grid item sm={3}  className={classes.profileContainer}>
                        <img src={userImage} alt='Profile' className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={9} className={classes.content} >
                        <Typography component={Link} color='primary' variant='h5' to={`/users/${userHandle}`}>{userHandle}</Typography>
                        <Typography variant='body2' color='textSecondary' >{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}</Typography>

                        <hr className={classes.invisibleSeparator} />
                                        
                    </Grid>
                    <hr className={classes.invisibleSeparator} />
                    <Grid item sm={12} style={{minHeight:100,padding:20}}>
                    {screamImage  ?(
                  <CardMedia
                    className={classes.media}
                    image={screamImage}
                    title="Paella dish"
                            />
                        ):(
                            null
                        )}

                    <Typography variant='body1' style={{padding:'30px 0'}}>{body}</Typography>

                    </Grid>
                    <hr className={classes.visibleSeparator} />
                    <Grid item sm={12} style={{display:'flex',justifyContent:'space-evenly'}}>
                        <Grid>
                            <LikeButton screamId={screamId} />
                            <span>{likeCount}</span>
                        </Grid>
                        <Grid>
                            <MyButton tip='comments' >
                            <ChatIcon color='primary' />
                            </MyButton>
                            <span>{commentCount} comments</span>
                        </Grid>
                    </Grid>
                        <hr className={classes.visibleSeparator} />
                        <CommentForm screamId={screamId} />
                        <Comments comments={comments} />
                </Grid>
            )
        return (
              <Fragment>
                  <MyButton onClick={this.handleOpen} tip='Expend Post' tipClassName={classes.expendButton}>
                    <UnfoldMore color='primary'></UnfoldMore>
                  </MyButton>
                  <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose} tipClassName={classes.closeBtn}>
                        <CloseIcon color='primary' />
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>

                  </Dialog>
              </Fragment>
        )
    }
}


ScreamDialog.propTypes = {
    getScream : PropTypes.func.isRequired,
    screamId : PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream : PropTypes.object.isRequired,
    UI : PropTypes.object.isRequired,
    clearErrors :PropTypes.func.isRequired

}
 

const mapStateToProps = (state) =>({
    scream : state.data.scream,
    UI: state.UI
});

const actionToProps = {getScream, clearErrors}
export default connect(mapStateToProps,actionToProps)(withStyles(styles)(ScreamDialog))
