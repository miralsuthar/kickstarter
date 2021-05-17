import React from "react";
import { Button, Card } from "semantic-ui-react";
import Link from "next/link";

import factory from "../ethereum/factory";
import { Layout } from "../components/Layout";
export default function CampaignIndex({ campaigns }) {
  const renderCampaigns = () => {
    const items = campaigns.map((address) => {
      return {
        header: address,
        description: (
          <Link href="/campaigns/[address]" as={`/campaigns/${address}`}>
            <a>View Campaign</a>
          </Link>
        ),
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <Button
            content="Create Campaign"
            icon="add circle"
            labelPosition="left"
            primary
            floated="right"
          />
        </Link>

        {renderCampaigns()}
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  return {
    props: {
      campaigns,
    },
  };
};
