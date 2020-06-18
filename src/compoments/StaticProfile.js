import React, { Component,Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom'

// MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton/IconButton'
import ToolTip from '@material-ui/core/Tooltip';
import EditDetials from './EditDetails'


//Icon
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';


const styles = (theme) => ({
    Paper: {
      padding: 20
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        
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
      }
    }
  
})


const StaticProfile = (props) => {
   const handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        console.log(formData)
        this.props.uploadImage(formData);
    }

    const handleEditPicture = () =>{
        const fileInput = document.getElementById('imageInput');
        fileInput.click()
    }

    const handleLogout = ()=>{
      this.props.logoutUser()
    }
    const {classes, profile: {handle, createdAt, imageUrl, bio, website, location}} = props
    return (
        <Paper className = {classes.Paper}>
        <div className={classes.profile}>
            <div className ='image-wrapper'>
                <img src={imageUrl} alt='profile' className='profile-image' />
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
         
           
        </div>
    </Paper>
    )

}

StaticProfile.propTypes = {
    profile : PropTypes.object.isRequired,
    classes : PropTypes.object.isRequired
}

export default withStyles(styles)(StaticProfile)
