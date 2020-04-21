import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Redux stuff
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class User extends Component {
    componentDidMount() {
        console.log(this.props.match.params.handle);
        this.props.getUserData(this.props.match.params.handle);
    }

    render() {
        const { data: { user: { handle, imageUrl, createdAt, location, website, bio }, loading, screams } } = this.props;
        return (
            <div>
                username is {!loading && handle}
            </div>
        );
    }
}

User.propTypes = {};

const mapStateToProps = state => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
