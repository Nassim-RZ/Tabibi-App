import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, View, Text } from 'react-native';
import CheckBox from 'expo-checkbox';
import styles from './styles/authStyles';
import ScreenTitle from '../components/ScreenTitle';
import Input from '../components/Input';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Alert from '../components/Alert';
import axios from '../config/axios';
import { SIGNUP_URL } from '../config/urls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';


function SignUpScreen(props) {
    const [formData, setFormData]= useState({
        name: '',
        email: '',
        password: '',
        specialization: '',
        phone: '',
        address: '',
        workingHours: '',
        userType: false,
        location: null
    });

    const[location, setLocation] = useState(null);
    const[isLoading, setLoading] = useState(false);
    const[alert, setAlert] = useState({messages: null, type: ''});

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert({messages: null});
        }, 3000);

        return () => clearTimeout(timer);
    }, [alert.messages]);

    useEffect(() => {
        (async() => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const validate = () => {
        const { name, email, password, specialization, address, workingHours, phone, userType } = formData;
        let validationErrors = [];
        let passed = true;
        if(!name) {
            validationErrors.push("Please enter the name");
            passed = false;
        }
        if(!email) {
            validationErrors.push("Please enter the email");
            passed = false;
        }
        if(!password) {
            validationErrors.push("Please enter the password");
            passed = false;
        }
        if(userType) {
            if(!specialization) {
              validationErrors.push("Please enter the specialization");
              passed = false;  
            }    
            if(!address) {
                validationErrors.push("Please enter the address");
                passed = false;
            }
            if(!workingHours) {
                validationErrors.push("Please enter working hours");
                passed = false;
            }
            if(!phone) {
                validationErrors.push("Please enter phone number");
                passed = false;
            }
        }

        if (validationErrors.length > 0) {
            setAlert({messages: validationErrors, type: 'danger'});
        }

        return passed;
    }

    const changeFormValue = (key, value) => {
        setFormData({...formData, [key]: value});
    }

    const _signUp = () => {
        if (!validate()) return;
        (async () => {
            setLoading(true);
            const { name, email, password, specialization, address, workingHours, phone, userType } = formData;
            const body = {
                name,
                email,
                password,
                userType: userType? 'doctor' : 'normal',
                specialization,
                address,
                phone,
                workingHours,
                location: {
                    latitude: location ? location.coords.latitude: null,
                    longitude: location ? location.coords.longitude: null,
                }
            }
            
            try {
                const response = await axios.post(SIGNUP_URL, body);
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    specialization: '',
                    phone: '',
                    address: '',
                    workingHours: '',
                    userType: false,
                    location: null
                })
                setLoading(false);
                props.navigation.navigate('SignIn');
            } catch (e) {
                setAlert({messages: e.response.data.message, type: 'danger'});
                setLoading(false);
                console.log(e);
            }
        }) ();
    }

    const { name, email, password, specialization, address, workingHours, phone, userType } = formData;

    return (
        <ScrollView contentContainerStyle={{paddingVertical: 40}}>
            <Loader title="Creating a new account" loading={isLoading} />
            <Alert messages={alert.messages} type={alert.type} />
            <View style={styles.container}>
                <ScreenTitle title=" Create new account" icon="md-person-add"/>
                <KeyboardAvoidingView behavior="padding" enabled>
                    <Input 
                        placeholder="Name" 
                        value={name}
                        onChangeText={(text) => changeFormValue('name', text)}
                    />
                    <Input 
                        placeholder="Email" 
                        value={email}
                        onChangeText={(text) => changeFormValue('email', text)}
                    />
                    <Input 
                        secureTextEntry 
                        placeholder="Password" 
                        value={password}
                        onChangeText={(text) => changeFormValue('password', text)}
                    />
                    <View style={styles.checkboxContainer}>
                        <CheckBox 
                            style={styles.checkbox}
                            value={userType}
                            onValueChange={() => changeFormValue('userType', !userType)}
                        /> 
                        <Text style={styles.checkboxLabel}>Doctor</Text>
                    </View>
                    {userType && (
                        <React.Fragment>
                            <Input 
                                placeholder="Specialization" 
                                value={specialization}
                                onChangeText={(text) => changeFormValue('specialization', text)}
                            />
                            <Input 
                                placeholder="Working hours" 
                                value={workingHours}
                                onChangeText={(text) => changeFormValue('workingHours', text)}
                            />
                            <Input 
                                placeholder="Address" 
                                value={address}
                                onChangeText={(text) => changeFormValue('address', text)}
                            />
                            <Input
                                placeholder="Phone" 
                                value={phone}
                                onChangeText={(text) => changeFormValue('phone', text)}
                            />
                        </React.Fragment>
                    )}
                    
                    <Button text="Create" onPress={_signUp} />
                </KeyboardAvoidingView>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen;