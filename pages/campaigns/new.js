import React, { useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
// import { Link } from "next/link";
import { useRouter } from "next/router";

import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";
import { Layout } from "../../components/Layout";

const CampaignNew = () => {
  const router = useRouter();
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
  };

  return (
    <div>
      <Layout>
        <h2>Create Campaign</h2>
        <Form onSubmit={onSubmit} warning={!!errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              type="number"
              labelPosition="right"
              value={minimumContribution}
              onChange={(e) => setMinimumContribution(e.target.value)}
            />
          </Form.Field>
          <Message warning header="Oops!" content={errorMessage} />
          <Button loading={loading} primary type="submit">
            Create
          </Button>
        </Form>
      </Layout>
    </div>
  );
};

export default CampaignNew;
