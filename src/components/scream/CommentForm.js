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

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.submitComment(this.props.screamId, { body: this.state.body });
        this.setState({ body: '' });
    };

    render() {
        const { classes, UI: { errors }, authenticated } = this.props;
        return authenticated && (
            <Grid item sm={12} style={{ textAlign: 'center' }}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name='body'
                        type='text'
                        label='Comment on scream'
                        error={errors.hasOwnProperty('comment')}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button type='submit' varian='contained' color='primary' className={classes.button}>Submit</Button>
                    <hr className={classes.visibleSeparator}/>
                </form>
            </Grid>
        );
    }
}

CommentForm.propTypes = {
    UI: PropTypes.object.isRequired,
    submitComment: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    UI: state.UI,
    authenticated: state.user.authenticated
});
export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm));
