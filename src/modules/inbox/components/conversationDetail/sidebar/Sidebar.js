import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from 'modules/layout/components';
import { Spinner } from 'modules/common/components';
import ConversationDetails from './ConversationDetails';
import { EditInformation } from 'modules/customers/containers';
import { CompanyAssociate } from 'modules/companies/containers';
import { DealSection } from 'modules/deals/containers';
import { SidebarCounter } from 'modules/layout/styles';

const propTypes = {
  conversation: PropTypes.object,
  customer: PropTypes.object,
  customerId: PropTypes.string,
  refetch: PropTypes.func,
  loading: PropTypes.bool,
  showSectionContent: PropTypes.func,
  queryParams: PropTypes.object
};

class Sidebar extends Component {
  getChildContext() {
    const { showSectionContent, queryParams } = this.props;

    return { showSectionContent, queryParams };
  }

  renderMessengerData() {
    const { conversation } = this.props;
    const customer = conversation.customer || {};
    const integration = conversation.integration || {};
    const customData = customer.getMessengerCustomData;

    if (integration.kind === 'messenger' && customData.length) {
      return customData.map(data => (
        <li key={data.value}>
          {data.name}
          <SidebarCounter>{data.value}</SidebarCounter>
        </li>
      ));
    }

    return null;
  }

  renderSectionBottom(customer) {
    const { showDeal } = this.props.queryParams;

    return (
      <Fragment>
        <CompanyAssociate data={customer} />
        <DealSection customerId={showDeal ? customer._id : null} />
      </Fragment>
    );
  }

  render() {
    const {
      conversation,
      refetch,
      customer,
      queryParams,
      loading
    } = this.props;

    if (customer && conversation) {
      return (
        <EditInformation
          conversation={conversation}
          sectionTop={<ConversationDetails conversation={conversation} />}
          sectionBottom={this.renderSectionBottom(customer)}
          customer={customer}
          refetch={refetch}
          queryParams={queryParams}
          otherProperties={this.renderMessengerData()}
        />
      );
    }

    return <Wrapper.Sidebar full>{loading && <Spinner />}</Wrapper.Sidebar>;
  }
}

Sidebar.propTypes = propTypes;

Sidebar.childContextTypes = {
  showSectionContent: PropTypes.func,
  queryParams: PropTypes.object
};

export default Sidebar;