import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class RandomNumber extends React.Component {
    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
    };
    handlePress = () => {
        if (this.props.isDisabled) { return; }
        this.props.onPress(this.props.id)
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.randomText, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
randomText: {
        fontSize: 40,
        color: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        height: 60,
        width: 160,
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 20, 
        borderColor: 'white',
        justifyContent: 'center',
    },
    disabled: {
        opacity: 0.3,
    },

});

export default RandomNumber;