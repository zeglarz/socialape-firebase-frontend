import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

// Redux stuff
import { connect } from 'react-redux';

class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className='nav-container'>
                    {authenticated ? (
                        <Button color='inherit' component={Link} to='/post'>Add post</Button>

                    ) : (
                        <>
                            <Button color='inherit' component={Link} to='/login'>Login</Button>
                            <Button color='inherit' component={Link} to='/'>Home</Button>
                            <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                        </>
                    )}

                </Toolbar>
            </AppBar>
        );
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
