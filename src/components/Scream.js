import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../util/MyButton';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';

// Redux stuff
import { connect } from 'react-redux';
import { likeScream, unlikeScream, deleteScream } from '../redux/actions/dataActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    delete: {
        float: 'right'
    }
};

class Scream extends Component {
    state = {
        open: false
    };
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId)) {
            return true;
        } else {
            return false;
        }
    };
    likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    };
    unlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        dayjs.extend(relativeTime);
        const {
            classes,
            scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount },
            user: { authenticated, credentials: { handle } }
        } = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/login'>
                    <FavoriteBorder color='primary'/>
                </Link>
            </MyButton>
        ) : (this.likedScream() ?
                (
                    <MyButton tip='Unlike' onClick={this.unlikeScream}>
                        <Favorite on color='primary'/>
                    </MyButton>
                ) : (
                    <MyButton tip='Like' onClick={this.likeScream}>
                        <FavoriteBorder on color='primary'/>
                    </MyButton>
                )
        );

        const deleteButton = authenticated && userHandle === handle && (
            <MyButton tip='delete' onClick={this.handleOpen}> <DeleteIcon color='primary'
                                                                          className='delete'/></MyButton>);

        return (
            <Card className={classes.card}>
                <CardMedia
                    image={userImage}
                    title='Profile image'
                    className={classes.image}
                />
                <CardContent className={classes.content}>
                    <Typography variant='h5' component={Link} color='primary'
                                to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant='body2'
                                color='textSecondary'>{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                    {likeButton}
                    <span>{likeCount} likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                    {deleteButton}
                    <Dialog open={this.state.open}>
                        <DialogContent>
                            <p>Are you sure you want to delete this scream?</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} variant='contained' color='primary'>Cancel</Button>
                            <Button onClick={() => this.props.deleteScream(screamId)} variant='contained'
                                    color='secondary'>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </CardContent>
            </Card>
        );
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired

};
const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, { likeScream, unlikeScream, deleteScream })(withStyles(styles)(Scream));
