import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/ape.png';
// MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

    handleSubmit = e => {
        console.log('submitted');
    };
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt='monkey' className={classes.image}/>
                    <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                                   value={this.state.email} onChange={this.handleChange} fullWidth/>
                        <TextField id='password' name='password' type='password' label='Password'
                                   className={classes.textField}
                                   value={this.state.password} onChange={this.handleChange} fullWidth/>
                        <Button type='submit' variant={'contained'} color={'primary'}
                                className={classes.button}>Login</Button>
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
