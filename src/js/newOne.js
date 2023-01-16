import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js'
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    await window.ethereum.enable();
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3.providers.HttpProvider('http://localhost:8545');
}

const contractABI = JSON.parse(' [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"DressItemCreated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"DressonSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"PREZZO_LISTINO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updatePrezzoListino","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"TokenURI","type":"string"},{"internalType":"string","name":"_n","type":"string"},{"internalType":"bool","name":"_onSale","type":"bool"},{"internalType":"uint256","name":"prezzo","type":"uint256"}],"name":"createDress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function","payable":true},{"inputs":[{"internalType":"uint256","name":"_dressId","type":"uint256"}],"name":"createDressMarketSale","outputs":[],"stateMutability":"payable","type":"function","payable":true},{"inputs":[],"name":"getAllOnSale","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getMyDress","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[],"name":"getPrezzoListino","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDress","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address payable","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"},{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function","constant":true},{"inputs":[{"internalType":"uint256","name":"_tokenId","type":"uint256"}],"name":"setOnSale","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}] ');

var yourContract = web3.eth.contract(contractABI);
// Set the contrcat address
const ClothesInstance = yourContract.at('0x1B195838A0EA6a5A0A20A489EF6750D36f5FFaD8');
console.log(ClothesInstance);



//prezzo di listino
await ClothesInstance.getPrezzoListino(function (err, res) {
    if (!err) {
        console.log(res.toString());
    }
    else { console.log("male male "); }
});

//pri();
var accounts = await ethereum.request({ method: 'eth_accounts' });

const form = document.querySelector('#upload-form')
const filepicker = document.querySelector('#img')
const tokenInput = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJhNTlkNGRjOGMyODlmMzBmRTUxMzJGMzk1M2NiMERBNDE0NjBEZjQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzA5NDE4NjUxNTksIm5hbWUiOiJleGFtcGxlIn0.r_n3R0sareGAJNXux4E3hB06p4e3-TrMrsIeUXhhu9Y';
const output = document.querySelector('#output')


showMessage('> ⁂ waiting for form submission...')

form.addEventListener('submit', async function (event) {
    // don't reload the page!
    event.preventDefault()

    showMessage('> 📦 creating web3.storage client')
    const token = tokenInput;
    const client = new Web3Storage({ token })

    showMessage('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
    const files = filepicker.files
    
    //prendiamo il nome dell'img
    var filename = document.getElementById('img').files[0].name;
    console.log(filename);

    const cid = await client.put(files, {
        onRootCidReady: (localCid) => {
            showMessage(`> 🔑 locally calculated Content ID: ${localCid} `)
            showMessage('> 📡 sending files to web3.storage ')
        },
        onStoredChunk: (bytes) => showMessage(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
    })

    //mint del token
    var price = $('#idPrezzo').val();
    var nome = $('#idNome').val();
    var desc = $('#idDescrizione').val(); //da aggiungere
    var isChecked = document.getElementById("myCheckBox").checked;
    if (isChecked) {
        sale = true;
    } else {
        var sale = false;
    }

    console.log(nome + price + sale);
    var u = `https://${cid}.ipfs.w3s.link/${filename}`
   
    item(u, nome, sale, price);

    showMessage(`> ✅ web3.storage now hosting ${cid}`)
    showLink(`https://dweb.link/ipfs/${cid}`)
}, false)

function showMessage(text) {
    const node = document.createElement('div')
    node.innerText = text
    output.appendChild(node)
}

function showLink(url) {
    const node = document.createElement('a')
    node.href = url
    node.innerText = `> 🔗 ${url}`
    output.appendChild(node)
}

async function item(url, nome, sale, price) {

    var accounts = await ethereum.request({ method: 'eth_accounts' });
    console.log(accounts[0]);

    await ClothesInstance.createDress(url, nome, sale, price, { from: accounts[0], value: 8 }, function (err, res) {
        if (!err) {
            console.log(res);
        }
        else { console.log("dioporo") }
    });
}

async function pri() {
    var accounts = await ethereum.request({ method: 'eth_accounts' });

    //proviamo ad aggiornare il prezzo di listino
    await ClothesInstance.updatePrezzoListino(8, { from: accounts[0] }, function (err, res) {
        if (!err) {
            console.log(res);
            return res;
        }
        else { console.log("dai cazoooo" + err) }
    });
}
