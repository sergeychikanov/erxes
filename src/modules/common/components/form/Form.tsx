import Formsy from 'formsy-react';
import * as React from 'react';

type Props = {
  onSubmit: (e: any) => void;
  children: React.ReactNode;
};

class Form extends React.Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      canSubmit: false
    };
  }
  enableButton = () => {
    this.setState({ canSubmit: false });
  };
  disableButton = () => {
    this.setState({ canSubmit: false });
  };
  render() {
    const { onSubmit, children } = this.props;

    return (
      <Formsy
        onValidSubmit={onSubmit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
      >
        {children}
      </Formsy>
    );
  }
}

export default Form;
