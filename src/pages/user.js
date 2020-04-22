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
        user: {},
        screamIdParam: null
    };

    componentDidMount() {
        const { handle, screamId } = this.props.match.params;

        if (screamId) this.setState({ screamIdParam: screamId });
        this.props.getUserData(handle);
        axios.get(`/api/user/${handle}`)
            .then(res => {
                this.setState({ user: res.data.user });
            });
    }

    render() {
        const { loading, screams } = this.props.data;
        const { screamIdParam, user } = this.state;
        const screamsMarkup = !loading ? (
            screams.length === 0 ? (<p>No screams yet</p>) : screamIdParam ? (
                screams.map(scream => {
                    if (scream.screamId !== screamIdParam) {
                        return <Scream key={scream.screamId} scream={scream}/>;
                    } else return <Scream key={scream.screamId} scream={scream} openDialog/>;
                })
            ) : (screams.map(scream => {
                    return <Scream
                        key={scream.screamId} scream={scream}/>;
                }
            ))
        ) : <p>Loading...</p>;

        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {!loading ? (<StaticProfile profile={user}/>) : (<p>Loading...</p>)}
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
