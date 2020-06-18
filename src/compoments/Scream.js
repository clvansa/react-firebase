import React, { Component, Fragment } from 'react';
import  { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import realativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../util/MyButton';
import DeleteScream from '../compoments/DeleteScream'
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
import Chat from './ChatDetails'


//Mui staff
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { connect } from 'react-redux';



import CardHeader from "@material-ui/core/CardHeader";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';




const styles = {
    card : {
        position:'relative',
        display :'flex',
        marginBottom:20,
        maxWidth: 545,
        flexDirection:'column',
      
    },
    image: {
        minWidth :200,
        objectFit :'cover'
        
    },
    content: {
        padding: 25,
        objectFit :'cover'
    },
    media: {
        height:0,
        paddingTop: "56.25%"
    }
  
}



 class Scream extends Component {
    state = ({
        anchorEl:null
    })


    handleClick = (event) => {
        this.setState({anchorEl: event.currentTarget});
    };
    
    handleClose = () => {
        this.setState({anchorEl:null});
    };

  


    render() {
        dayjs.extend(realativeTime)
        const {classes,scream : {
            body,createdAt,userImage,userHandle,screamId,likeCount,commentCount,screamImage
        },
        user: {
            authenticated, credentials : {handle}
        }

        } =  this.props;
     
        const deleteButton = authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
        ) : null

        const chat = <Chat userHandle={userHandle} />

           

        return (
            // <Card className={classes.card}>
            //     <CardMedia image={userImage} title={'profile image'} className={classes.image}></CardMedia>
            //     <CardContent className={classes.content}>
            //         <Typography variant='h5' color='primary' component={Link} to={`users/${userHandle}`}>{userHandle}</Typography>
            //         {deleteButton}
            //         <Typography variant='body2' color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
            //         <Typography variant='body1' color='textSecondary'>{body}</Typography>
            //         {likeButton}
            //         <span>{likeCount}</span>
            //         <MyButton tip='comments' >
            //             <ChatIcon color='primary' />
            //         </MyButton>
            //         <span>{commentCount} comments</span>
            //     </CardContent>
            // </Card>
           
                
             <Card className={classes.card}>
             <CardHeader
               avatar={
                 <Avatar src={userImage} />
               }
               
               action={  
                <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
                  <MoreVertIcon  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleClose}
                >
                   
                  <MenuItem className={classes.menuItem}> {deleteButton} </MenuItem>
                  <Link to={`/chat/${userHandle}`}  >
                  <MenuItem onClick={this.handleClose}>chat</MenuItem></Link>
                  <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            
            
         
               }
            
               
               title={<Typography variant='body1' color='primary' component={Link} to={`users/${userHandle}`}>{userHandle}</Typography>} 
               subheader={dayjs(createdAt).fromNow()}
             />

             {screamImage  ?(
                  <CardMedia
                  className={classes.media}
                  image={screamImage}
                  title="Paella dish"
                />
             ):(
                null
             )}
            
             <CardContent className={classes.content}>
               <Typography variant="h6"  component="p">
               {body}
               </Typography>
             </CardContent>
               <CardActions>

               <LikeButton screamId={screamId} />
                 <span>{likeCount}</span>
                   <MyButton tip='comments' >
                       <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} />
               </CardActions>
           </Card>
           


        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

}
const mapStateToProps = (state) =>({
    user : state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Scream))
