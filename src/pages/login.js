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

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto'
    },
    pageTitle: {
        margin: '10px auto'
    },
    textField: {
        margin: '15px auto'
    },
    button: {
        margin: '20px auto'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        margin: '5px auto'
    },
    small: {
        display: 'block',
        margin: '10px auto'
    }
};


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        };
    }

    resetErrors = () => setTimeout(() => {
        this.setState({ errors: {} });
    }, 2000);

    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    loading: false
                });
                if (data.token) {
                    this.props.history.push('/');
                } else {
                    throw data;
                }
            })
            .catch(err => {
                this.setState({
                    errors: err,
                    loading: false
                });

            });
        this.resetErrors();
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };


    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='monkey' className={classes.image}/>
                    <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                                   value={this.state.email} onChange={this.handleChange}
                                   helperText={errors.email} error={!!errors.email} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password'
                                   className={classes.textField}
                                   value={this.state.password} onChange={this.handleChange} helperText={errors.password}
                                   error={!!errors.password} fullWidth/>
                        {errors.error &&
                        <Typography variant={'body2'}
                                    className={classes.customError}>{errors.error}</Typography>}
                        <Button type='submit' variant={'contained'} color={'primary'} disabled={loading}
                                className={classes.button}>{this.state.loading ?
                            <CircularProgress size={'1.5rem'}/> : 'Login'}</Button>
                        <small className={classes.small}>Don't have an account? <Link to={'/signup'}>Sign
                            up</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(Login);
