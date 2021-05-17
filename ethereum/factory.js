import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x6BaBf1cCdD97C50F9cbbBAC063Ad75B59d9B07b0"
);

export default instance;
