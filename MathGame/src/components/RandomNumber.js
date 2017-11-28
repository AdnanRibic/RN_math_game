import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

class RandomNumber extends React.Component {
    // What must be included 
    static propTypes = {
        number: PropTypes.number.isRequired,
        isDisabled: PropTypes.bool.isRequired,
        onPress: PropTypes.func.isRequired,
        id: PropTypes.number.isRequired,
    };
    handlePress = () => {
        // If number button is disabled you can not click on it
        if (this.props.isDisabled) { return; }
        // If number button is selected call function onPress and pass it id of that number
        this.props.onPress(this.props.id)
    }
    render() {
        return (
            // On touch call handlePress function
            <TouchableOpacity onPress={this.handlePress}>
            <Text style={[styles.randomText, this.props.isDisabled && styles.disabled]}>{this.props.number}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
// Stylesheet options for random numbers
randomText: {
        fontSize: 40,
        color: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        height: 60,
        width: 160,
        textAlign: 'center',
        borderWidth: 2,
        backgroundColor: '#06AED5',
        borderRadius: 20, 
        borderColor: 'white',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    disabled: {
        opacity: 0.3,
    },

});

export default RandomNumber;