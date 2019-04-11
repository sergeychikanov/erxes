import { UserCommonInfos } from 'modules/auth/components';
import {
  ControlLabel,
  FormControl,
  FormGroup
} from 'modules/common/components';
import { ColumnTitle } from 'modules/common/styles/main';
import { __ } from 'modules/common/utils';
import { IUserGroup } from 'modules/settings/permissions/types';
import * as React from 'react';
import Select from 'react-select-plus';
import { IChannel } from '../../channels/types';
import { Form as CommonForm } from '../../common/components';
import { ICommonFormProps } from '../../common/types';

type Props = {
  channels: IChannel[];
  groups: any;
  selectedChannels: IChannel[];
  selectedGroups: IUserGroup[];
} & ICommonFormProps;

type State = {
  avatar: string;
  selectedChannels: IChannel[];
  selectedGroups: IUserGroup[];
};

class UserForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const user = props.object || { details: {} };
    const defaultAvatar = '/images/avatar-colored.svg';

    this.state = {
      avatar: user.details.avatar || defaultAvatar,
      selectedChannels: this.generateChannelsParams(props.selectedChannels),
      selectedGroups: this.generateGroupsParams(props.selectedGroups)
    };
  }

  onAvatarUpload = url => {
    this.setState({ avatar: url });
  };

  generateChannelsParams = channels => {
    return channels.map(channel => ({
      value: channel._id,
      label: channel.name
    }));
  };

  generateGroupsParams = groups => {
    return groups.map(group => ({
      value: group._id,
      label: group.name
    }));
  };

  collectValues = items => {
    return items.map(item => item.value);
  };

  renderGroups() {
    const self = this;
    const { groups } = this.props;

    const onChange = selectedGroups => {
      this.setState({ selectedGroups });
    };

    return (
      <FormGroup>
        <ControlLabel>Choose the user groups</ControlLabel>
        <br />

        <Select
          placeholder={__('Choose groups')}
          value={self.state.selectedGroups}
          options={self.generateGroupsParams(groups)}
          onChange={onChange}
          multi={true}
        />
      </FormGroup>
    );
  }

  renderChannels() {
    const self = this;
    const { channels } = this.props;

    const onChange = selectedChannels => {
      self.setState({ selectedChannels });
    };

    return (
      <FormGroup>
        <ControlLabel>Choose the channels</ControlLabel>
        <br />

        <Select
          placeholder={__('Choose channels')}
          value={self.state.selectedChannels}
          options={self.generateChannelsParams(channels)}
          onChange={onChange}
          multi={true}
        />
      </FormGroup>
    );
  }

  getInputElementValue(id) {
    return (document.getElementById(id) as HTMLInputElement).value;
  }

  generateDoc = d => {
    const { selectedChannels, selectedGroups } = this.state;

    const doc = {
      username: d.username,
      email: d.email,
      details: {
        avatar: this.state.avatar,
        shortName: d.shortName,
        position: d.position,
        fullName: d.fullName,
        location: d.userLocation,
        description: d.description
      },
      channelIds: this.collectValues(selectedChannels),
      links: {
        linkedIn: d.linkedin,
        twitter: d.twitter,
        facebook: d.facebook,
        youtube: d.youtube,
        github: d.github,
        website: d.website
      },
      groupIds: this.collectValues(selectedGroups)
    };

    return { doc };
  };

  renderContent = () => {
    const { object } = this.props;
    const user = object || { details: {} };

    return (
      <div>
        <UserCommonInfos user={user} onAvatarUpload={this.onAvatarUpload} />
        <ColumnTitle>{__('Other')}</ColumnTitle>

        {this.renderChannels()}
        {this.renderGroups()}
      </div>
    );
  };

  render() {
    return (
      <CommonForm
        {...this.props}
        renderContent={this.renderContent}
        generateDoc={this.generateDoc}
      />
    );
  }
}

export default UserForm;
