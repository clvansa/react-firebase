import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import DeleteComment from './DeleteComment'



// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typograph from '@material-ui/core/Typography';

//Redux 
import { connect } from 'react-redux';

const styles = (theme) => ({
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
    visibleSeparator :{
        width: '100%',
        boderBottom: '1px solid rbga(0,0,0,0.1)',
        marginBottom: 20
    },
    containerComment:{
        backgroundColor : '#f0f2f5',
        borderRadius:'10px',
        padding:'20px'
    },
    containerImage:{
        display:'flex',
        justifyContent:'center',
        marginTop:5,
    },
    commentImage:{
        width:'50px',
        height:'50px',
        borderRadius:'50%',
        objectFit:'cover'
    },
    deleteButton:{
        position:'absoulte',
        right:0,
        top:0
    }
});


class Comments extends Component {

    render(){
        const {comments, classes, 
            user : {
            authenticated, 
            credentials : {handle}} } = this.props;
        return (
            <Grid container >
                {comments.map((comment, index) => {
                    const  {body, createdAt, userImage, userHandle,commentId,screamId} =  comment;
                    const deleteButton = authenticated && userHandle === handle ?(
                        <DeleteComment commentId={commentId} key={comment.commentId}  />
                        ) : null
                    
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container >
                                    <Grid item sm={2} spacing={10} className={classes.containerImage}>
                                        <img src={userImage} alt='comment' className={classes.commentImage} />
                                    </Grid>
                                    <Grid item sm={10} className={classes.containerComment} style={{position:'relative'}}>
                                        <div className={classes.commentData}>
                                            <Typograph variant='body1' component={Link} to={`/users/${userHandle}`} color='primary'>{userHandle}</Typograph>
                                            <Typograph variant='body2'  color='textSecondary' style={{fontSize:12}}>
                                                {dayjs(createdAt).format('h:mm a, MM DD YYYY')}
                                            </Typograph>
                                            {deleteButton}     
                                            <hr className={classes.invisibleSeparator} />
                                          
                                            <Typograph variant='body1' > {body}</Typograph>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}

                        </Fragment>
                    )
                })}
            </Grid>
        )
    }

}

Comments.propTypes = {
    comments : PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    user : state.user
})

export default connect(mapStateToProps,null)(withStyles(styles)(Comments))