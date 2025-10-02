== Logs ==
Deployer: 0xFDa522b8c863ed7Abf681d0c86Cc0c5DCb95d4E6
Admin: 0xFDa522b8c863ed7Abf681d0c86Cc0c5DCb95d4E6
Deploying to U2U testnet...
Deploying mock TREX compliance contracts...
MockIdentityRegistry deployed at: 0x56bc000bb3393122B7ef68A372bf51d13EB1f25D
MockModularCompliance deployed at: 0x67A80B12c3b7Eb8383ffe4e0494c8dE9C319487A
MockClaimIssuerRegistry deployed at: 0x67E5067d72C434D947c861Fa2B571e46e37C6341
MockClaimRegistry deployed at: 0xB7Ad4322ba8fe6e8Ea9c27a18c47B2E1572812a3
MockValidationLibrary deployed at: 0xA8c793e12c2731e9B2eE4EB65E31027833830c76
Deploying implementation contracts...
Implementation contracts deployed
ProplexCompany impl: 0xC53785ABDDD0eA3a2Ae9eaD19AA13D0dD507b8CE
ProplexRealEstateToken impl: 0xd72516bF2809F231142783bc6D6Ebdd06370cf71
ProplexDAO impl: 0x08a5AAdB6AfdEf03013904782767857868E7d55d
ProplexEscrow impl: 0x89cB8c5E197EABbFF001282E06C68e7e6b0ed8a6
ProplexOrderManager impl: 0xb6A409b8C74f3F932315a47A190398e2A880D1Df
Deploying registry ...
Registry deployed at: 0xCb3057b67856f41106ca84eac0EA901D9cC6A81b
Deploying company factory...
Company Factory deployed at: 0x8180b9273371fDce9c80B1F2DE7d54158FAc6eb9
Deploying real estate factory...
Real Estate Factory deployed at: 0x851eB7027dB7baBbbC1EFF22c4b0566d31B0cF38

=== Deployment Summary ===
Network: U2U Testnet
Chain ID: 2484
Deployer: 0xFDa522b8c863ed7Abf681d0c86Cc0c5DCb95d4E6
Admin: 0xFDa522b8c863ed7Abf681d0c86Cc0c5DCb95d4E6

--- Core Contracts (Proxies) ---
ProplexRegistry: 0xCb3057b67856f41106ca84eac0EA901D9cC6A81b
ProplexCompanyFactory: 0x8180b9273371fDce9c80B1F2DE7d54158FAc6eb9
ProplexRealEstateTokenFactory: 0x851eB7027dB7baBbbC1EFF22c4b0566d31B0cF38

--- Implementation Contracts ---
ProplexCompany (impl): 0xC53785ABDDD0eA3a2Ae9eaD19AA13D0dD507b8CE
ProplexRealEstateToken (impl): 0xd72516bF2809F231142783bc6D6Ebdd06370cf71
ProplexEscrow (impl): 0x89cB8c5E197EABbFF001282E06C68e7e6b0ed8a6
ProplexOrderManager (impl): 0xb6A409b8C74f3F932315a47A190398e2A880D1Df
ProplexDAO (impl): 0x08a5AAdB6AfdEf03013904782767857868E7d55d

--- Mock TREX Compliance Contracts ---
MockIdentityRegistry: 0x56bc000bb3393122B7ef68A372bf51d13EB1f25D
MockModularCompliance: 0x67A80B12c3b7Eb8383ffe4e0494c8dE9C319487A
MockClaimIssuerRegistry: 0x67E5067d72C434D947c861Fa2B571e46e37C6341
MockClaimRegistry: 0xB7Ad4322ba8fe6e8Ea9c27a18c47B2E1572812a3
MockValidationLibrary: 0xA8c793e12c2731e9B2eE4EB65E31027833830c76

=== Deployment Complete ===

--- Verification ---
Registry initialized: true
Company Factory initialized: true
Real Estate Factory initialized: true
Admin has ADMIN_ROLE on Real Estate Factory: true
Mock contracts deployed: true

//example flow:

# balances before place order:

Project Token Balance
Escrow Balance: 500000000000000000000
User Balance: 0
Admin Balance: 0
Native Token Balance
Escrow Balance: 0
User Balance: 9248178240052206545
Admin Balance: 30612843758716390463

# balances after place order:

orderId: 0xe495951c53e424b02b0b36d392b8e4f930df15d29a6ce62adee4b0debe6862bd

Project Token Balance
Escrow Balance: 500000000000000000000
User Balance: 0
Admin Balance: 0
Native Token Balance
Escrow Balance: 2150000000000000000
User Balance: 7097833436641835125
Admin Balance: 30612843758716390463

# balances after finalize order

== Logs ==
Project Token Balance
Escrow Balance: 498000000000000000000
User Balance: 2000000000000000000
Admin Balance: 0
Native Token Balance
Escrow Balance: 2150000000000000000
User Balance: 7097735656434649648
Admin Balance: 30612843758716390463

# balances after signRelease

== Logs ==
Project Token Balance
Escrow Balance: 498000000000000000000
User Balance: 2000000000000000000
Admin Balance: 0
Native Token Balance
Escrow Balance: 0
User Balance: 7097735656434649648
Admin Balance: 32762794813304051763