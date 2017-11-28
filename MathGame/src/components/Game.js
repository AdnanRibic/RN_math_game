import React from 'react';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';

class Game extends React.Component {
    static propTypes = {
        randomNumberCount: PropTypes.number.isRequired,
        initialSeconds: PropTypes.number.isRequired,
        onPlayAgain:PropTypes.func.isRequired,
    };
    state = {
        selectedIds: [],
        remainingSeconds: this.props.initialSeconds,
    };
    gameStatus = 'PLAYING';
    randomNumbers = Array.from({ length: this.props.randomNumberCount })
                         .map(() => 1 + Math.floor(10 * Math.random()));
    target = this.randomNumbers
        .slice(0, this.props.randomNumberCount -2)
        .reduce((acc, curr) => acc + curr, 0);
    shuffledRandomNumbers = shuffle(this.randomNumbers);

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

    componentWillUpdate(nextProps, nextState) {
        if (nextState.selectedIds !== this.state.selectedIds || nextState.remainingSeconds === 0) {
            this.gameStatus = this.calcGameStatus(nextState);
            if (this.gameStatus !== 'PLAYING') {
                clearInterval(this.intervalId);
            }
    }}

    calcGameStatus = (nextState) => {
        const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
            return acc + this.shuffledRandomNumbers[curr];
        }, 0);
        if (nextState.remainingSeconds === 0) {
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
        const gameStatus = this.gameStatus;
        return (
            <ImageBackground
        //source={require('../img/Azure.jpg')}
        backgroundColor='#FFF1D0'
        style={styles.container}>
        <Text style={[styles.text, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
        {this.shuffledRandomNumbers.map((randomNumber, index) => 
            <RandomNumber 
                key={index} 
                id={index}
                number={randomNumber}
                isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'} 
                onPress={this.selectNumber}
            />
        )}
        </View>
        <View style={styles.infoContainer}>
        <View style={styles.buttons}>
        <Button color='white' title="Reset" onPress={this.props.onPlayAgain} />
        <Button color='white' title="Stop" onPress={this.props.onPlayAgain} />
        </View>
        <Text style={styles.timerText} >Remaining seconds: { this.state.remainingSeconds }</Text>
        </View>
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
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#06AED5',
    },
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    timerText: {
        color: 'white',
        fontSize: 15,
    },
    text: {
        fontSize: 70,
        color: '#086788',
        //marginHorizontal: 50,
        textAlign: 'center',
        borderRadius: 5, 
    },
    randomContainer: {
        flex: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingTop: 20,
    },
    STATUS_PLAYING: {
        backgroundColor: 'transparent',
        color: '#086788',
        borderRadius: 5,
    },
    STATUS_WON: {
        backgroundColor: 'green',
        color: 'white',
    },
    STATUS_LOST: {
        backgroundColor: '#DD1C1A',
        color: 'white',
    },
});

export default Game;