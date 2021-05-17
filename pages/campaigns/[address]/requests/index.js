import React, { useEffect } from "react";
import { Button, Table } from "semantic-ui-react";
import Link from "next/link";

import { Layout } from "../../../../components/Layout";
import Campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

const RequestIndex = ({ address, requests, requestCount, approversCount }) => {
  const { Header, Row, HeaderCell, Body } = Table;

  // console.log(requests);
  // console.log(JSON.parse(requests));

  const renderRow = () => {
    return JSON.parse(requests).map((request, index) => {
      return (
        <RequestRow
          id={index}
          key={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };
  return (
    <Layout>
      <h3>Requests</h3>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>{renderRow()}</Body>
      </Table>
      <div>Found {requestCount} requests.</div>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary>Add Request</Button>
        </a>
      </Link>
    </Layout>
  );
};

export const getServerSideProps = async (props) => {
  const { address } = props.query;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();
  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );
  return {
    props: {
      address,
      requests: JSON.stringify(requests),
      requestCount,
      approversCount,
    },
  };
};

export default RequestIndex;
