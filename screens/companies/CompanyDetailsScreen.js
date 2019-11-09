import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, Linking, Share } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import Firebase, { db, storage } from '../../config/Firebase.js';
import { Icon, Product, Photo } from '../../components';
import { Images, materialTheme } from '../../constants';
import { HeaderHeight } from "../../constants/utils";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class CompanyDetail extends React.Component {
  state = {
    address: "",
    id: "",
    image: "",
    name: "",
    phone: "",
    workingHours: "",
    map: "",
    email: "",
    facebook: "",
    instagram: "",
    twiteer: "",
    web: "",
    whatsapp: "",
    review: "",
    category: "",
  };

  getLinks = async (product) => {
    const refImage1 = storage.ref(product.image);
    const getLink1 = await refImage1.getDownloadURL()
    .then(url => {
      this.setState({
        image: url,
      });
    })
    .catch(e => {
      alert(e);
    });
  };

  getCategory = async (categoryId) => {
    const allCategories = db.collection('company_categories').get()
    .then(querySnapshot => {
      var name = "";
      querySnapshot.forEach(doc => {
        if (doc.data().categoryId == categoryId) {
          name = doc.data().name;
        }
      });
      this.setState({ category: name });
    })
    .catch(e => {
      alert(e);
    });
  };

  _shareMessage(name, review) {
    Share.share({
      message: 'Empresa: '+name+' '+review,
      title: name
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _shareText(name, review, map) {
    Share.share({
      message: 'Empresa: '+name+' '+review+' ubicación: '+map,
      url: map,
      title: name
    }, {
      dialogTitle: 'Compartir',
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
  }

  componentDidMount = () => {
    const { product } = this.props.navigation.state.params;
    this.getLinks(product);
    this.setState({
      address: product.address,
      name: product.name,
      phone: product.phone,
      workingHours: product.workingHours,
      map: product.map,
      email: product.email,
      facebook: product.facebook,
      instagram: product.instagram,
      twiteer: product.twiteer,
      web: product.web,
      whatsapp: product.whatsapp,
      review: product.review,
      categoryId: product.categoryId,
      photo1: product.photo1,
      photo2: product.photo2,
      photo3: product.photo3,
      photo4: product.photo4,
      photo5: product.photo5,
      photo6: product.photo6,
      photo7: product.photo7,
      photo8: product.photo8,
      photo9: product.photo9,
      product1: product.product1,
      product2: product.product2,
      product3: product.product3,
      product4: product.product4,
      product5: product.product5,
      product6: product.product6,
      product7: product.product7,
      product8: product.product8,
      product9: product.product9,
      stars: product.stars
    });

    if (product.categoryId === undefined || product.categoryId === null) {
      this.setState({
        category: "n/a"
      });
    }
    else{
      this.getCategory(product.categoryId);
    }
    if (product.name === undefined || product.name === null) {
      this.setState({
        name: "n/a"
      });

    }
    if (product.address === undefined || product.address === null) {
      this.setState({
        address: "n/a"
      });
    }
    if (product.workingHours === undefined || product.workingHours === null) {
      this.setState({
        workingHours: "n/a"
      });
    }
    if (product.email === undefined || product.email === null) {
      this.setState({
        email: "n/a"
      });
    }
    if (product.review === undefined || product.review === null) {
      this.setState({
        review: "n/a"
      });
    }
    if (product.stars === undefined || product.stars === null) {
      this.setState({
        stars: "n/a"
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const photos = [];

    if (this.state.photo1!=undefined) {
      if (this.state.photo2!=undefined) {
        photos.push(
          <Block row space="around" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>Productos</Text>
          </Block>
        );
        photos.push(
          <Block flex row>
            <Photo key="01" product={this.state.product1} detail={this.state.photo1} style={{ marginRight: theme.SIZES.BASE }} />
            <Photo key="02" product={this.state.product2} detail={this.state.photo2}/>
          </Block>
        );
      }else{
        photos.push(
          <Block row space="around" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
            <Text size={16}>Productos</Text>
          </Block>
        );
        photos.push(
          <Block flex row>
            <Photo key="01" product={this.state.product1} detail={this.state.photo1} style={{ marginRight: theme.SIZES.BASE }} />
          </Block>
        );
      }
    }

    if (this.state.photo3!=undefined) {
      if (this.state.photo4!=undefined) {
        photos.push(
          <Block flex row>
            <Photo key="03" product={this.state.product3} detail={this.state.photo3} style={{ marginRight: theme.SIZES.BASE }} />
            <Photo key="04" product={this.state.product4} detail={this.state.photo4}/>
          </Block>
        )
      }else{
        photos.push(
          <Block flex row>
            <Photo key="03" product={this.state.product3} detail={this.state.photo3} style={{ marginRight: theme.SIZES.BASE }} />
          </Block>
        )
      }
    }

    if (this.state.photo5!=undefined) {
      if (this.state.photo6!=undefined) {
        photos.push(
          <Block flex row>
            <Photo key="05" product={this.state.product5} detail={this.state.photo5} style={{ marginRight: theme.SIZES.BASE }} />
            <Photo key="06" product={this.state.product6} detail={this.state.photo6}/>
          </Block>
        )
      }else{
        photos.push(
          <Block flex row>
            <Photo key="05" product={this.state.product5} detail={this.state.photo5} style={{ marginRight: theme.SIZES.BASE }} />
          </Block>
        )
      }
    }

    if (this.state.photo7!=undefined) {
      if (this.state.photo8!=undefined) {
        photos.push(
          <Block flex row>
            <Photo key="07" product={this.state.product7} detail={this.state.photo7} style={{ marginRight: theme.SIZES.BASE }} />
            <Photo key="08" product={this.state.product8} detail={this.state.photo8}/>
          </Block>
        )
      }else{
        photos.push(
          <Block flex row>
            <Photo key="07" product={this.state.product7} detail={this.state.photo7} style={{ marginRight: theme.SIZES.BASE }} />
          </Block>
        )
      }
    }

    if (this.state.photo9!=undefined) {
      photos.push(
        <Block flex row>
          <Photo key="09" product={this.state.product9} detail={this.state.photo9} style={{ marginRight: theme.SIZES.BASE }} />
        </Block>
      )
    }

    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: this.state.image}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
            <Block flex style={styles.profileDetails}>
              <Block style={styles.profileTexts}>
                <Text color="white" size={28} style={{ paddingBottom: 8 }}>{this.state.name}</Text>
                <Block row space="between">
                  <Block row>
                    <Block middle style={styles.pro}>
                      <Text size={16} color="white">Tel</Text>
                    </Block>
                    <Text size={16} muted color="white" style={styles.seller} onPress={() => this.state.phone==undefined?'':Linking.openURL("tel:"+this.state.phone).catch(err => console.error('An error occurred', err))}>{this.state.phone==undefined?'n/a':this.state.phone}</Text>
                  </Block>
                  <Block>
                    <Text color={theme.COLORS.MUTED} size={16} onPress={() => this.state.map==undefined?'':navigation.navigate('CompanyMap',{map:this.state.map}) }>
                      <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={16} />
                      {` `} {this.state.address}
                      </Text>
                  </Block>
                </Block>
                <Block row space="between">
                  <Block row>
                    <Block middle>
                      <Text size={16} color={materialTheme.COLORS.WARNING} style={styles.seller}>
                        {this.state.stars}<Icon name="shape-star" family="GalioExtra" size={14} />
                      </Text>
                    </Block>
                  </Block>
                </Block>
              </Block>
              <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
            </Block>
          </ImageBackground>
        </Block>
        <Block flex style={styles.options}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Block row space="around" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text muted size={12}>{this.state.review}</Text>
              </Block>
            </Block>
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Icon name="heart" family="font-awesome" color={theme.COLORS.MUTED} size={24}/>
                <Text muted size={12}>Me gusta</Text>
              </Block>
              <Block middle>
                <Icon name="share-alt" family="font-awesome" color={theme.COLORS.MUTED} size={24} onPress={() => this.state.map==undefined?this._shareMessage(this.state.name, this.state.review):this._shareText(this.state.name, this.state.review, this.state.map)}/>
                <Text muted size={12}>Compartir</Text>
              </Block>
              <Block middle>
                <Icon name="map-marker" family="font-awesome" color={theme.COLORS.MUTED} size={24} onPress={() => this.state.map==undefined?'':navigation.navigate('CompanyMap',{map:this.state.map}) }/>
                <Text muted size={12}>Ver mapa</Text>
              </Block>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>Ubicación</Text>
              <Text size={12} color={this.state.map==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.map==undefined?'':navigation.navigate('CompanyMap',{map:this.state.map}) }>{this.state.map==undefined?'n/a':'Ver Mapa'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Categoria</Text>
              <Text size={12}>{this.state.category}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Nombre</Text>
              <Text size={12}>{this.state.name}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Email</Text>
              <Text size={12}>{this.state.email}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Teléfono</Text>
              <Text size={12} color={this.state.phone==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.phone==undefined?'':Linking.openURL("tel:"+this.state.phone).catch(err => console.error('An error occurred', err))}>{this.state.phone==undefined?'n/a':'LLamar'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Facebook</Text>
              <Text size={12} color={this.state.facebook==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.facebook==undefined?'':Linking.openURL(this.state.facebook).catch(err => console.error('An error occurred', err))}>{this.state.facebook==undefined?'n/a':'Ir a Facebook'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Twitter</Text>
              <Text size={12} color={this.state.twiteer==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.twiteer==undefined?'':Linking.openURL(this.state.twiteer).catch(err => console.error('An error occurred', err))}>{this.state.twiteer==undefined?'n/a':'Ir a Twiteer'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Instagram</Text>
              <Text size={12} color={this.state.instagram==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.instagram==undefined?'':Linking.openURL(this.state.instagram).catch(err => console.error('An error occurred', err))}>{this.state.instagram==undefined?'n/a':'Ir a Instagram'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Whatsapp</Text>
              <Text size={12} color={this.state.whatsapp==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.whatsapp==undefined?'':Linking.openURL("whatsapp://send?text=Tu mensaje&phone="+this.state.whatsapp+"&abid="+this.state.whatsapp).catch(err => console.error('An error occurred', err))}>{this.state.whatsapp==undefined?'n/a':'Ir a Whatsapp'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Web</Text>
              <Text size={12} color={this.state.web==undefined?theme.COLORS.BLACK:"#3333ff"} onPress={() => this.state.web==undefined?'':Linking.openURL(this.state.web).catch(err => console.error('An error occurred', err))}>{this.state.web==undefined?'n/a':'Ir a Página Web'}</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 10, alignItems: 'baseline' }}>
              <Text size={16}>Horario</Text>
              <Text size={12}>{this.state.workingHours}</Text>
            </Block>
            {photos}
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>""</Text>
              <Text size={12}>""</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>""</Text>
              <Text size={12}>""</Text>
            </Block>
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={16}>""</Text>
              <Text size={12}>""</Text>
            </Block>
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: -HeaderHeight * 2,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: "#3333ff",
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 7,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  },
});
