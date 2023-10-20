import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View } from 'react-native';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNIN_URL } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';


function SignInScreen(props) {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isLoading, setLoading] = useState(false);
    const[alert, setAlert] = useState({messages: null, type: ''});

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({messages: null});
        }, 3000);

        return () => clearTimeout(timer);
    }, [alert.messages]);

    const changeEmailHandler = (value) => {
        setEmail(value);
    }

    const changePasswordHandler = (value) => {
        setPassword(value);
    }

    const validate = () => {
        let validationErrors = [];
        let passed = true;

        if(!email) {
            validationErrors.push("Please enter the email");
            passed = false;
        }
        if(!password) {
            validationErrors.push("Please enter the password");
            passed = false;
        }

        if (validationErrors.length > 0) {
            setAlert({messages: validationErrors, type: 'danger'});
        }

        return passed;
    }

    const _signIn = () => {
        (async () => {
            if (!validate()) return;
            setLoading(true);
            
            try {
                const response = axios.post(SIGNIN_URL, {email, password});
                setLoading(false);
                setEmail('');
                setPassword('');
                await AsyncStorage.setItem('accessToken', (await response).data.accessToken);
                props.navigation.navigate('Home');
            } catch (e) {
                setAlert({messages: e.response.data.message, type: 'danger'});
                setLoading(false);
                console.log(e)
            }
        })();
    }

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 40}}>
            <View style={styles.container}>
                <Loader title="Creating a new account" loading={isLoading} />
                <Alert messages={alert.messages} type={alert.type} />
                <ScreenTitle title=" Sign In" icon="md-log-in"/>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input 
                        placeholder="Email" 
                        value={email}
                        onChangeText={changeEmailHandler}
                    />
                    <Input 
                        secureTextEntry 
                        placeholder="Password" 
                        value={password}
                        onChangeText={changePasswordHandler}
                    />
                    <Button text="Sign In" onPress={_signIn} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default SignInScreen;