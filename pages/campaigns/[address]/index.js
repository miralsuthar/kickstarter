import React from "react";
import Link from "next/link";
import { Layout } from "../../../components/Layout";
import { Card, Grid, Button } from "semantic-ui-react";

import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
export default function CampaignShow({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
  address,
}) {
  const renderCards = () => {
    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaigns and can create request to withdrawl money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to became an approver",
      },
      {
        header: requestsCount,
        meta: "Number of request",
        description:
          "A request tries to withdraw money from the contract. Requset must be approved by the approvers",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to the campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description:
          "The balance is how much money this campaign has left to spend",
      },
    ];
    return <Card.Group items={items} />;
  };
  return (
    <Layout>
      <h3>Campaign Show</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>{renderCards()}</Grid.Column>

          <Grid.Column width={6}>
            <ContributeForm address={address} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <a>
                <Button primary>View Requests</Button>
              </a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  );
}

export const getServerSideProps = async (props) => {
  const campaign = Campaign(props.query.address);

  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};
