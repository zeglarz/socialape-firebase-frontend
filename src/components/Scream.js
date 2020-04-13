import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
// MUI stuff
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = {
    card: {
        display: 'flex'
    }
};

class Scream extends Component {
    render() {
        const { classes, scream: { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount } } = this.props;
        return (
            <Card>
                <CardMedia
                    image={userImage && userImage.split('?')[0]}
                    title='Profile image'/>
                <CardContent>
                    <Typography variant='h5' component={Link} color='primary'
                                to={`/users/${userHandle}`}>{userHandle}</Typography>
                    <Typography variant='body2'
                                color='textSecondary'>{new Date(createdAt).toLocaleString('en-GB')}</Typography>
                    <Typography variant='body1'>{body}</Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(Scream);
