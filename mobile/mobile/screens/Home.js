import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableNativeFeedback  } from 'react-native';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen(props) {
    const { navigation } = props;
    const [token, setToken] = useState('');

    const _checkToken = async() => {
        const token = await AsyncStorage.getItem('accessToken');
        setToken(token);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            _checkToken();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <React.Fragment>
            <ImageBackground style={styles.background} source={require('../assets/doc-bg.png')}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}> Welcome to Tabibi !</Text>
                        <Text style={styles.text}> Revolutionizing Healthcare: Connecting Doctors and Patients Like Never Before!</Text>
                    </View>
                    {token ? (
                        <React.Fragment>
                            <Button 
                                text="Display the list of doctors" 
                                onPress={() => props.navigation.navigate('Doctors')} 
                            />
                            <TouchableNativeFeedback
                                onPress={() => props.navigation.navigate('Profile')}>
                                <Text style={styles.lableButton}>Display the personal profile</Text>
                            </TouchableNativeFeedback>
                        </React.Fragment>
                    ): (
                        <React.Fragment>
                            <Button 
                                text="Sign In" 
                                onPress={() => props.navigation.navigate('SignIn')} 
                            />
                            <TouchableNativeFeedback
                                onPress={() => props.navigation.navigate('SignUp')}>
                                <Text style={styles.lableButton}>Create a new account</Text>
                            </TouchableNativeFeedback>
                        </React.Fragment> 
                    )}
                </View>
            </ImageBackground>
        </React.Fragment>
    )
}

const textStyles = {
    color: '#fff',
    textAlign: 'center'
}

const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%'
    },
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    textContainer: {
        marginBottom: 30
    },
    title: {
        ...textStyles,
        fontSize: 35,
        top: -9
    },
    text: {
        ...textStyles,
        fontSize: 20,
        color: "#4cc9f0"
    },
    lableButton: {
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
        color: '#fff'
    }
})

export default HomeScreen;