var myEther;

console.log("web3.version", web3.version)

$(document).ready(function () {
    $(".ether").change(function () {
        $(".token").val(Math.round($(".ether").val() * 625));
        $(".ether").val($(".token").val() / 625);
        myEther = $(".ether").val();
    });
    $(".token").change(function () {
        $(".ether").val($(".token").val() / 625);
        myEther = $(".ether").val();
    });
});

try {
    web3.eth.defaultAccount = web3.eth.accounts[0];
} catch (err) {
    console.log(err);
    $('.mask').show();
}

/*var icoContract = web3.eth.contract([{
    "name": "Buy",
    "inputs": [{
        "type": "address",
        "name": "_buyer",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "_buy_order",
        "indexed": false
    }],
    "anonymous": false,
    "type": "event"
}, {
    "name": "Pay",
    "inputs": [{
        "type": "address",
        "name": "_vendor",
        "indexed": true
    }, {
        "type": "uint256",
        "name": "_amount",
        "indexed": false
    }],
    "anonymous": false,
    "type": "event"
}, {
    "name": "burnIt",
    "outputs": [],
    "inputs": [{
        "type": "uint256",
        "name": "_value"
    }],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 60388
}, {
    "outputs": [],
    "inputs": [{
        "type": "address",
        "name": "_tokenAddress"
    }, {
        "type": "uint256",
        "name": "_total_shares"
    }, {
        "type": "uint256",
        "name": "initial_price"
    }, {
        "type": "uint256",
        "name": "soft_cap"
    }],
    "constant": false,
    "payable": false,
    "type": "constructor"
}, {
    "name": "stockAvailable",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2587
}, {
    "name": "buyStock",
    "outputs": [],
    "inputs": [],
    "constant": false,
    "payable": true,
    "type": "function",
    "gas": 122906
}, {
    "name": "getHolding",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [{
        "type": "address",
        "name": "_stockholder"
    }],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 2117
}, {
    "name": "cash",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 563
}, {
    "name": "payBill",
    "outputs": [],
    "inputs": [{
        "type": "address",
        "name": "vendor"
    }, {
        "type": "uint256",
        "name": "amount"
    }],
    "constant": false,
    "payable": false,
    "type": "function",
    "gas": 38171
}, {
    "name": "totalShares",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1421
}, {
    "name": "price",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1451
}, {
    "name": "softCap",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1481
}, {
    "name": "buy_order",
    "outputs": [{
        "type": "uint256",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1511
}, {
    "name": "owner",
    "outputs": [{
        "type": "address",
        "name": ""
    }],
    "inputs": [],
    "constant": true,
    "payable": false,
    "type": "function",
    "gas": 1541
// }]).at('0x7b3b1049ff4171fe069c0e28a04d8db7e7a9fd37');
console.log("icoContract", icoContract);*/

const buyButton = $(".buy");

buyButton.click(function() {

    icoContract.buyStock.sendTransaction({
        from: web3.eth.accounts[0],
        value: myEther * 10 ** 18,
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log("result", result);

        } else {
            console.log("error", error);
        }
    });

});

const balanceButton = $('.balance');

balanceButton.click(function() {

    icoContract.getHolding.call(web3.eth.accounts[0], {
        from: web3.eth.accounts[0],
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log("result", result);
            document.getElementById("tokens").innerHTML = "you own " + result.c[0] + " tokens!";
        } else {
            console.log("error", error);
        }
    });

});