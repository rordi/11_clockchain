# Clockchain repo

* app folder contains the vue.js single page app
* blockchain folder contains the dev environment for the blockchain stuff

## API calls (reading from and writing to the blockchain)
accesses the publicly accessible ethereum rinkeby test blockchain over the etherscan.io API

### Query Consumer Balance
`https://rinkeby.etherscan.io/api?action=eth_call&data=0x70a0823100000000000000000000000020749911477918efb7549d6621eb957d8afa137c&module=proxy&to=0x9946AC2aCc28Ca76ef26c85112a114C530211c42&apikey=9KWJ8VHX6I9Y72C91B8W2EG3ZGB6H7SDN1`

### Query Supplier Balance
`https://rinkeby.etherscan.io/api?action=eth_call&data=0x70a0823100000000000000000000000042c5F1D3Eb4192AF3D4ad27eE5a15f8e835ab79D&module=proxy&to=0x9946AC2aCc28Ca76ef26c85112a114C530211c42&apikey=9KWJ8VHX6I9Y72C91B8W2EG3ZGB6H7SDN1`

both queries return a JSON answer as follows:

```
{
	"jsonrpc": "2.0",
	"id": 1,
	"result": "0x0000000000000000000000000000000000000000000000000000000000000004"
}
```
where result is an integer value in hexadecimal notation


### Transfer one hour from consumer to supplier
* this is a pre-signed transaction that can only be fired once:
* stored in firebase (appState/transferUrl)
- [x] TODO: updated url


Made with ❤️ @ BaselHack 2017