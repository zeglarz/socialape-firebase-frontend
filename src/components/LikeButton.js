import React, { Component } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

// redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

class LikeButton extends Component {
    render() {
        const { user: { authenticated } } = this.props;
        const likeButton = !authenticated ? (
            <MyButton tip='Like'>
                <Link to='/login'>
                    <FavoriteBorder color='primary'/>
                </Link>
            </MyButton>
        ) : (this.likedScream() ?
                (
                    <MyButton tip='Unlike' onClick={this.unlikeScream}>
                        <Favorite on color='primary'/>
                    </MyButton>
                ) : (
                    <MyButton tip='Like' onClick={this.likeScream}>
                        <FavoriteBorder on color='primary'/>
                    </MyButton>
                )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    user: state.user
});
export default connect(mapStateToProps, { likeScream, unlikeScream })(LikeButton);
