contract Clockchain {
    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;
    mapping (address => bool) public initialOffers;

    function Clockchain() {
    }

    /* Send coins */
    function transferOneHour(address _addr) {
        require(balanceOf[msg.sender] >= 1);
        require(balanceOf[_addr] + 1 >= balanceOf[_addr]); 
        balanceOf[msg.sender] -= 1;
        balanceOf[_addr] += 1;
    }

    function initUser() {
        require(initialOffers[msg.sender] == false);
        initialOffers[msg.sender] = true;
        balanceOf[msg.sender] = 2;
    }
}