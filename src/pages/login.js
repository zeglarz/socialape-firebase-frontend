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
import { loginUser } from '../redux/actions/userActions';

const styles = theme => ({
    ...theme.spreadThis
});


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);

    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { classes, UI: { loading, errors } } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='monkey' className={classes.image}/>
                    <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                                   value={this.state.email} onChange={this.handleChange}
                                   helperText={errors.email}
                                   error={!!errors.email} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password'
                                   className={classes.textField}
                                   value={this.state.password} onChange={this.handleChange}
                                   helperText={errors.password}
                                   error={!!errors.password} fullWidth/>
                        {errors.error &&
                        <Typography variant={'body2'}
                                    className={classes.customError}>{errors.error}</Typography>}
                        <Button type='submit' variant={'contained'} color={'primary'} disabled={loading}
                                className={classes.button}>{loading ?
                            <CircularProgress size={'1.5rem'}/> : 'Login'}</Button>
                        <small className={classes.small}>Don't have an account? <Link to={'/signup'}>Sign
                            up</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>;
            </Grid>
        )
            ;
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToPros = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToPros)(withStyles(styles)(Login));
