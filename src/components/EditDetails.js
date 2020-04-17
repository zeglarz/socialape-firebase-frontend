import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux Stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

// Mui stuff
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/icons/IconButton';

// Icons
import EditIcon from '@material-ui/icons/iconsEdit';

const styles = theme => ({
    ...theme.spreadThis
});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };

    componentDidMount() {
        const { credentials: { bio, website, location } } = this.props;
        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : ''

        });
    }

    render() {
        return (
            <>
                <Tooltip title='Edit details' placement='top'></Tooltip>
            </>
        );
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
