import InlineCode from "../components/inline-code";

export const ERC20MintBurn = {
  name: "ERC20 Token (Mintable, Burnable)",
  steps: [
    {
      paragraph1: {
        type: "jsx",
        content: (
          <p>
            Let's get started creating a mintable & burnable ERC20 token! The
            first step is to choose a name for your token:
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
            You're creating a variable supply ERC20 Token. This means, that once
            the token is deployed, you have the ability to create and burn
            tokens.
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
            will be able to create more tokens once you've deployed your
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
    {
      paragraph1: {
        type: "jsx",
        content: (
          <>
            <h2>Tutorial</h2>
            <p>
              This type of ERC20 Token can be “minted” (= create more tokens) or
              “burned” (= delete tokens).
            </p>
            <p>
              To make sure not anyone can make new tokens, this contract
              implements access control. When you deploy the contract, only{" "}
              <em>you</em> will be able to mint or burn tokens. You can give
              others permission to do so by calling
            </p>
            <InlineCode>
              grantRole("9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",{" "}
              {"<address>"})
            </InlineCode>{" "}
            <p>to allow them to mint or</p>
            <InlineCode>
              grantRole("3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848",{" "}
              {"<address>"})
            </InlineCode>{" "}
            <p>to allow them to burn tokens.</p>
            <p>If you provide <InlineCode>0x0000000000000000000000000000000000000000</InlineCode> as the address, everyone gets permission</p>
          </>
        ),
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
