import { Button, Form as Formsy } from 'modules/common/components';
import { ModalFooter } from 'modules/common/styles/main';
import * as React from 'react';
import { ICommonFormProps } from '../types';

type Props = {
  generateDoc: (e: any) => any;
  renderContent(): any;
};

class Form extends React.Component<Props & ICommonFormProps> {
  save = e => {
    this.props.save(
      this.props.generateDoc(e),
      this.props.closeModal,
      this.props.object
    );
  };

  render() {
    const { renderContent, closeModal } = this.props;

    return (
      <Formsy onSubmit={this.save}>
        {renderContent()}

        <ModalFooter>
          <Button
            btnStyle="simple"
            type="button"
            onClick={closeModal}
            icon="cancel-1"
          >
            Cancel
          </Button>

          <Button btnStyle="success" type="submit" icon="checked-1">
            Save
          </Button>
        </ModalFooter>
      </Formsy>
    );
  }
}

export default Form;
