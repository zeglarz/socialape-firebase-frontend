import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Redux stuff
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

const styles = theme => ({
    ...theme.spreadThis
});

class CommentForm extends Component {
    state = {
        body: ''
    };

    render() {
        return (
            <div>

            </div>
        );
    }
}

CommentForm.propTypes = {
    UI: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
};
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
