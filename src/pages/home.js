import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
    state = {
        screams: null
    };

    componentDidMount() {
        fetch('/api/screams')
            .then(res => res.json())
            .then(res => {
                this.setState({
                    screams: res
                });

            })
            .catch(err => console.log(err));
    }

    render() {
        let recentScreamMarkup = this.state.screams ? (
            this.state.screams.map(scream => <p>{scream.body}</p>)
        ) : <p>Loading...</p>;
        return (
            <Grid container spacing={16}>
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
