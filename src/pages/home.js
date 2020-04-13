import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';
import PropTypes from 'prop-types';

class Home extends Component {
    state = {
        screams: null
    };

    componentDidMount() {
        fetch('/api/screams')
            .then(res => res.json())
            .then(screams => {
                this.setState({
                    screams
                });

            })
            .catch(err => console.log(err));
    }

    render() {
        let recentScreamMarkup = this.state.screams ? (
            this.state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : <p>Loading...</p>;
        return (
            <Grid container spacing={6}>
                <Grid item sm={8} xs={12}>
                    {recentScreamMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        );
    }
}

Home.propTypes = {};
export default Home;
