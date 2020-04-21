import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// Mui stuff
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MyButton from '../util/MyButton';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// Redux Stuff
import { connect } from 'react-redux';
import { postScream } from '../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis,
    closeButton: {
        position: 'absolute',
        top: '5px',
        right: '5px'
    }
});

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    handleOpen = () => {
        this.setState({
            open: true,
            body: ''
        });
    };
    handleClose = () => {
        this.setState({
            open: false
        });
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const newScream = {
            body: this.state.body
        };
        this.props.postScream(newScream);
        if (!this.props.errors) {
            this.handleClose();
        }
    };

    render() {
        const { classes, UI: { errors, loading } } = this.props;
        return (
            <>
                <MyButton onClick={this.handleOpen} tip='Post a Scream!'>
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} close={this.handleClose} fullWidth maxWidth='sm'>
                    <MyButton tip='Close' onClick={this.handleClose}
                              tipClassName={classes.closeButton}><CloseIcon/></MyButton>
                    <DialogTitle>Post a new Scream</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name='body'
                                type='text'
                                label='SCREAM !!!'
                                multiline
                                rows='3'
                                placeholder='Scream at your fellow apes!'
                                error={errors.hasOwnProperty('body')}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                            />
                            <DialogActions><Button type='submit' variant='contained' color='primary'
                                                   className={classes.submitButton}
                                                   disabled={loading}>
                                {!loading ? 'Submit' :
                                    <CircularProgress size={30} className={classes.progressSpinner}/>}
                            </Button></DialogActions>

                        </form>
                    </DialogContent>
                </Dialog>
            </>
        );
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    UI: state.UI,
    errors: state.UI.errors
});

export default connect(mapStateToProps, { postScream })(withStyles(styles)(PostScream));
