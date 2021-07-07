import { RouterState } from 'connected-react-router';

export interface Desination {
  route: string;
  name: string;
  icon: string;
}

export interface FormField {
  value: any;
  dirty: boolean;
  error: string;
  required: boolean;
}

export interface State {
  drawer: {
    open: boolean;
    destinations: Desination[];
  };
  modal: {
    open: boolean;
    title: string;
    type: string;
    formData: {
      [formField: string]: FormField;
    };
  };
  router: RouterState;
};
