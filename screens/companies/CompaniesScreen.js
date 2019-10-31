import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product } from '../../components/';
import products from '../../constants/products';
import Firebase, { db, storage } from '../../config/Firebase.js';

const { width } = Dimensions.get('screen');

export default class Company extends React.Component {
  state = { companies: [] };

  componentDidMount = () => {
    const allCompanies = db.collection('companies').get()
    .then(querySnapshot => {
      const companies = [];
      querySnapshot.forEach(doc => {
        companies.push({
          id: doc.id,
          name: doc.data().name,
          address: doc.data().address,
          coordinates: doc.data().coordinates,
          image: doc.data().image,
          //image: 'https://images.unsplash.com/photo-1542068829-1115f7259450?fit=crop&w=240&q=80',
          phone: doc.data().phone,
          workingHours: doc.data().workingHours,
        });
      });
      this.setState({ companies });
    })
    .catch(e => {
      alert(e);
    });
  };

  renderProducts = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          {this.state.companies.map(product => {
            return (
              <Product key={product.id} product={product} detail='company' horizontal />
            );
          })}
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderProducts()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 4,
    zIndex: 2,
  },
  tabs: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.50,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '300'
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.MUTED,
  },
  products: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
  },
});
