import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
// redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId)) {
            return true;
        } else {
            return false;
        }
    };
    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    };
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    };

    render() {
        const { authenticated } = this.props.user;
        return !authenticated ? (
            <Link to='/login'>
                <MyButton tip='Like'>
                    <FavoriteBorder color='primary'/>
                </MyButton>
            </Link>

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
