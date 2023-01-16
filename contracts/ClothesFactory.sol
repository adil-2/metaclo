// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ClothesFactory is ERC721URIStorage {
    using Counters for Counters.Counter;

    //Counters.Counter private dressonSale;
    Counters.Counter private dressCount;

    uint256 public PREZZO_LISTINO = 2 ether;

    address payable private ownerAdil;

    event DressItemCreated(
        uint256 tokenId,
        address seller,
        address owner,
        uint256 price
    );
    event DressonSale(uint256 tokenId, address owner, uint256 price);

    struct Dress {
        uint256 tokenId;
        address payable owner;
        string nome;
        uint256 price;
        bool onSale;
    }

    mapping(uint256 => Dress) private idToDress;

    constructor() ERC721("Dress", "DRS") {
        ownerAdil = payable(msg.sender);
    }

    function updatePrezzoListino(uint256 newPrice) public{
        require(msg.sender == ownerAdil, "non sei autorizzato");
        PREZZO_LISTINO = newPrice;
    }

    //stiamo mintando un nuovo NFT
    function createDress(string memory TokenURI, string memory _n, bool _onSale, uint256 prezzo) public payable returns (uint256) {
        require(prezzo > 0, "stiamo lavorando per la chiesa? :)");

        require(msg.value == PREZZO_LISTINO);

        dressCount.increment();
        uint256 newDressId = dressCount.current();

        address a = msg.sender;
        _mint(a, newDressId);
        _setTokenURI(newDressId, TokenURI);

        Dress memory t = Dress(
            newDressId,
            payable(msg.sender),
            _n,
            prezzo,
            _onSale
        );

        idToDress[newDressId] = t;
        payable(ownerAdil).transfer(PREZZO_LISTINO);

        return newDressId;
    }

    function createDressMarketSale(uint256 _dressId) public payable {
        
        uint256 price = idToDress[_dressId].price * (1 ether);
        
        address payable ow = idToDress[_dressId].owner;
        require(msg.value == price, "non sono stati versati abbastanza fondi");

        

        idToDress[_dressId].owner = payable(msg.sender);
        idToDress[_dressId].onSale = false;
        

        //dressonSale.increment();
         _transfer(ow, msg.sender, _dressId);
       
        
        payable(ow).transfer(msg.value);
    }

    function getAllOnSale() public view returns (uint256[] memory) {
        uint256 itemCount = dressCount.current();
        //uint256 unonSale = itemCount - dressonSale.current();
        uint256 j = 0;

        uint256[] memory allId = new uint256[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            if (idToDress[i + 1].onSale == true) {
                allId[j] = idToDress[i + 1].tokenId;
                j++;
            }
        }
        return allId;
    }

    function getMyDress() public view returns(uint256[] memory){    
        uint256 j = 0;
        
        uint256[] memory allMyId = new uint256[](dressCount.current());
        
        for (uint256 i = 0; i < dressCount.current(); i++) {
                if(address(idToDress[i+1].owner) == address(msg.sender)){
                allMyId[j] = idToDress[i+1].tokenId;
                j++;
            }       
        }
        return allMyId; 
    } 

    //funcione che ritorna il prezzo per creare un nuovo item
    function getPrezzoListino() public view returns (uint256) {
        return PREZZO_LISTINO;
    }

    function getDress(uint256 _id)
        public
        view
        returns (
            uint256,
            address payable,
            uint256,
            bool,
            string memory
        )
    {
        uint pric = idToDress[_id].price * (1 ether) ;
        return (
            idToDress[_id].tokenId,
            idToDress[_id].owner,
            pric,
            idToDress[_id].onSale,
            idToDress[_id].nome
        );
    }

    function setOnSale(uint _tokenId) public returns(uint256 ){
        if(idToDress[_tokenId].onSale == false){
        idToDress[_tokenId].onSale= true;
        return 1;
        //dressonSale.decrement();
        } else{
            return 0;
        }
    }

    
}
