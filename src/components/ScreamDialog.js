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

//Redux stuff
import { connect } from 'react-redux';
import { getScream } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    closeButton: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }
});

class PostScream extends Component {
    render() {
        return (
            <div>

            </div>
        );
    }
}

PostScream.propTypes = {
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

export default connect(mapStateToProps, { getScream })(withStyles(styles)(PostScream));
