import { Link } from './link.interface';

export interface Category {
  id: string;
  name: string;
  iconUr: string;
  links: Array<Link>;
}
