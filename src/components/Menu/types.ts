import { IconName } from '../Icon';

export interface MenuItem {
  class?: string;
  label: string;
  to?: string;
  disabled?: boolean;
  visible?: boolean;
  target?: string;
  key: string;
  icon?: IconName;
  clickHandler?: () => void;
}

export interface MenuItemParent
  extends Pick<MenuItem, 'icon' | 'key' | 'label'> {
  items: MenuItem;
}
