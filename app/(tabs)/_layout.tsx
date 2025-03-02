// The bottom navigation tab

import React, { useCallback, useEffect } from 'react'
import{View, Text, SafeAreaView, TextInput, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native'
import { Colors } from '@/constants/Colors';
import { CalendarDaysIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { MapPinIcon } from 'react-native-heroicons/solid';
import { debounce } from 'lodash';
import { fetchLocations, fetchWeatherForecast } from '../../api/weather';
import { weatherImages } from '@/constants/index.js';
import * as Progress from 'react-native-progress';
import { store } from 'expo-router/build/global-state/router-store';
import { getData, storeData } from '@/utils/asyncStorage.js';


export default function HomeScreen() {
  const [showSearch, toggleSearch] = React.useState(false);
  const [locations, setLocations] = React.useState([]);
  const [weather, setWeather] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const handleLocation = (loc) => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', loc.name);
    })
  }

  const handleSearch = value=> {
    // fetch locations
    if (value.length>2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      })
    }

  }

  useEffect(() => {
    fetchMyWeatherData();
  }
  , []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'London';
    if (myCity) cityName = myCity;

    fetchWeatherForecast({
      cityName,
      days: '7'
    }).then(data => {
      setWeather(data);
      setLoading(false);
    })
  }

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;

  return (
    <View style= {{flex: 1, position: 'relative' }}>
      <StatusBar barStyle='light-content'/>
      <Image blurRadius={70} source={require('../../assets/images/bg.jpg')}
        style= {{position: 'absolute', height: '100%' , width: '100%', resizeMode: 'cover'}}
      />
      {
        loading? (
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '85%'}}>
            <Progress.CircleSnail color='white' size={140} thickness={10}/>
          </View>
        ):(
          <SafeAreaView style={{flex: 1}}>
            {/* Search Section */}
            <View style={{ alignItems: 'flex-end', marginHorizontal: 20, marginTop: 10 }}>
              <View 
                style={{ flexDirection: 'row', alignItems: 'center', borderRadius: 50, backgroundColor: showSearch? Colors.bgWhite(0.2): 'transparent', paddingHorizontal: 16, paddingVertical: 15}}>
                  {
                    showSearch && (
                      <TextInput onChangeText={handleTextDebounce} placeholder='Search City' placeholderTextColor='white' style={{ flex: 1, color: 'white', fontSize: 16}}/>
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
                  <View style={{position: 'absolute', top: 70, left: 10, right: 10, zIndex: 10, backgroundColor: 'white', borderRadius: 30, borderWidth: 1, padding: 5}}>
                    {
                      locations.map((loc, index) => {
                        let showBorder = index+1 != locations.length;
                        let borderClass = showBorder? {borderBottomWidth: 1, borderBottomColor: 'gray'}: {};
                        return (
                          <TouchableOpacity
                            onPress={() => handleLocation(loc)}
                            key={index}
                            style={{flexDirection: 'row', alignItems: 'center', padding: 12, ...borderClass}}>
                            <MapPinIcon color='gray' size={20}/>
                            <Text style={{color: 'black', fontSize: 18, marginLeft: 10}}>{loc.name}, {loc.country}</Text>
                          </TouchableOpacity>
                        )
                      })
                    }
                  </View>
                ): null
              }
            </View>
            {/* Forecast Section */}
            <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingTop: 20, paddingBottom: 30}}>
              {/* Location */}
              <Text style={{color: 'white', textAlign: 'center', fontSize: 40, fontWeight: 'bold'}}>
                {location?.name},
                <Text style={{fontSize: 30, fontWeight: '600', color: 'gray'}}>{' '+location?.country}</Text>
              </Text>
              {/* Weather */}
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  source={weatherImages[current?.condition?.text]}
                  style={{height: 200, width: 200}}
                />
              </View>
              {/* Temperature */}
              <View style={{alignItems: 'center', marginTop: -20}}>
                <Text style={{color: 'white', fontSize: 55, fontWeight: 'bold', marginBottom: 15}}>{current?.temp_c}&#176;</Text>
                <Text style={{color: 'white', fontSize: 25, fontWeight: '600', letterSpacing: 1}}>{current?.condition?.text}</Text>
              </View>
              {/* Details */}
              <View style={{ alignSelf: 'center', flexDirection: 'row', marginBottom: 20, alignItems: 'center', justifyContent: 'space-between', width: '80%'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                  <Image
                    source={require('../../assets/images/wind.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'white' }}
                  />
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>{current?.wind_kph}km</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                  <Image
                    source={require('../../assets/images/rain.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'white' }}
                  />
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>{current?.humidity}%</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/images/sun.png')}
                    style={{ height: 30, width: 30, resizeMode: 'contain', tintColor: 'white' }}
                  />
                  <Text style={{ color: 'white', fontSize: 20, marginLeft: 5 }}>{weather?.forecast?.forecastday[0]?.astro?.sunrise}</Text>
                </View>
              </View>
            </View>

            {/*Next 6 Days Forecast */}
            <View style={{marginBottom: 20, marginLeft: 13}}>
              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                <CalendarDaysIcon color='white' size={22}/>
                <Text style={{color: 'white', fontSize: 20, marginLeft: 7}}>Daily Forecast</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
                {
                  weather?.forecast?.forecastday?.slice(1)?.map((item, index)=>{
                    let date = new Date(item.date);
                    let day = date.getDate();
                    let month = date.toLocaleString('en-US', {month: 'short'});
                    let formattedDate = `${day} ${month}`;
                    return (
                      <View 
                        key={index}
                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 100, borderRadius: 15, paddingTop: 10, paddingBottom: 10, marginRight: 10, backgroundColor: Colors.bgWhite(0.2)}}>
                        <Text style={{color: 'white', fontSize: 18}}>{formattedDate}</Text>
                        <Image
                          source={weatherImages[item?.day?.condition?.text]}
                          style={{height: 50, width: 50, marginTop: 10}}
                        />
                        <Text style={{color: 'white', fontSize: 18, marginTop: 10}}>{item?.day?.avgtemp_c}&#176;</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          </SafeAreaView>
        )
      }
    </View>
  )
}