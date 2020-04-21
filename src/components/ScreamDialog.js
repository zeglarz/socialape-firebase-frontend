import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// Icons

import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';

//Redux stuff
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    invisibleSeparator: {
        border: 'none',
        margin: 4
    },
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
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle }, UI: { loading } } = this.props;
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
                </Grid>
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
