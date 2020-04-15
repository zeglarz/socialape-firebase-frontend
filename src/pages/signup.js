import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/ape.png';
import { Link } from 'react-router-dom';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = theme => ({
    ...theme.spreadThis
});


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        };
    }

    resetErrors = () => setTimeout(() => {
        this.setState({ errors: {} });
    }, 2000);

    handleSubmit = e => {
        e.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history);
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    componentWillReceiveProps(prevProps) {
        if (prevProps.UI.errors) {
            this.setState({
                errors: prevProps.UI.errors
            });
            this.resetErrors();
        }
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='monkey' className={classes.image}/>
                    <Typography variant='h2' className={classes.pageTitle}>Sign Up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='handle' name='handle' type='text' label='Handle' className={classes.textField}
                                   value={this.state.handle} onChange={this.handleChange}
                                   helperText={errors.handle} error={!!errors.handle} fullWidth/>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                                   value={this.state.email} onChange={this.handleChange}
                                   helperText={errors.email} error={!!errors.email} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password'
                                   className={classes.textField}
                                   value={this.state.password} onChange={this.handleChange} helperText={errors.password}
                                   error={!!errors.password} fullWidth/>
                        <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password'
                                   className={classes.textField}
                                   value={this.state.confirmPassword} onChange={this.handleChange}
                                   helperText={errors.confirmPassword}
                                   error={!!errors.confirmPassword} fullWidth/>
                        <Button type='submit' variant={'contained'} color={'primary'} disabled={loading}
                                className={classes.button}>{loading ?
                            <CircularProgress size={'1.5rem'}/> : 'Sign up'}</Button>
                        <small className={classes.small}>Already have an account? <Link to={'/login'}>Sign
                            in</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(Signup));
