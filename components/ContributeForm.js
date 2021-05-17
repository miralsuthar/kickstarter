import React, { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import { useRouter } from "next/router";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
const ContributeForm = ({ address }) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault;

    const campaign = Campaign(address);
    setLoading(true);
    try {
      setErrorMessage("");
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, "ether"),
      });
      setLoading(false);
      setValue("");
      router.replace(`/campaigns/${address}`);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message);
    }
  };
  return (
    <Form onSubmit={onSubmitHandler} warning={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          type="number"
          label="ether"
          labelPosition="right"
          onChange={(e) => setValue(e.target.value)}
        />
      </Form.Field>
      <Button loading={loading} primary>
        Contribute
      </Button>
      <Message warning header="Oops!" content={errorMessage} />
    </Form>
  );
};

export default ContributeForm;
