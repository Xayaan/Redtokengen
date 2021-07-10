export const ERC20 = {
  name: "ERC20 Token (Fixed Supply)",
  steps: [
    {
      paragraph1: {
        type: "jsx",
        content: (
          <p>
            Let's get started creating an ERC20 token! The first step is to
            choose a name for your token:
          </p>
        ),
      },
      name: {
        type: "input",
        inputType: "text",
        label: "Give your token a name",
        placeholder: "E.G. “MyToken”",
        required: true,
      },
      paragraph2: {
        type: "jsx",
        content: (
          <p>
            The “<em>Symbol</em>” is a short combination of letters that
            identify your token, like <em>UNI</em> for Uniswap and <em>BTC</em>{" "}
            for BitCoin
          </p>
        ),
      },
      symbol: {
        type: "input",
        inputType: "text",
        label: "Token Symbol",
        placeholder: "E.G. “MYT”",
        required: true,
      },
    },
    {
      paragraph1: {
        type: "jsx",
        content: (
          <p>
            You're creating a fixed supply ERC20 Token. This means, that once
            the token is deployed, no new tokens will ever be created.
          </p>
        ),
      },
      paragraph2: {
        type: "jsx",
        content: (
          <p>
            The first thing you need to choose is the decimal count. A token
            with nine decimals can be subdivided into pieces as small as{" "}
            <em>0.000000001</em> tokens.
          </p>
        ),
      },
      decimals: {
        type: "input",
        inputType: "number",
        label: "Decimals",
        placeholder: "Leave blank for 9 decimals",
      },
      paragraph3: {
        type: "jsx",
        content: (
          <p>
            This is the amount of tokens created when you launch the token. You
            will never be able to create more tokens once you've deployed your
            contract. (All tokens will be issued to your ethereum address)
          </p>
        ),
      },
      paragraph4: {
        type: "jsx",
        content: (
          <p>
            The token count is given in display units. This means that if you
            have 2 decimals, and enter 18 tokens, 1800 subtokens will be
            created. (= 18.00 full tokens)
          </p>
        ),
      },
      supply: {
        type: "input",
        inputType: "number",
        label: "Initial Supply (In Display Tokens)",
        placeholder: "18000",
        required: true,
      },
    },
  ],
  deploy: {
    address: '0x0000000000000000000000000000000000000000',
    relevantArgs: [
      { name: "name" },
      { name: "symbol" },
      { name: "decimals", cast: parseInt },
      { name: "supply", cast: parseInt },
      { name: "owner" },
    ],
  },
};
