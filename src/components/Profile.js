import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../util/MyButton';
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
import { uploadImage, logoutUser } from '../redux/actions/userActions';


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
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    handleLogout = () => {
        this.props.logoutUser();
    };

    render() {
        const {
            classes,
            user: {
                credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            },
            UI: { errors }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper" onMouseEnter={() => this.setState({ buttonShown: true })}
                         onMouseLeave={() => this.setState({ buttonShown: false })}>
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id='imageInput' hidden='hidden' onChange={this.handleImageChange}/>
                        {this.state.buttonShown && <MyButton tip='Upload new picture' placement='top'
                                                             onClick={this.handleEditPicture} className='button'>
                            <EditIcon color='primary'/>
                        </MyButton>}
                    </div>
                    <hr/>
                    <div>{errors.error}</div>
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
                    <MyButton tip='Logout' placement='top'
                              onClick={this.handleLogout}> <KeyboardReturn color='primary'/></MyButton>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant='body2' align='center'>
                    No profile found, please try again!
                </Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='primary' component={Link} to='/login'>Login</Button>
                    <Button variant='contained' color='secondary' component={Link} to='/signup'>Signup</Button>
                </div>
            </Paper>
        )) : (<p>Loading...</p>);
        return profileMarkup;
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { uploadImage, logoutUser })(withStyles(styles)(Profile));
