import { TopLevelCategory, TopPageModel } from '../../intarfaces/page.interface';
import { ProductModel } from '../../intarfaces/product.interface';

export interface TopPageComponentProps {
	products: ProductModel[];
	page: TopPageModel;
	firstCategory: TopLevelCategory;
}
