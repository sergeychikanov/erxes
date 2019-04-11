import * as React from 'react';
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from '../../../common/components';
import { ModalFooter } from '../../../common/styles/main';
import { IBrand } from '../types';

type Props = {
  brand?: IBrand;
  save: (
    params: {
      doc: {
        name: string;
        description: string;
      };
    },
    callback: () => void,
    brand?: IBrand
  ) => void;
  closeModal: () => void;
};

class BrandForm extends React.Component<Props, {}> {
  save = doc => {
    const { save, brand, closeModal } = this.props;
    save(this.generateDoc(doc), () => closeModal(), brand);
  };

  generateDoc = doc => {
    return {
      doc: {
        name: doc.brandName,
        description: doc.brandDescription
      }
    };
  };

  renderContent() {
    const object = this.props.brand || ({} as IBrand);

    return (
      <div>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>

          <FormControl
            name="brandName"
            value={object.name}
            type="text"
            required={true}
            validations="isEmail"
            validationError="Not valid email format"
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Name</ControlLabel>

          <FormControl value={object.name} type="text" required={true} />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>

          <FormControl
            name="brandDescription"
            componentClass="textarea"
            rows={5}
            value={object.description}
            validations="isEmail"
            validationError="Not valid email format"
          />
        </FormGroup>
      </div>
    );
  }

  render() {
    return (
      <Form onSubmit={this.save}>
        {this.renderContent()}
        <ModalFooter>
          <Button
            btnStyle="simple"
            type="button"
            icon="cancel-1"
            onClick={this.props.closeModal}
          >
            Cancel
          </Button>

          <Button btnStyle="success" icon="checked-1" type="submit">
            Save
          </Button>
        </ModalFooter>
      </Form>
    );
  }
}

export default BrandForm;
