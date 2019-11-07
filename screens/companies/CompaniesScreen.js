import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product, CompanyProduct } from '../../components/';
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
          image: doc.data().image,
          phone: doc.data().phone,
          workingHours: doc.data().workingHours,
          email: doc.data().email,
          facebook: doc.data().facebook,
          instagram: doc.data().instagram,
          twiteer: doc.data().twiteer,
          web: doc.data().web,
          map: doc.data().map,
          whatsapp: doc.data().whatsapp,
          review: doc.data().review,
          photo1: doc.data().photo1,
          photo2: doc.data().photo2,
          photo3: doc.data().photo3,
          photo4: doc.data().photo4,
          photo5: doc.data().photo5,
          photo6: doc.data().photo6,
          photo7: doc.data().photo7,
          photo8: doc.data().photo8,
          photo9: doc.data().photo9,
          product1: doc.data().product1,
          product2: doc.data().product2,
          product3: doc.data().product3,
          product4: doc.data().product4,
          product5: doc.data().product5,
          product6: doc.data().product6,
          product7: doc.data().product7,
          product8: doc.data().product8,
          photo9: doc.data().photo9,
          categoryId: doc.data().categoryId,
          stars: doc.data().stars
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
              <CompanyProduct key={product.id} product={product} detail='company' horizontal />
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
