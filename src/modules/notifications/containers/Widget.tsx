import gql from 'graphql-tag';
import { IRouterProps } from 'modules/common/types';
import React from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import { withProps } from '../../common/utils';
import Widget from '../components/Widget';
import { queries, subscriptions } from '../graphql';
import { NotificationsCountQueryResponse } from '../types';

type ContainerProps = {
  notificationCountQuery: NotificationsCountQueryResponse;
  currentUser?: any;
} & IRouterProps;

type WidgetProps = {
  currentUser?: any;
};

class WidgetContainer extends React.Component<ContainerProps> {
  componentWillMount() {
    const { notificationCountQuery, currentUser } = this.props;

    notificationCountQuery.subscribeToMore({
      document: gql(subscriptions.notificationNewToUser),
      variables: { userId: currentUser ? currentUser._id : null },
      updateQuery: () => {
        notificationCountQuery.refetch();
      }
    });
  }

  render() {
    const { notificationCountQuery, currentUser } = this.props;

    const updatedProps = {
      ...this.props,
      unreadCount: notificationCountQuery.notificationCounts
    };

    return <Widget {...updatedProps} />;
  }
}

export default withProps<WidgetProps>(
  compose(
    graphql<
      ContainerProps,
      NotificationsCountQueryResponse,
      { requireRead: boolean }
    >(gql(queries.notificationCounts), {
      name: 'notificationCountQuery',
      options: () => ({
        variables: {
          requireRead: true
        },
        notifyOnNetworkStatusChange: true
      })
    })
  )(withRouter<ContainerProps>(WidgetContainer))
);
