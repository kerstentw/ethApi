pragma solidity ^0.4.14;

contract TEST2 {

    address internal listenerAddr;
    address public owner;
    uint256 public initialIssuance;
    uint public totalSupply;
    uint256 public currentEthPrice;
    uint256 public currentTokenPrice;
    bytes32 public symbol;
    bytes32 public name;

    mapping(address => mapping(address => uint256)) allowed;
    mapping(address => uint256) balances;
    mapping(bytes32 => uint256) public productLimits;
    mapping(bytes32 => uint256) public productPrices;
    mapping(address => mapping(bytes32 => uint256)) productOwners;

    event Transfer(address indexed from, address indexed to, uint256 value);

    function TEST2() {

        name = "TEST2";
        totalSupply = 1000000;
        initialIssuance = totalSupply;
        owner = 0x443B9375536521127DBfABff21f770e4e684475d;
        currentEthPrice = 20000;
        currentTokenPrice = 1000;
        symbol = "CONF";
        balances[owner] = 0;

    }

    function safeMul(uint a, uint b) constant internal returns(uint) {
        uint c = a * b;
        assert(a == 0 || c / a == b);
        return c;
    }

    function safeSub(uint a, uint b) constant internal returns(uint) {
        assert(b <= a);
        return a - b;
    }

    function safeAdd(uint a, uint b) constant internal returns(uint) {
        uint c = a + b;
        assert(c >= a && c >= b);
        return c;
    } /* Methods */
    
    function balanceOf(address _addr) constant returns(uint256 bal) {
        return balances[_addr];
    }

    function totalSupply() constant returns(uint) {
        return totalSupply;
    }

    function setTokenPrice(uint128 _amount) {
        assert(msg.sender == owner);
        currentTokenPrice = _amount;
    }

    function setEthPrice(uint128 _amount) {
        assert(msg.sender == owner);
        currentEthPrice = _amount;
    }

    function seeEthPrice() constant returns(uint256) {
        return currentEthPrice;
    }

    function __getEthPrice(uint256 price) {
        assert(msg.sender == owner);
        currentEthPrice = price;
    }

    function newProduct(bytes32 _name, uint128 price, uint256 limit) returns(bool success) {
        assert((msg.sender == owner) && (limit > 0));
        productPrices[_name] = price;
        productLimits[_name] = limit;
        return true;
    }

    function nullifyProduct(bytes32 _name) {
        assert(msg.sender == owner);
        productLimits[_name] = 0;
    }

    function modifyProductPrice(bytes32 _name, uint256 newPrice) {
        assert(msg.sender == owner);
        productPrices[_name] = newPrice;
        productLimits[_name] = productLimits[_name];
    }

    function modifyProductLimit(bytes32 _name, uint256 newLimit) {
        assert(msg.sender == owner);
        productLimits[_name] = newLimit;
        productPrices[_name] = productPrices[_name];
    }

    function modifyProductPrice(bytes32 _name, uint256 newPrice, uint256 newLimit) {
        assert(msg.sender == owner);
        productPrices[_name] = newPrice;
        productLimits[_name] = newLimit;
    }

    function inventoryProduct(bytes32 _name) constant returns(uint256 productAmnt) {
        return productLimits[_name];
    }

    function checkProduct(bytes32 _name) constant returns(uint256 productAmnt) {
        return productOwners[msg.sender][_name];
    }

    function purchaseProduct(bytes32 _name, uint256 amnt) {
        uint256 totalPrice = safeMul(productPrices[_name], amnt);
        balances[msg.sender] = safeSub(balances[msg.sender], totalPrice);
        totalSupply += totalPrice;
        productLimits[_name] = safeSub(productLimits[_name], amnt);
        productOwners[msg.sender][_name] = safeAdd(productOwners[msg.sender][_name], amnt);
    }

    function purchaseToken() payable returns(uint256 tokensSent) {
        uint256 totalTokens = (currentEthPrice * msg.value) / (currentTokenPrice * (10 ** 18));
        totalSupply = safeSub(totalSupply, totalTokens);
        balances[msg.sender] = safeAdd(balances[msg.sender], totalTokens);
        return totalTokens;
    }

    function transfer(address _to, uint256 _value) payable returns(bool success) {
        balances[msg.sender] = safeSub(balances[msg.sender], _value);
        balances[_to] = safeAdd(balances[msg.sender], _value);
        Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) returns(bool) {
        balances[_from] = safeSub(balances[_from], _value);
        allowed[_from][msg.sender] = safeSub(allowed[_from][msg.sender], _value);
        balances[_to] = safeAdd(balances[_to], _value);
        return true;
    }

    function approve(address _spender, uint _value) returns(bool success) {
        allowed[msg.sender][_spender] = _value;
        return true;
    }

    function __redeem() returns(bool success) {
        assert(msg.sender == owner);
        assert(msg.sender.send(this.balance));
        return true;
    }

    function __DEBUG_BAL() returns(uint bal) {
        return this.balance;
    }

    function allowance(address _owner, address _spender) constant returns(uint remaining) {
        return allowed[_owner][_spender];
    }

    function() {
        revert();
    }
}
