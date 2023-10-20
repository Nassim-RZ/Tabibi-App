import React, { useState } from 'react';
import { Ionicons} from "@expo/vector-icons";
import { View, TextInput, StyleSheet } from 'react-native';

export default (props) => {
    const [focused, setFocused] = useState(false);
    const {
        onChangeText,
        inputStyles,
        value,
        placeholder,
        secureTextEntry,
        icon,
    } = props;

    return (
        <View>
            <TextInput 
                style={[styles.input, inputStyles, focused && styles.focused]}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onFocus={() => setFocused(true)} 
                onBlur={() => setFocused(false)}
            />

            {icon && (
                <Ionicons name={icon} size={30} color="#ccc" style={styles.icon} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderBottomWidth: 2,
        width: 300,
        fontSize: 18,
        padding: 5,
        marginBottom: 30,
        textAlign: 'left',
        borderColor: "#1a759f",
    },
    input2: {
        borderBottomWidth: 2,
        borderColor: "blue",
        top: "12%",
        width: "100%",
        fontSize: 18,
        padding: 5,
        marginBottom: 30,
        textAlign: 'left',
    },
    focused: {
        borderBottomColor: '#007bff',
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: "14%",

    }, 
});
