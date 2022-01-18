import React, { Component } from 'react'
import { Text, View ,StyleSheet, TouchableOpacity,Image } from 'react-native'
import {API_KEY,API_ENDPOINT} from '../../constants'

export default class PlacesItem extends Component {
    render() {
        const {photos} = this.props.item;
        let source;
        console.log(photos);
        if(photos){
            source = {uri:`${API_ENDPOINT}/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=${API_KEY}`}
        }
        else{
            source = require('../../assets/no-image.jpg')
        }
        return (
            <TouchableOpacity style={{flex:1}}>
                <View style={styles.itemContainer}>
                    <Text
                        numberOfLines={1}
                        style={styles.text}
                    >
                        {this.props.item.name}
                    </Text>
                    <Image
                        style={styles.photo}
                        source={source}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles= StyleSheet.create({
    itemContainer:{
        width:240,
        height:150,
        backgroundColor:'#fff'
    },
    text:{
        position:'absolute',
        top:0,
        left:0,
        zIndex:2,
        backgroundColor:'#fff',
        padding:5,
        opacity:0.9,
        borderRadius:5,
        margin:2
    },
    photo:{
        width:'100%',
        height:150,
        position:'absolute',
        left:0,
        top:0
    }

})

