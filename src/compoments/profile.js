import React, { Component, Fragment } from 'react';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetials from './EditDetails'

//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper/Paper'
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton/IconButton'
import ToolTip from '@material-ui/core/Tooltip';

//MUI Icon stuff
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn'

import {connect} from 'react-redux';
import {logoutUser, uploadImage} from '../redux/actions/userActions';


const styles = (theme) => ({
        Paper: {
          padding: 20
        },
        profile: {
          '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
              position: 'absolute',
              top: '80%',
              left: '70%'
            }
          },
          '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
          },
          '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
              verticalAlign: 'middle'
            },
            '& a': {
              color: theme.palette.primary.main
            }
          },
          '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
          },
          '& svg.button': {
            '&:hover': {
              cursor: 'pointer'
            }
          }
        },
        buttons: {
          textAlign: 'center',
          '& a': {
            margin: '20px 10px'
          }
        }
      
})

export class profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        console.log(formData)
        this.props.uploadImage(formData);
    }

    handleEditPicture = () =>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    handleLogout = ()=>{
      this.props.logoutUser()
    }
    render() {
        const {classes, user : 
            {credentials :{handle, createdAt, imageUrl, bio, website, location},
            loading,authenticated}} 
         = this.props

         let profileMarkUp = !loading ? (authenticated ? (
             <Paper className = {classes.Paper}>
                 <div className={classes.profile}>
                     <div className ='image-wrapper'>
                         <img src={imageUrl} alt='profile' className='profile-image' />
                         <input type='file' id='imageInput' onChange={this.handleImageChange} hidden='hidden'></input>
                        <ToolTip title='Edit profile picture' placement='top' >
                            <IconButton onClick={this.handleEditPicture} className='buttons'>
                                <EditIcon color='primary' />
                            </IconButton>
                        </ToolTip>
                     </div>
                     <hr />
                     <div className='profile-details'>
                         <MuiLink component={Link} to ={`/users/${handle}`} color='primary' variant='h5'>@{handle}</MuiLink>
                         <hr />
                         {bio && <Typography variant='body2'>{bio}</Typography>}
                         <hr />
                         {location && (
                             <Fragment>
                                  <LocationOn color='primary' /><span>{location}</span>
                                  <hr />
                             </Fragment> 
                         )}
                         <hr />
                         {website && (
                             <Fragment>
                                 <LinkIcon color='primary' />
                         <a href={website} target='_blank' rel='noopener noreferrer'>{' '}{website}</a>
                             </Fragment>
                         )}
                         <hr />
                         <CalendarToday color='primary' />{' '}
                         <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                     </div>
                     <ToolTip title='Logout' placement='top'>
                       <IconButton onClick={this.handleLogout}>
                         <KeyboardReturn color='primary' />
                       </IconButton>
                     </ToolTip>
                     <EditDetials></EditDetials>
                 </div>
             </Paper>
         ):(
             <Paper className={classes.Paper}>
                 <Typography variant='body2' align='center' >No profile found, please login again</Typography>
                 <div className={classes.buttons}>
                     <Button variant='contained' color='primary' component={Link} to='./login'>Login</Button>
                     <Button variant='contained' color='secondary' component={Link} to='./signup'>Singup</Button>
                 </div>
             </Paper>
         )) : (<p>Loading</p>)
        return (profileMarkUp)
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionToProps = {logoutUser, uploadImage}
profile.propTypes ={
    user: propTypes.object.isRequired,
    classes : propTypes.object.isRequired,
    logoutUser : propTypes.func.isRequired,
    uploadImage: propTypes.func.isRequired
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(profile))


