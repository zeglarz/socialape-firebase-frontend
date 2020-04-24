import React, { Component } from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';

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
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 7,
        marginTop: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 14
    },
    fullLine: {
        width: '100%',
        height: 17,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 7
    },
    halfLine: {
        width: '30%',
        marginTop: 10,
        marginLeft: 15,
        height: 20,
        backgroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 15
    }
});


const ScreamSceleton = ({ classes }) => {
    const content = Array.from({ length: 5 }).map((_, index) => (
        <Card className={classes.card} key={index}>
            <CardMedia className={classes.cover} image={NoImg}/>
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}></div>
                <div className={classes.date}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
                <div className={classes.halfLine}></div>
            </CardContent>
        </Card>
    ));
    return (
        <>
            {content}
        </>
    );
};

ScreamSceleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSceleton);
