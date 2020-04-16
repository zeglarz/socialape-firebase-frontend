import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI Stuff
import { Button, Paper, Typography } from '@material-ui/core/';
import MuiLink from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

// Redux stuff
import { connect } from 'react-redux';


const styles = theme => ({
    ...theme.spreadThis
});


class Profile extends Component {
    constructor() {
        super();
        this.state = {
            buttonShown: false
        };
    }

    handleImageChange = e => {
        const image = e.target.files[0];
        // send to server

    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper" onMouseEnter={() => this.setState({ buttonShown: true })}
                         onMouseLeave={() => this.setState({ buttonShown: false })}>
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                        {this.state.buttonShown && <IconButton onClick={this.handleEditPicture} className='button'>
                            <EditIcon color='primary'/>
                        </IconButton>}
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
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, please try again!
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='container' color='primary' component={Link} to='/login'>Login</Button>
                    <Button variant='container' color='secondary' component={Link} to='/signup'>Signup</Button>
                </div>
            </Paper>
        )) : (<p>Loading...</p>);
        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
