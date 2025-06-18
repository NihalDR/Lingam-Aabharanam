export type Product = {
  id: string;
  name: string;
  category: 'jewelry' | 'idol';
  subcategory: string;
  price: number;
  salePrice?: number;
  description: string;
  details: string;
  images: string[];
  weight: string;
  material: string;
  dimensions?: string;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
};

const PRODUCTS_STORAGE_KEY = 'admin_products';

// Default products that are always available
const defaultProducts: Product[] = [
  {
    id: 'rama-darbar-001',
    name: "Rama Darbar Silver Idol Set",
    category: 'idol',
    subcategory: "Religious Idols",
    price: 899,
    description: "Exquisite silver Rama Darbar set featuring Lord Rama, Sita, and Lakshmana",
    details: "This beautiful silver Rama Darbar set showcases intricate craftsmanship with detailed figurines of Lord Rama, Sita, and Lakshmana on an ornate base. Perfect for home temples and religious ceremonies.",
    images: ["/lingam-uploads/4864e13f-c954-497f-84b2-097115860304.png"],
    weight: "450 grams",
    material: "925 Sterling Silver",
    dimensions: "8 x 6 x 4 inches",
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'ganesha-arch-001',
    name: "Ganesha Temple Arch with Hanging Bells",
    category: 'idol',
    subcategory: "Temple Decoratives",
    price: 1299,
    description: "Ornate silver Ganesha temple arch with traditional hanging bells",
    details: "This magnificent temple arch features Lord Ganesha in the center with elaborate decorative work and traditional hanging bells. The intricate carvings and detailed craftsmanship make it perfect for temple decoration or home worship.",
    images: ["/lingam-uploads/bf0d11fb-2d0b-4723-99fd-12220fffcc95.png"],
    weight: "650 grams",
    material: "Pure Silver Plated",
    dimensions: "10 x 8 x 3 inches",
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-02')
  },
  {
    id: 'lakshmi-pendant-001',
    name: "Lakshmi Goddess Silver Pendant",
    category: 'jewelry',
    subcategory: "Pendants",
    price: 299,
    salePrice: 249,
    description: "Elegant silver pendant featuring Goddess Lakshmi with chain",
    details: "Beautiful silver pendant showcasing Goddess Lakshmi in traditional pose, symbolizing wealth and prosperity. Comes with a matching silver chain. Perfect for daily wear or special occasions.",
    images: ["/lingam-uploads/41168ef8-ac14-4b9b-a124-5c833b88e5b9.png"],
    weight: "25 grams",
    material: "925 Sterling Silver",
    dimensions: "2 x 1.5 inches",
    inStock: true,
    featured: false,
    createdAt: new Date('2024-01-03')
  },
  {
    id: 'lakshmi-lotus-001',
    name: "Lakshmi Lotus Throne Silver Pendant",
    category: 'jewelry',
    subcategory: "Pendants",
    price: 399,
    description: "Detailed silver pendant of Goddess Lakshmi seated on lotus with ornate design",
    details: "This exquisite pendant features Goddess Lakshmi seated on a lotus throne with intricate detailing and traditional motifs. The oval design with decorative border makes it a stunning piece of spiritual jewelry.",
    images: ["/lingam-uploads/9c5723ac-a40d-4312-9a6e-2bb7822705b6.png"],
    weight: "30 grams",
    material: "925 Sterling Silver",
    dimensions: "2.5 x 2 inches",
    inStock: true,
    featured: true,
    createdAt: new Date('2024-01-04')
  }
];

// Helper function to get products from localStorage
const getProductsFromStorage = (): Product[] => {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (!stored) {
      // If no products stored, initialize with default products
      saveProductsToStorage(defaultProducts);
      return defaultProducts;
    }
    
    const products = JSON.parse(stored);
    // Convert date strings back to Date objects
    const parsedProducts = products.map((product: any) => ({
      ...product,
      createdAt: new Date(product.createdAt)
    }));
    
    // Check if we need to add default products (if storage is empty or doesn't contain our defaults)
    const hasDefaults = defaultProducts.every(defaultProduct => 
      parsedProducts.some((p: Product) => p.id === defaultProduct.id)
    );
    
    if (!hasDefaults && parsedProducts.length < defaultProducts.length) {
      const mergedProducts = [...defaultProducts, ...parsedProducts.filter((p: Product) => 
        !defaultProducts.some(dp => dp.id === p.id)
      )];
      saveProductsToStorage(mergedProducts);
      return mergedProducts;
    }
    
    return parsedProducts;
  } catch (error) {
    console.error('Error reading products from localStorage:', error);
    saveProductsToStorage(defaultProducts);
    return defaultProducts;
  }
};

// Helper function to save products to localStorage
const saveProductsToStorage = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products to localStorage:', error);
  }
};

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  console.log('Fetching products from localStorage...');
  return getProductsFromStorage();
};

// Get featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  console.log('Fetching featured products from localStorage...');
  const products = getProductsFromStorage();
  return products.filter(product => product.featured);
};

// Get product by ID
export const getProductById = async (id: string): Promise<Product | undefined> => {
  console.log('Fetching product by ID:', id);
  const products = getProductsFromStorage();
  return products.find(product => product.id === id);
};

// Get products by category
export const getProductsByCategory = async (category: 'jewelry' | 'idol'): Promise<Product[]> => {
  console.log('Fetching products by category:', category);
  const products = getProductsFromStorage();
  return products.filter(product => product.category === category);
};

// Create a new product
export const createProduct = async (product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> => {
  console.log('Creating product with data:', product);
  
  // Validate required fields
  if (!product.name?.trim()) {
    throw new Error('Product name is required');
  }
  if (!product.price || product.price <= 0) {
    throw new Error('Valid product price is required');
  }
  if (!product.description?.trim()) {
    throw new Error('Product description is required');
  }
  
  const products = getProductsFromStorage();
  
  const newProduct: Product = {
    ...product,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    name: product.name.trim(),
    subcategory: product.subcategory.trim(),
    description: product.description.trim(),
    details: product.details.trim(),
    images: Array.isArray(product.images) ? product.images : [],
    weight: product.weight.trim(),
    material: product.material.trim(),
    dimensions: product.dimensions?.trim() || undefined,
    inStock: Boolean(product.inStock),
    featured: Boolean(product.featured)
  };
  
  products.push(newProduct);
  saveProductsToStorage(products);
  
  console.log('Successfully created product:', newProduct);
  return newProduct;
};

// Update a product
export const updateProduct = async (id: string, updates: Partial<Product>): Promise<Product | undefined> => {
  console.log('Updating product:', { id, updates });
  
  if (!id) {
    throw new Error('Product ID is required for update');
  }
  
  const products = getProductsFromStorage();
  const productIndex = products.findIndex(product => product.id === id);
  
  if (productIndex === -1) {
    console.log('No product found to update with ID:', id);
    return undefined;
  }
  
  // Apply updates
  const updatedProduct = { ...products[productIndex] };
  
  if (updates.name !== undefined) updatedProduct.name = updates.name.trim();
  if (updates.category !== undefined) updatedProduct.category = updates.category;
  if (updates.subcategory !== undefined) updatedProduct.subcategory = updates.subcategory.trim();
  if (updates.price !== undefined) updatedProduct.price = Number(updates.price);
  if (updates.salePrice !== undefined) updatedProduct.salePrice = updates.salePrice ? Number(updates.salePrice) : undefined;
  if (updates.description !== undefined) updatedProduct.description = updates.description.trim();
  if (updates.details !== undefined) updatedProduct.details = updates.details.trim();
  if (updates.images !== undefined) updatedProduct.images = Array.isArray(updates.images) ? updates.images : [];
  if (updates.weight !== undefined) updatedProduct.weight = updates.weight.trim();
  if (updates.material !== undefined) updatedProduct.material = updates.material.trim();
  if (updates.dimensions !== undefined) updatedProduct.dimensions = updates.dimensions?.trim() || undefined;
  if (updates.inStock !== undefined) updatedProduct.inStock = Boolean(updates.inStock);
  if (updates.featured !== undefined) updatedProduct.featured = Boolean(updates.featured);
  
  products[productIndex] = updatedProduct;
  saveProductsToStorage(products);
  
  console.log('Successfully updated product:', updatedProduct);
  return updatedProduct;
};

// Delete a product
export const deleteProduct = async (id: string): Promise<boolean> => {
  console.log('Deleting product with ID:', id);
  
  if (!id) {
    throw new Error('Product ID is required for deletion');
  }
  
  const products = getProductsFromStorage();
  const filteredProducts = products.filter(product => product.id !== id);
  
  if (filteredProducts.length === products.length) {
    console.log('No product found to delete with ID:', id);
    return false;
  }
  
  saveProductsToStorage(filteredProducts);
  console.log('Successfully deleted product');
  return true;
};

// Clear all products
export const clearAllProducts = async (): Promise<boolean> => {
  console.log('Clearing all products from localStorage...');
  
  try {
    localStorage.removeItem(PRODUCTS_STORAGE_KEY);
    console.log('Successfully cleared all products');
    return true;
  } catch (error) {
    console.error('Error clearing products:', error);
    return false;
  }
};

// Create these specific products based on uploaded images
export const createSpecificProducts = async (): Promise<Product[]> => {
  console.log('Creating specific products...');
  
  const specificProducts = [
    {
      name: "Rama Darbar Silver Idol Set",
      category: 'idol' as const,
      subcategory: "Religious Idols",
      price: 899,
      description: "Exquisite silver Rama Darbar set featuring Lord Rama, Sita, and Lakshmana",
      details: "This beautiful silver Rama Darbar set showcases intricate craftsmanship with detailed figurines of Lord Rama, Sita, and Lakshmana on an ornate base. Perfect for home temples and religious ceremonies.",
      images: ["/lingam-uploads/4864e13f-c954-497f-84b2-097115860304.png"],
      weight: "450 grams",
      material: "925 Sterling Silver",
      dimensions: "8 x 6 x 4 inches",
      inStock: true,
      featured: true
    },
    {
      name: "Ganesha Temple Arch with Hanging Bells",
      category: 'idol' as const,
      subcategory: "Temple Decoratives",
      price: 1299,
      description: "Ornate silver Ganesha temple arch with traditional hanging bells",
      details: "This magnificent temple arch features Lord Ganesha in the center with elaborate decorative work and traditional hanging bells. The intricate carvings and detailed craftsmanship make it perfect for temple decoration or home worship.",
      images: ["/lingam-uploads/bf0d11fb-2d0b-4723-99fd-12220fffcc95.png"],
      weight: "650 grams",
      material: "Pure Silver Plated",
      dimensions: "10 x 8 x 3 inches",
      inStock: true,
      featured: true
    },
    {
      name: "Lakshmi Goddess Silver Pendant",
      category: 'jewelry' as const,
      subcategory: "Pendants",
      price: 299,
      salePrice: 249,
      description: "Elegant silver pendant featuring Goddess Lakshmi with chain",
      details: "Beautiful silver pendant showcasing Goddess Lakshmi in traditional pose, symbolizing wealth and prosperity. Comes with a matching silver chain. Perfect for daily wear or special occasions.",
      images: ["/lingam-uploads/41168ef8-ac14-4b9b-a124-5c833b88e5b9.png"],
      weight: "25 grams",
      material: "925 Sterling Silver",
      dimensions: "2 x 1.5 inches",
      inStock: true,
      featured: false
    },
    {
      name: "Lakshmi Lotus Throne Silver Pendant",
      category: 'jewelry' as const,
      subcategory: "Pendants",
      price: 399,
      description: "Detailed silver pendant of Goddess Lakshmi seated on lotus with ornate design",
      details: "This exquisite pendant features Goddess Lakshmi seated on a lotus throne with intricate detailing and traditional motifs. The oval design with decorative border makes it a stunning piece of spiritual jewelry.",
      images: ["/lingam-uploads/9c5723ac-a40d-4312-9a6e-2bb7822705b6.png"],
      weight: "30 grams",
      material: "925 Sterling Silver",
      dimensions: "2.5 x 2 inches",
      inStock: true,
      featured: true
    }
  ];

  const createdProducts: Product[] = [];
  
  for (const productData of specificProducts) {
    try {
      const product = await createProduct(productData);
      createdProducts.push(product);
    } catch (error) {
      console.error('Error creating product:', productData.name, error);
    }
  }
  
  console.log(`Successfully created ${createdProducts.length} products`);
  return createdProducts;
};
