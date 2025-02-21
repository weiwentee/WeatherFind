// The bottom navigation tab

import React from 'react'
import{View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity} from 'react-native'
import { Colors } from '@/constants/Colors';
import { Dimensions } from 'react-native';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {MapPinIcon} from 'react-native-heroicons/solid';


export default function HomeScreen() {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocations] = React.useState([1,2,3]);
  const handleLocation = (loc) => {
    console.log('location: ', loc);
  }
  return (
    <View style= {{flex: 1, position: 'relative' }}>
      <StatusBar barStyle='light-content' />
      <Image blurRadius={70} source={require('../../assets/images/bg.jpg')}
        style= {{position: 'absolute', height: '100%' , width: '100%', resizeMode: 'cover'}}
      />
      <SafeAreaView style={{flex: 1}}>
        {/* Search Section */}
        <View style={{ alignItems: 'flex-end', marginHorizontal: 20, marginTop: 10 }}>
          <View 
            style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 50, backgroundColor: showSearch? Colors.bgWhite(0.2): 'transparent', paddingHorizontal: 16, paddingVertical: 15}}>
              {
                showSearch && (
                  <TextInput placeholder='Search City' placeholderTextColor='white' style={{ flex: 1, color: 'white', fontSize: 16}}/>
                )
              }
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={{backgroundColor: Colors.bgWhite(0.2), padding: 10, borderRadius: 50}}>
                  <MagnifyingGlassIcon color='white' size={20}/>
              </TouchableOpacity>
          </View>
          {
            locations.length > 0 && showSearch? (
              <View style={{marginTop: 5, marginBottom: 5, backgroundColor: 'white', borderRadius: 25, borderWidth: 1, borderColor: 'white', overflow: 'hidden'}}>
                {
                  locations.map((loc, index) => {
                    let showBorder = index+1 != locations.length;
                    let borderClass = showBorder? {borderBottomWidth: 1, borderBottomColor: 'gray'}: {};
                    return (
                      <TouchableOpacity
                        onPress={() => handleLocation(loc)}
                        key={index}
                        style={{flexDirection: 'row', alignItems: 'center', padding: 16, ...borderClass}}>
                        <MapPinIcon color='gray' size={20}/>
                        <Text style={{color: 'black', fontSize: 18, marginLeft: 10}}>London, United Kingdom</Text>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            ): null
          }
        </View>
        {/* ForeCast Section */}
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingBottom: 30}}>
          {/* Location */}
          <Text style={{color: 'white', alignItems: 'center', fontSize: 40, fontWeight: 'bold'}}>
            London,
            <Text style={{fontSize: 30, fontWeight: 'semibold', color: 'gray'}}> United Kingdom</Text>
          </Text>
          {/* Weather */}
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../assets/images/cloudy.png')}
              style={{height: 200, width: 200}}
            />
          </View>
          {/* Temperature */}
          <View style={{alignItems: 'center', marginTop: -20}}>
            <Text style={{color: 'white', fontSize: 55, fontWeight: 'bold', marginBottom: 15}}>25&#176;</Text>
            <Text style={{color: 'white', fontSize: 25, fontWeight: '600', letterSpacing: 1}}>Partly Cloudy</Text>
          </View>
          {/* Details */}
          <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', width: '80%'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
              <Image
                source={require('../../assets/images/wind.png')}
                style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'white' }}
              />
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>12 km</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
              <Image
                source={require('../../assets/images/rain.png')}
                style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'white' }}
              />
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>78%</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/sun.png')}
                style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'white' }}
              />
              <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>6:52 AM</Text>
            </View>
          </View>

        </View>
      </SafeAreaView>
    </View>
  )
}