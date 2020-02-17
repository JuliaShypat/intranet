import { Link } from './link.interface';

export interface Category {
  id: string;
  name: string;
  iconUrl: string;
  links: Array<Link>;
}
