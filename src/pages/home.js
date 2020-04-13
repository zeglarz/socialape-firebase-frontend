import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../components/Scream';

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
            this.state.screams.map((scream, i) => <Scream key={i} scream={scream}/>)
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

export default Home;
