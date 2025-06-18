
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('jewelry', 'idol')),
  subcategory TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  description TEXT NOT NULL,
  details TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  weight TEXT NOT NULL,
  material TEXT NOT NULL,
  dimensions TEXT,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access, admin write access)
CREATE POLICY "Anyone can view products" 
  ON public.products 
  FOR SELECT 
  USING (true);

CREATE POLICY "Only authenticated users can create products" 
  ON public.products 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update products" 
  ON public.products 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete products" 
  ON public.products 
  FOR DELETE 
  USING (auth.role() = 'authenticated');

-- Create trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at 
  BEFORE UPDATE ON public.products 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
