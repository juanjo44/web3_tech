// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Punto2 {
    mapping(address=>bool) authorizedAddresses;
    struct Certified{
        string studentName;
        uint id;
        string date;
        string courseName;
    }

    Certified[] listCertifieds;

    constructor () {
        authorizedAddresses[msg.sender]=true;
    }

    function addCertified (string memory studentName, uint id_,string memory date, string calldata courseName) public onlyAutorized returns(string[] memory){
        string[] memory arr = new string[](1);
        for (uint i = 0; i < listCertifieds.length;i++){
            if(listCertifieds[i].id == id_){
                arr[0] = "The certificate already exists";
                return arr;
            }
        } 
        listCertifieds.push(Certified(studentName, id_, date, courseName));
        arr[0] = "The certificate was added correctly";
        return arr;
    }

    function checkCertified (uint id_) public view onlyAutorized returns(string[] memory){
        for(uint i = 0; i < listCertifieds.length; i++){
            if (listCertifieds[i].id == id_){
                string[] memory arr = new string[](2);
                arr[0] = listCertifieds[i].studentName;
                arr[1] = listCertifieds[i].courseName;
                return (arr);
            }
        }
        return (new string[](0));
    }

    function autorizeAddress(address _address) public onlyAutorized{
        authorizedAddresses[_address]=true;
    }

    modifier onlyAutorized(){
        require(authorizedAddresses[msg.sender],"Only autorized");
        _;
    }
}