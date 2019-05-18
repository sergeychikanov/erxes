import { MainActionBar } from 'modules/boards/containers';
import { __ } from 'modules/common/utils';
import {
  BoardContainer,
  BoardContent,
  ScrolledContent
} from 'modules/deals/styles/common';
import { Header } from 'modules/layout/components';
import * as React from 'react';

type Props = {
  queryParams: any;
};

class DealBoard extends React.Component<Props> {
  renderContent() {
    return <div>Ticket</div>;
  }

  render() {
    const title = __('Ticket');

    return (
      <BoardContainer>
        <Header title={title} breadcrumb={[{ title }]} />
        <BoardContent transparent={true}>
          <MainActionBar type="ticket" />
          <ScrolledContent transparent={true}>
            {this.renderContent()}
          </ScrolledContent>
        </BoardContent>
      </BoardContainer>
    );
  }
}

export default DealBoard;