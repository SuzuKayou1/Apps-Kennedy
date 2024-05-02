import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';

export default function ButtonNew({focused, size, color}){
    return(
        <View style={[styles.container, {backgroundColor: focused ? '#7ad7ff' : '#38B6FF' }]}>
            <Entypo name="plus" size={size} color={focused? 'blue' : '#F8F8F8'} />
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#85daff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,

    }

})