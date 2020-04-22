import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../util/MyButton';
// MUI Stuff
import { Button, Paper, Typography } from '@material-ui/core/';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux stuff
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../../redux/actions/userActions';


const styles = theme => ({
    ...theme.spreadThis
});


class StaticProfile extends Component {


    render() {
        const {
            classes,
            profile: {
                handle, createdAt, imageUrl, bio, website, location
            }
        } = this.props;
        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} colors='primary' variant='h5'>
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant='body2'>{bio}</Typography>}
                        <hr/>
                        {location && (
                            <>
                                <LocationOn color='primary'/> <span>{location}</span>
                                <hr/>
                            </>
                        )}
                        {website && (
                            <>
                                <LinkIcon color='primary'/>
                                <a href={website} target='_blank' rel='noopener noreferrer'>{' '}{website}</a>
                                <hr/>
                            </>
                        )}
                        <>
                            <CalendarToday color='primary'/>{' '}
                            <span>Joined since {dayjs(createdAt).format('MMM YYYY')}</span>
                        </>
                    </div>
                </div>
            </Paper>
        );
    }
}


StaticProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

};


export default withStyles(styles)(StaticProfile);
