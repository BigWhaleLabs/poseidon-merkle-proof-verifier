import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'

import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
import { cleanEnv, str, testOnly } from 'envalid'

dotenv.config()

const {
  CONTRACT_OWNER_PRIVATE_KEY,
  ETH_RPC,
  ETHERSCAN_API_KEY,
  COINMARKETCAP_API_KEY,
} = cleanEnv(process.env, {
  CONTRACT_OWNER_PRIVATE_KEY: str({
    devDefault: testOnly(
      '0000000000000000000000000000000000000000000000000000000000000000'
    ),
  }),
  ETH_RPC: str({ devDefault: testOnly('') }),
  ETHERSCAN_API_KEY: str({ devDefault: testOnly('') }),
  COINMARKETCAP_API_KEY: str({ devDefault: testOnly('') }),
})

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    deploy: {
      url: ETH_RPC,
      accounts: [CONTRACT_OWNER_PRIVATE_KEY],
    },
    local: {
      url: 'http://127.0.0.1:8545',
      accounts: [], // accounts private keys generated by the local node
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechain',
  },
}

export default config
