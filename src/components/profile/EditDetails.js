import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Redux Stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

// Mui stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MyButton from '../../util/MyButton';
// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
    ...theme.spreadThis,
    button: {
        float: 'right'
    }

});

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    };
    mapUserDetailsToState = ({ bio, website, location }) => {
        this.setState({
            bio: bio ? bio : '',
            website: website ? website : '',
            location: location ? location : ''
        });
    };

    handleOpen = () => {
        this.setState({ open: true });
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = () => {
        const { bio, location, website } = this.state;
        const userDetails = {
            bio,
            location,
            website
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
    };

    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }


    render() {
        const { classes } = this.props;

        return (
            <>
                <MyButton tip='Edit details' placement='top' onClick={this.handleOpen} btnClassName={classes.button}>
                    <EditIcon color='primary'/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField name='bio' type='text' label='Bio' rows='3 ' multiline
                                       placeholder='Short bio about yourself' className={classes.textField}
                                       value={this.state.bio} onChange={this.handleChange} fullWidth/>
                            <TextField name='location' type='text' label='Location'
                                       placeholder='Your location' className={classes.textField}
                                       value={this.state.location} onChange={this.handleChange} fullWidth/>
                            <TextField name='website' type='text' label='Website'
                                       placeholder='Your website or blog page' className={classes.textField}
                                       value={this.state.website} onChange={this.handleChange} fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} variant='contained' color='secondary'>Cancel</Button>
                        <Button onClick={this.handleSubmit} variant='contained' color='primary'>Save</Button>
                    </DialogActions>
                </Dialog>
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
