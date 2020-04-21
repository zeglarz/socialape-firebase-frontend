import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    ...theme.spreadThis
});

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments && comments.map(comment => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                </Grid>
                                <Grid item sm={9}>
                                    <div className={classes.commentData}>
                                        <Typography variant='h5' component={Link} to={`/users/${userHandle}`}
                                                    color='primary'>
                                            {userHandle}
                                        </Typography>
                                        <Typography variant='body2' componet={Link} to={`/users/${userHandle}`}
                                                    color='textSecondary'>
                                            {dayjs(createdAt).format('h:mm a, DD MMMM YYYY')}
                                        </Typography>
                                        <Typography variant='body1' componet={Link} to={`/users/${userHandle}`}
                                                    color='textSecondary'>
                                            {body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Fragment>
                    );
                })}
            </Grid>
        );
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};
export default withStyles(styles)(Comments);
