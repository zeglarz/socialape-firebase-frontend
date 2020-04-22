import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scream from '../components/scream/Scream';
import Grid from '@material-ui/core/Grid';
import StaticProfile from '../components/profile/StaticProfile';
import axios from 'axios';
// Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import Profile from '../components/profile/Profile';

class User extends Component {
    state = {
        user: {}
    };

    componentDidMount() {
        const { handle } = this.props.match.params;
        this.props.getUserData(handle);
        axios.get(`/api/user/${handle}`)
            .then(res => {
                this.setState({ user: res.data.user });
            });
    }

    render() {
        const screamsMarkup = !this.props.data.loading ? (
            this.props.data.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : <p>Loading...</p>;

        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {!this.props.data.loading ? (<StaticProfile profile={this.state.user}/>) : (<p>Loading...</p>)}
                </Grid>
            </Grid>
        );
    }
}

User.propTypes = {
    getUserData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
