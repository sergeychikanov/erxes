import {
  AvatarUpload,
  ControlLabel,
  FormControl,
  FormGroup
} from 'modules/common/components';
import {
  ColumnTitle,
  FormColumn,
  FormWrapper
} from 'modules/common/styles/main';
import { __ } from 'modules/common/utils';
import { timezones } from 'modules/settings/integrations/constants';
import * as React from 'react';
import { IUser } from '../types';

type Props = {
  user: IUser;
  onAvatarUpload: (url: string) => void;
};

class UserCommonInfos extends React.PureComponent<Props> {
  render() {
    const { user, onAvatarUpload } = this.props;
    const details = user.details || {};
    const links = user.links || {};

    return (
      <React.Fragment>
        <AvatarUpload avatar={details.avatar} onAvatarUpload={onAvatarUpload} />
        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Full name</ControlLabel>
              <FormControl
                type="text"
                name="fullName"
                defaultValue={details.fullName || ''}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Short name</ControlLabel>
              <FormControl
                type="text"
                name="shortName"
                defaultValue={details.shortName || ''}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel required={true}>Email</ControlLabel>
              <FormControl
                type="text"
                name="email"
                validations="isEmail"
                validationError="Not valid email format"
                value={user.email}
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                type="text"
                max={200}
                name="description"
                componentClass="textarea"
                value={details.description || ''}
                validations="maxLength:200"
                validationError="Description maximum length is 200 characters"
              />
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <ControlLabel required={true}>Username</ControlLabel>
              <FormControl
                type="text"
                name="username"
                defaultValue={user.username || ''}
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Position</ControlLabel>
              <FormControl
                type="text"
                name="position"
                defaultValue={details.position || ''}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                componentClass="select"
                value={details.location}
                name="userLocation"
                options={timezones}
              />
            </FormGroup>
          </FormColumn>
        </FormWrapper>
        <ColumnTitle>{__('Links')}</ColumnTitle>
        <FormWrapper>
          <FormColumn>
            <FormGroup>
              <ControlLabel>LinkedIn</ControlLabel>
              <FormControl
                type="text"
                name="linkedin"
                value={links.linkedIn || ''}
                validations="isUrl"
                validationError="Not valid link"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Twitter</ControlLabel>
              <FormControl
                type="text"
                name="twitter"
                value={links.twitter || ''}
                validations="isUrl"
                validationError="Not valid link"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Facebook</ControlLabel>
              <FormControl
                type="text"
                name="facebook"
                value={links.facebook || ''}
                validations="isUrl"
                validationError="Not valid link"
              />
            </FormGroup>
          </FormColumn>
          <FormColumn>
            <FormGroup>
              <ControlLabel>Youtube</ControlLabel>
              <FormControl
                type="text"
                name="youtube"
                value={links.youtube || ''}
                validations="isUrl"
                validationError="Not valid link"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Github</ControlLabel>
              <FormControl
                type="text"
                name="github"
                value={links.github || ''}
                validations="isUrl"
                validationError="Not valid link"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Website</ControlLabel>
              <FormControl
                type="text"
                name="website"
                value={links.website || ''}
                validations="isUrl"
                validationError="Not valid link"
              />
            </FormGroup>
          </FormColumn>
        </FormWrapper>
      </React.Fragment>
    );
  }
}

export default UserCommonInfos;
