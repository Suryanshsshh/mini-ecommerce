// Fetch products from dummyjson.com API
export const fetchProducts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products?limit=20');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    
    // Transform the data to match our expected format
    return data.products.map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.thumbnail,
      description: product.description
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    // Fallback to fakestoreapi if dummyjson fails
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products from fallback API');
      }
      const data = await response.json();
      return data.map(product => ({
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        stock: Math.floor(Math.random() * 50) + 1, // fakestoreapi doesn't have stock, so we generate it
        image: product.image,
        description: product.description
      }));
    } catch (fallbackError) {
      console.error('Error fetching from fallback API:', fallbackError);
      throw fallbackError;
    }
  }
};

