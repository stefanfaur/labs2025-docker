


export interface ProductModel {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  type: 'pizza' | 'burger' | 'pasta';
}

