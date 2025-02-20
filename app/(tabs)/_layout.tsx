// The bottom navigation tab

import React from 'react'
import{View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity} from 'react-native'
import { Colors } from '@/constants/Colors';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline'

export default function HomeScreen() {
  return (
    <View style= {{flex: 1, position: 'relative' }}>
      <StatusBar barStyle='light-content' />
      <Image blurRadius={70} source={require('../../assets/images/bg.jpg')}
        style= {{position: 'absolute', height: '100%' , width: '100%', resizeMode: 'cover'}}
      />
      <SafeAreaView style={{flex: 1}}>
        {/* Search Section */}
        <View style={{height: 50, marginHorizontal: 16, position: 'relative', zIndex: 50}}>
          <View 
            style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 50, backgroundColor: Colors.bgWhite(0.2), paddingHorizontal: 16, paddingVertical: 15}}>
              <TextInput placeholder='Search City' placeholderTextColor='white' style={{ flex:1, color: 'white', fontSize: 16}}/>
              <TouchableOpacity
                style={{backgroundColor: Colors.bgWhite(0.2), padding: 10, borderRadius: 50}}>
                  <MagnifyingGlassIcon color='white' size={20}/>
              </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  )
}