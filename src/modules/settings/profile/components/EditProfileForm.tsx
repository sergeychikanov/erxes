import { UserCommonInfos } from 'modules/auth/components';
import { IUser, IUserDoc } from 'modules/auth/types';
import { Button, Form } from 'modules/common/components';
import { ModalFooter } from 'modules/common/styles/main';
import { __ } from 'modules/common/utils';
import { Alert } from 'modules/common/utils';
import { regexEmail } from 'modules/customers/utils';
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { PasswordConfirmation } from '.';

type Props = {
  currentUser: IUser;
  closeModal: () => void;
  save: (
    variables: IUserDoc & { password?: string },
    callback: () => void
  ) => void;
};

type State = {
  avatar: string;
  isShowPasswordPopup: boolean;
};

class EditProfile extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { currentUser } = props;
    const { details } = currentUser;

    this.state = {
      avatar: details ? details.avatar || '' : '',
      isShowPasswordPopup: false
    };
  }

  getInputElementValue(id) {
    return (document.getElementById(id) as HTMLInputElement).value;
  }

  closeConfirm = () => {
    this.setState({ isShowPasswordPopup: false });
  };

  closeAllModals = () => {
    this.closeConfirm();
    this.props.closeModal();
  };

  handleSubmit = docs => {
    this.props.save(
      {
        username: docs.username,
        email: docs.email,
        details: {
          avatar: this.state.avatar,
          shortName: docs.shortName,
          fullName: docs.fullName,
          position: docs.position,
          location: docs.userLocation,
          description: docs.description
        },
        links: {
          linkedIn: docs.linkedin,
          twitter: docs.twitter,
          facebook: docs.facebook,
          youtube: docs.youtube,
          github: docs.github,
          website: docs.website
        },
        password: docs.password
      },
      this.closeAllModals
    );
  };

  onAvatarUpload = url => {
    this.setState({ avatar: url });
  };

  onSuccess = docs => {
    return this.handleSubmit(docs);
  };

  isValidEmail = () => {
    return regexEmail.test(this.getInputElementValue('email'));
  };

  showConfirm = () => {
    return this.setState({ isShowPasswordPopup: true });
  };

  renderPasswordConfirmationModal() {
    return (
      <Modal show={this.state.isShowPasswordPopup} onHide={this.closeConfirm}>
        <Modal.Header closeButton={true}>
          <Modal.Title>{__('Enter your password to Confirm')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PasswordConfirmation
            onSuccess={this.handleSubmit}
            closeModal={this.closeConfirm}
          />
        </Modal.Body>
      </Modal>
    );
  }

  render() {
    return (
      <>
        <Form onSubmit={this.showConfirm}>
          <UserCommonInfos
            user={this.props.currentUser}
            onAvatarUpload={this.onAvatarUpload}
          />

          <ModalFooter>
            <Button
              btnStyle="simple"
              type="button"
              onClick={this.props.closeModal}
              icon="cancel-1"
            >
              Cancel
            </Button>

            <Button btnStyle="success" icon="checked-1" type="submit">
              Save
            </Button>
          </ModalFooter>
        </Form>
        {this.renderPasswordConfirmationModal()}
      </>
    );
  }
}

export default EditProfile;
