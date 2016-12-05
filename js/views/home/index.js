/*
* @Author: zoucong
* @Date:   2016-12-02 10:50:04
* @Last Modified by:   zoucong
* @Last Modified time: 2016-12-05 13:50:50
*/

'use strict';

import React from 'react';
import {StyleSheet,View,Navigator,Text,TouchableOpacity} from 'react-native';
import commonStyles from '../../styles/common.js';
import Tweet from '../tweet';
import ImageSlider from '../imageSlider/';

let homeRoutes = (state) => {
  switch (state){
    case 'tweet':
      return Tweet;
    case 'imageSlider':
      return ImageSlider;
    default:
      return View;
  }
};

let styles = StyleSheet.create({
  navigationBar:{
    backgroundColor:'#0080FF'
  }
});

export default class Home extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  static navigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
      return index > 0 ?
        (
          <TouchableOpacity onPress={()=>navigator.pop()}>
            <Text>返回</Text>
          </TouchableOpacity>
        ) :
        null;
    },

    RightButton (route, navigator, index, navState) {
      return null;
    },

    Title (route, navigator, index, navState){
      return <Text>{route.title}</Text>
    }
  };

  _renderScene(route,navigator){
    let {state,props} = route;
    let StateView = homeRoutes(state);
    return <StateView {...{navigator,...props}} />;
  }

  render() {
    let {props:{route={state:'tweet',title:'冒泡广场'}}} = this;
    return(
      <View style={commonStyles.homeContainer}>
        <Navigator
          initialRoute={route} 
          renderScene={this._renderScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={Home.navigationBarRouteMapper}
              style={styles.navigationBar} 
            />
          }
        />
      </View>
    );
  }
}
