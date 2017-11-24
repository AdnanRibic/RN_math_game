import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    };
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
                         .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount -2)
        .reduce((acc, curr) => acc + curr, 0);

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState((prevState) => {
                return { remainingSeconds: prevState.remainingSeconds - 1 };
            }, () => {
                if (this.state.remainingSeconds === 0) {
                    clearInterval(this.intervalId);
                }
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    isNumberSelected = (numberIndex) => {
        return this.state.selectedIds.indexOf(numberIndex) >= 0;
    };

    selectNumber = (numberIndex) => {
        this.setState((prevState) => {
            return { selectedIds: [...prevState.selectedIds, numberIndex]};
        });
    }

    gameStatus = () => {
        const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
            return acc + this.randomNumbers[curr];
        }, 0);
        if (this.state.remainingSeconds === 0) {
            return 'LOST';
        }
        if (sumSelected < this.target) {
            return 'PLAYING';
        }
        if (sumSelected === this.target) {
            return 'WON';
        }
        if (sumSelected > this.target) {
            return 'LOST';
        }
    }
    render() {
        const gameStatus = this.gameStatus();
        return (
            <ImageBackground
        source={require('../img/Azure.jpg')}
        style={styles.container}>
        <Text style={[styles.text, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
        {this.randomNumbers.map((randomNumber, index) => 
            <RandomNumber 
                key={index} 
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'} 
                onPress={this.selectNumber}
            />
        )}
        </View>
        <Text>{ this.state.remainingSeconds }</Text>
      </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor:'transparent',
        //justifyContent: 'center',
        //alignItems: 'center',
        paddingTop: 50,
      },
    text: {
        fontSize: 70,
        color: 'white',
        //marginHorizontal: 50,
        textAlign: 'center',
        borderRadius: 5, 
    },
    randomContainer: {
        flex: 1,
        //flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20,
    },
    STATUS_PLAYING: {
        backgroundColor: 'transparent',
        color: 'black',
        borderRadius: 5,
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
});

export default Game;