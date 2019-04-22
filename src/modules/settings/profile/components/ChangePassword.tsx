import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'modules/common/components';
import { ModalFooter } from 'modules/common/styles/main';
import { __ } from 'modules/common/utils';
import * as React from 'react';

type Props = {
  save: (
    save: { currentPassword: string; newPassword: string; confirmation: string }
  ) => void;
  closeModal: () => void;
};

class ChangePassword extends React.Component<Props> {
  handleSubmit = e => {
    e.preventDefault();

    this.props.save({
      currentPassword: (document.getElementById(
        'current-password'
      ) as HTMLInputElement).value,
      newPassword: (document.getElementById('new-password') as HTMLInputElement)
        .value,
      confirmation: (document.getElementById(
        'new-password-confirmation'
      ) as HTMLInputElement).value
    });

    this.props.closeModal();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <ControlLabel required={true}>Current Password</ControlLabel>
          <FormControl
            type="password"
            placeholder={__('Current password')}
            id="current-password"
            required={true}
          />
        </FormGroup>

        <br />

        <FormGroup>
          <ControlLabel required={true}>New Password</ControlLabel>
          <FormControl
            type="password"
            name="newPassword"
            placeholder={__('Enter new password')}
            id="new-password"
            required={true}
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel required={true}>
            Re-type Password to confirm
          </ControlLabel>
          <FormControl
            type="password"
            name="confirmationPassword"
            placeholder={__('Re-type password')}
            id="new-password-confirmation"
            validations="equalsField:newPassword"
            validationError="Your password and confirmation password do not match"
            required={true}
          />
        </FormGroup>
        <ModalFooter>
          <Button
            btnStyle="simple"
            onClick={this.props.closeModal}
            icon="cancel-1"
          >
            Close
          </Button>

          <Button btnStyle="success" type="submit" icon="checked-1">
            Save
          </Button>
        </ModalFooter>
      </Form>
    );
  }
}

export default ChangePassword;
