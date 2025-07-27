import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CABINET_WIDTH = SCREEN_WIDTH * 0.65;
const CABINET_HEIGHT = CABINET_WIDTH / 0.87; // aspect ratio 0.87 (w/h)

export default function Wardrobe() {
  const categories = [
    { name: 'Tops', icon: require('../assets/tops-icon.png'), route: '/category' as const, defaultType: 'T-shirt', subcategories: [
      { name: 'T-shirt', type: 'T-shirt' },
      { name: 'Formals', type: 'Formals' },
      { name: 'Jackets/sweatshirt', type: 'Jackets/sweatshirt' },
      { name: 'Shirt/camisole', type: 'Shirt/camisole' },
    ] },
    { name: 'Bottoms', icon: require('../assets/bottoms-icon.png'), route: '/bottoms-category' as const, defaultType: 'Jeans', subcategories: [
      { name: 'Jeans', type: 'Jeans' },
      { name: 'Trousers', type: 'Trousers' },
      { name: 'Shorts', type: 'Shorts' },
      { name: 'Skirts', type: 'Skirts' },
      { name: 'Leggings', type: 'Leggings' },
      { name: 'Joggers', type: 'Joggers' },
    ] },
    { name: 'Shoes', icon: require('../assets/shoes-icon.png'), route: '/shoes-category' as const, defaultType: 'Sneakers', subcategories: [
      { name: 'Sneakers', type: 'Sneakers' },
      { name: 'Heels', type: 'Heels' },
      { name: 'Boots', type: 'Boots' },
      { name: 'Sandals', type: 'Sandals' },
      { name: 'Flats', type: 'Flats' },
      { name: 'Loafers', type: 'Loafers' },
    ] },
    { name: 'Accessories', icon: require('../assets/accessories-icon.png'), route: '/accessories-category' as const, defaultType: 'Bags', subcategories: [
      { name: 'Bags', type: 'Bags' },
      { name: 'Jewelry', type: 'Jewelry' },
      { name: 'Belts', type: 'Belts' },
      { name: 'Scarves', type: 'Scarves' },
      { name: 'Hats', type: 'Hats' },
      { name: 'Sunglasses', type: 'Sunglasses' },
    ] },
  ];

  const handleCategoryPress = (category: typeof categories[0]) => {
    router.push({ pathname: category.route }); // No type param, show subcategory grid
  };

  const handleSubcategoryPress = (category: typeof categories[0], subcategory: { name: string, type: string }) => {
    router.push({ pathname: category.route, params: { type: subcategory.type } });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.gCircle}><Text style={styles.gText}>G</Text></View>
        <Text style={styles.headerText}>GLAMORA</Text>
      </View>
      {/* Cabinet background and categories */}
      <View style={styles.cabinetContainer}>
        <Image source={require('../assets/cabinet.png')} style={styles.cabinetImage} resizeMode="contain" />
        <View style={styles.categoriesGridOverlay}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            {categories.slice(0, 2).map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
              >
                <Image source={category.icon} style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            {categories.slice(2, 4).map((category, index) => (
              <TouchableOpacity
                key={index + 2}
                style={styles.categoryCard}
                onPress={() => handleCategoryPress(category)}
              >
                <Image source={category.icon} style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="shirt" size={24} color="#333" />
          <Text style={[styles.navText, styles.activeText]}>Wardrobe</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/scan')}>
          <Ionicons name="camera" size={24} color="#666" />
          <Text style={styles.navText}>Scan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/marketplace')}>
          <Ionicons name="cart" size={24} color="#333" />
          <Text style={[styles.navText, styles.activeText]}>Market</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
          <Ionicons name="person" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F3F0',
    paddingBottom: 90, // Add extra space for the fixed footer
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 24,
    backgroundColor: '#F9F3F0',
  },
  gCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#4B2E2B',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  gText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B2E2B',
    fontFamily: 'serif',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4B2E2B',
    fontFamily: 'serif',
    letterSpacing: 1,
  },
  cabinetContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cabinetImage: {
    width: '100%',
    height: 600, // Even larger cabinet
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  categoriesGridOverlay: {
    position: 'absolute',
    top: '18%',
    left: 0,
    right: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center', // Center the grid
    alignItems: 'center',
    width: '100%',
    height: '70%',
    paddingHorizontal: 0,
  },
  categoryCard: {
    width: 140,
    height: 140,
    backgroundColor: '#fff',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center',
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    backgroundColor: '#F5F2EF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  activeText: {
    color: '#333',
    fontWeight: 'bold',
  },
  logoIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 12,
  },
}); 