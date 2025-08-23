
import { enhancedAssetCategories } from './enhancedAssetCategories';

// Legacy function maintained for backward compatibility
export const assetCategory = () => {
  return enhancedAssetCategories();
};

// Export the enhanced categories directly for new implementations
export { enhancedAssetCategories, getSubCategoriesForCategory, getCategoryByValue } from './enhancedAssetCategories';
