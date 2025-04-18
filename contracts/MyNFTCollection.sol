// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFTCollection is ERC721URIStorage, Ownable {

event Minted(address indexed _from, uint256 indexed _tokenId, string _tokenURI);
event Burned(address indexed _from, uint256 indexed _tokenId);
event Withdrawn(address indexed _from, uint256 amount);


    uint256 public constant MAX_SUPPLY = 1000;
    uint public constant MAX_PER_WALLET = 5;
    uint public constant MIN_PRICE = 0.001 ether;
    uint public totalMinted;

    string public baseURI = "ipfs://QmYourIPFSHashHere/";

    mapping(address => uint256) public mintedCount;

    constructor() ERC721("My NFT Collection", "MNFT") Ownable(msg.sender) {}

    function mintNFT(string memory tokenURI) public payable {
        require(totalMinted < MAX_SUPPLY, 'All nft have been minted!');
        require(mintedCount[msg.sender] < MAX_PER_WALLET, 'You already minted the max allowed!');
        require(msg.value >= MIN_PRICE, 'Not enough ETH to mint NFT');

        uint256 tokenId = totalMinted + 1;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);

        mintedCount[msg.sender]++;
        totalMinted++;

        emit Minted(msg.sender, tokenId, tokenURI);
    }

    function burnNFT(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, 'You are not owner of this NFT');
        _burn(tokenId);

        
        emit Burned(msg.sender, tokenId);


    }

    function withdrawFund() public onlyOwner {
        uint amount = address(this).balance;
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "Transfer failed");

        emit Withdrawn(msg.sender, amount);
    }
    

    function getOwnedTokens(address user) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(user);
        uint256[] memory ownedTokens = new uint256[](balance);

        uint256 count = 0;
        for(uint256 i = 1; i <= totalMinted; i++) {
            if (ownerOf(i) == user) {
                ownedTokens[count] = i;
                count++;
            }
        }
        return ownedTokens;
    }

    function getContractInfo() public view returns (
        uint256 total,
        uint256 available,
        uint256 price,
        address admin
    ) {
         return(totalMinted, MAX_SUPPLY - totalMinted, MIN_PRICE, owner());
    }
}