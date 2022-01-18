import React, { Component } from 'react'
import { Text, View ,StyleSheet ,FlatList } from 'react-native'
import PlacesItem from './PlacesItem'

export default class Places extends Component {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.places}
                    keyExtractor={(item,key)=>key}
                    horizontal={true}
                    renderItem={({item})=><PlacesItem item={item} map={this.props.map}/>}
                    ItemSeparatorComponent={()=>(<View style={{marginRight:10}}></View>)}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:'100%',
        padding:10,
        height:140
    }
})