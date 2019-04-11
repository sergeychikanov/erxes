import Formsy from 'formsy-react';
import * as React from 'react';

type Prop = {
  onSubmit: (e: any) => void;
  children: React.ReactNode;
};

function Form({ onSubmit, children }: Prop) {
  return <Formsy onValidSubmit={onSubmit}>{children}</Formsy>;
}

export default Form;
