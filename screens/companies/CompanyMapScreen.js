import React from 'react';
import { Dimensions, WebView } from 'react-native';
import Firebase, { storage } from '../../config/Firebase.js';

const { width, height } = Dimensions.get('screen');

class CompanyMap extends React.Component {

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
    const frame = '<iframe src="'+this.state.map+'&fullscreen=1" width="'+(width-3)+'" height="'+(height-98)+'"></iframe>';
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

export default CompanyMap;
