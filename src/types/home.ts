export interface Theme {
  bg: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  inputBg: string;
  border: string;
  bannerBg: string;
  bannerTitle: string;
  bannerSubtitle: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  bgColor: string;
  iconColor: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  image: string;
  categoryId?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
