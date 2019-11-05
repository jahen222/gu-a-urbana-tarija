import React from 'react';
import { Dimensions, WebView } from 'react-native';
import Firebase, { storage } from '../../config/Firebase.js';

const { width, height } = Dimensions.get('screen');

class RoutesMap extends React.Component {

  state = {
    map: ""
  };

  componentDidMount = () => {
    const { map } = this.props.navigation.state.params;

    this.setState({
      map: map
    });
  };

  render() {
    const frame = '<iframe src="'+this.state.map+'&fullscreen=1" width="'+(width)+'" height="'+(height-91)+'" frameborder="0" style="border:0;" allowfullscreen></iframe>';
    return (
      <WebView
         source={{html: frame}}
         style={{
           marginTop: -11,
           marginLeft: -10
        }}
      />
    );
  }
}

export default RoutesMap;
