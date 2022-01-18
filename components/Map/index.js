import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { API_ENDPOINT, API_KEY } from '../../constants'
import axios from 'axios'

import Places from '../Places/Places'

export default class Map extends Component {
    state = {
        region: {
            latitude: 40.9882681,
            longitude: 29.0343434,
            latitudeDelta: 0.065,
            longitudeDelta: 0.042,
        },
        places: [],
        fetching: false
    }

    async componentDidMount() {
        this.getCurrentPosition();
        try {
            const latitude = this.state.region.latitude;
            const longitude = this.state.region.longitude;
            this.setState({
                fetching:true
            });

            const{data:{results}} = await axios.get(`${API_ENDPOINT}/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=restaurant&key=${API_KEY}`)

            this.setState({
                places:results,
                fetching:false
            })
        }
        catch (e) {
            // console.log(e);
            this.setState({
                fetching:false
            })
            alert('Konum alınamadı!');
        }
    }

    getCurrentPosition() {
        Geolocation.getCurrentPosition(
            position => {
                const location = position;
                // console.log(location);
                this.setState({
                    region: {
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.035,
                        longitudeDelta: 0.022,
                    }
                })
            },
            error => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    region={this.state.region}
                    ref={ref => this.map = ref}
                >
                   {
                       this.state.places.map((place,key) =>{
                           const{geometry :{location :{lat,lng}}} =place;
                           return(
                              <Marker
                                key={key}
                                coordinate={{
                                    latitude:lat,
                                    longitude:lng
                                }}
                                title={place.name}
                              /> 
                           )
                       })
                   } 
                </MapView>
                <View style={styles.placesContainer}>
                    <Places map={this.map} places={this.state.places}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map:{
        flex:1
    },
    placesContainer:{
        position:'absolute',
        width:'100%',
        height:150,
        bottom:0,
        left:0,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center'
    }
})
