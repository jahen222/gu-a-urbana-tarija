import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import Firebase, { storage } from '../config/Firebase.js';
import materialTheme from '../constants/Theme';
import Icon from './Icon';

const { width } = Dimensions.get('screen');

class CompanyProduct extends React.Component {
  state = {
    url: ''
  };

  getLink = async (image) => {
    const refImage = storage.ref(image);

    const getLink = await refImage.getDownloadURL()
    .then(url => {
      this.setState({ url });
    })
    .catch(e => {
      alert(e);
    });
  };

  render() {
    const { navigation, product, horizontal, full, style, priceColor, imageStyle, detail } = this.props;
    const imageStyles = [styles.image, full ? styles.fullImage : styles.horizontalImage, imageStyle];
    if (product.image == undefined || product.image == null || product.image == "")
      this.getLink("404.jpg");
    else {
      this.getLink(product.image);
    }

    return (
      <Block row={horizontal} card flex style={[styles.product, styles.shadow, style]}>
        <TouchableWithoutFeedback onPress={detail=="company"?()=>{navigation.navigate('CompanyDetails', {product: product})}:detail=="tourism"?()=>{navigation.navigate('TourismDetails', {product: product})}:()=>{navigation.navigate('RoutesDetails', {product: product})}}>
          <Block flex style={[styles.imageContainer, styles.shadow]}>
            <Image source={{ uri: this.state.url }} style={imageStyles} />
          </Block>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={detail=="company"?()=>{navigation.navigate('CompanyDetails', {product: product})}:detail=="tourism"?()=>{navigation.navigate('TourismDetails', {product: product})}:()=>{navigation.navigate('RoutesDetails', {product: product})}}>
          <Block flex space="between" style={styles.productDescription}>
            <Text size={14} style={styles.productTitle}>{product.name}</Text>
            <Text>
              {'Empresa'}
            </Text>
            <Text>
              {product.stars ? (
                <Text size={16} color={materialTheme.COLORS.WARNING} style={styles.seller}>
                  {product.stars}<Icon name="shape-star" family="GalioExtra" />
                </Text>
              ): (
                ""
              )}
            </Text>
            <Text>
              {product.address ? (
                <Text color={theme.COLORS.MUTED} size={13}>
                  <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                  {` `} {product.address}
                </Text>
              ): (
                ""
              )}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    );
  }
}

export default withNavigation(CompanyProduct);

const styles = StyleSheet.create({
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
  },
  productTitle: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    elevation: 1,
  },
  image: {
    borderRadius: 3,
    marginHorizontal: theme.SIZES.BASE / 2,
    marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  fullImage: {
    height: 215,
    width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});
