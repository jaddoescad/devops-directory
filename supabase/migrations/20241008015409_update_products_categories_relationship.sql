-- Step 1: Add a new column for the foreign key
ALTER TABLE public.products ADD COLUMN category_id UUID;

-- Step 2: Create a foreign key constraint
ALTER TABLE public.products
ADD CONSTRAINT fk_products_category
FOREIGN KEY (category_id)
REFERENCES public.categories(id);

-- Step 3: Update the existing data (if any)
-- This step assumes that the category names in the products table
-- match the names in the categories table
UPDATE public.products
SET category_id = (
  SELECT id FROM public.categories
  WHERE categories.name = products.categories
);

-- Step 4: Remove the existing index on the old categories column
DROP INDEX IF EXISTS idx_products_categories;

-- Step 5: Drop the old categories column
ALTER TABLE public.products DROP COLUMN categories;

-- Step 6: Rename the new column to categories
ALTER TABLE public.products RENAME COLUMN category_id TO categories;

-- Step 7: Make the categories column NOT NULL if required
ALTER TABLE public.products ALTER COLUMN categories SET NOT NULL;

-- Step 8: Create an index on the new categories column for better performance
CREATE INDEX idx_products_categories ON public.products(categories);

-- Note: Remember to update your application code to reflect this change in the database schema.
-- Queries that were using the old text-based categories column will need to be updated
-- to use the new UUID-based foreign key relationship.