import {Brand} from './brand';

export interface CategoryDTO {
  id?: number;
  name?: string;
  brandList?: Brand[];
}
