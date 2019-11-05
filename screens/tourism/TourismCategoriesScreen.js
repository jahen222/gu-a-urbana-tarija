import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { Icon, Product, Category } from '../../components/';
import products from '../../constants/products';
import Firebase, { db, storage } from '../../config/Firebase.js';

const { width } = Dimensions.get('screen');

export default class TourismCategories extends React.Component {
  state = { categories: [] };

  componentDidMount = () => {
    const allCategories = db.collection('company_categories').get()
    .then(querySnapshot => {
      const categories = [];
      querySnapshot.forEach(doc => {
        categories.push({
          id: doc.id,
          name: doc.data().name,
          image: doc.data().image,
          categoryId: doc.data().categoryId
        });
      });
      this.setState({ categories });
    })
    .catch(e => {
      alert(e);
    });
  };

  renderCategories = () => {
    const categories = [];
    for (var i = 0; i <= this.state.categories.length+1; i=i+2) {
      const category = this.state.categories;
      if (category[i]!=undefined) {
        if (category[i+1]!=undefined) {
          categories.push(
            <Block flex row>
              <Category key={category[i].id} category={category[i]} detail='category' style={{ marginRight: theme.SIZES.BASE }} />
              <Category key={category[i+1].id} category={category[i+1]} detail='category'  />
            </Block>
          )
        }else{
          categories.push(
            <Block flex row>
              <Category key={category[i].id} category={category[i]} detail='category' style={{ marginRight: theme.SIZES.BASE }} />
            </Block>
          )
        }
      }
    }

    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.products}>
        <Block flex>
          {categories}
        </Block>
      </ScrollView>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderCategories()}
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
