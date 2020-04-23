import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Icons

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

//Redux stuff
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';
import ChatIcon from '@material-ui/icons/Chat';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    ...theme.spreadThis,

    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    expandButton: {
        position: 'absolute',
        right: 20
    }

});

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };

    componentDidMount() {
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;
        console.log(this.props);
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath });
        this.props.getScream(this.props.screamId);
    };
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);

        this.setState({ open: false });
    };

    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, UI: { loading } } = this.props;
        const dialogMarkup = loading ? (
            <CircularProgress size={200} thickness={2}/>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color='primary'
                        variant='h5'
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body2' color='textSecondary'>
                        {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator}/>
                    <Typography variant='body1'>{body}</Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color='primary'/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        );
        return (
            <>
                <MyButton
                    onClick={this.handleOpen}
                    tip="Expand scream"
                    tipClassName={classes.expandButton}
                >
                    <UnfoldMore color="primary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <MyButton
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

export default connect(mapStateToProps, { getScream })(withStyles(styles)(ScreamDialog));
