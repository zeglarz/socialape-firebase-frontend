import React, { Component } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';

// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    ...theme.spreadThis,
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 20,
        marginBottom: 7,
        marginTop: 7,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    date: {
        height: 14,
        width: 100,
        marginBottom: 14,
        backgroundColor: 'rgba(0,0,0,0.3)'

    },
    fullLine: {
        width: '100%',
        height: 17,
        marginBottom: 7,
        backgroundColor: 'rgba(0,0,0,0.3)'

    },
    halfLine: {
        width: '30%',
        marginTop: 10,
        marginLeft: 15,
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 7
    },
    profileCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
        marginTop: 15
    },
    profileHandle: {
        width: 150,
        height: 40,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    profileItemLong: {
        margin: 5,
        height: 20,
        width: 200
    },
    profileItemShort: {
        margin: 0,
        height: 20,
        width: 150
    }

});


const ScreamSceleton = ({ classes, contentSceleton }) => {
    const content = Array.from({ length: 5 }).map((_, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <Skeleton className={classes.handle}/>
                <Skeleton className={classes.date}/>
                <Skeleton className={classes.fullLine}/>
                <Skeleton className={classes.fullLine}/>
                <Skeleton className={classes.halfLine}/>
            </CardContent>
        </Card>
    ));
    const profile = (
        <Card className={classes.profileCard}>
            <CardMedia className={classes.profileImage} image={NoImg}/>
            <CardContent className={classes.profileContent}>
                <Skeleton className={classes.profileHandle}/>
                <Skeleton className={classes.profileItemLong}/>
                <Skeleton className={classes.profileItemShort}/>
                <Skeleton className={classes.profileItemLong}/>
                <Skeleton className={classes.profileItemShort}/>
            </CardContent>
        </Card>
    );
    return (
        <>
            {contentSceleton ? content : profile}
        </>
    );
};

ScreamSceleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSceleton);
