// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
 
contract ZKSyncNFT is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
 
    constructor() ERC721("ZKSyncNFT", "ZKN") {}
 
    function mintNft(address receiver) external returns (uint256) {
        _tokenIds.increment();
 
        uint256 newNftTokenId = _tokenIds.current();
        _mint(receiver, newNftTokenId);
 
        return newNftTokenId;
    }
    function _baseURI() internal pure override returns (string memory) {
        return "https://lgtm.lol/metadata/";
    }
}
