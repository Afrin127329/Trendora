interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    slug: string;
  };
  quantity: number;
  shipping: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
