import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";

import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";
import { Layout } from "../../../../components/Layout";
const newRequest = ({ address }) => {
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [recepientAddress, setRecepientAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const campaign = Campaign(address);
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(value, "ether"),
          recepientAddress
        )
        .send({
          from: accounts[0],
        });
      setLoading(false);
      setDescription("");
      setValue("");
      setRecepientAddress("");
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
      setDescription("");
      setValue("");
      setRecepientAddress("");
    }
  };
  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>
          <Button primary>Back</Button>
        </a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmitHandler} warning={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in ether</label>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Receipient</label>
          <Input
            value={recepientAddress}
            onChange={(e) => setRecepientAddress(e.target.value)}
          />
        </Form.Field>
        <Button loading={loading} primary>
          Create
        </Button>
        <Message warning header="Oops!" content={errorMessage} />
      </Form>
    </Layout>
  );
};

export const getServerSideProps = (props) => {
  const { address } = props.query;
  return {
    props: {
      address,
    },
  };
};

export default newRequest;
