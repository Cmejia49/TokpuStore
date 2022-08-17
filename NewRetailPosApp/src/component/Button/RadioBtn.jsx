import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const RadioBtn =(props)=>{
    return(
		
		<View style={styles.container}>
			<Text style={styles.radioText}>{props.text}</Text>
			<TouchableOpacity
			style={styles.radioCircle}
			onPress={props.onPress}>
               {props.value === props.id && <View style={styles.selectedRb} />}
			</TouchableOpacity>
		</View>
    )
}

const styles = StyleSheet.create({
	container: {
        marginBottom: 15,
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'space-between',
	},
    radioText: {
        marginRight: 35,
        fontSize: 18,
        color: '#000',
        fontWeight: '400',
		fontFamily:'Roboto',
		lineHeight:21
    },
	radioCircle: {
		height: 20,
		width: 20,
		borderRadius: 70,
		borderWidth: 2,
		borderColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 10,
		height: 10,
		borderRadius: 70,
		backgroundColor: '#3502FF',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});
export default RadioBtn;