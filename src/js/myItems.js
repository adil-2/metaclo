Create = {
    web3Provider: null,
    contracts: {},

    initWeb3: async function () {
        // Modern dCreate browsers...
        if (window.ethereum) {
            Create.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dCreate browsers...
        else if (window.web3) {
            Create.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            Create.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(Create.web3Provider);

        return Create.initContract();
    },


    initContract: function () {
        $.getJSON('ClothesFactory.json', function (data) {
            var ClothesFactoryArtifact = data;
            Create.contracts.ClothesFactory = TruffleContract(ClothesFactoryArtifact);

            Create.contracts.ClothesFactory.setProvider(Create.web3Provider);

        });

        return Create.GetMyMartketItem();
    },

    GetMyMartketItem: async function () {

        //aggiunto un reindirizzamento al contratto perché nella funzione non mi riesce a trovare il contratto
        var ClothesInstance;
        var item = {
            price: null,
            tokenId: null,
            owner: null,
            sold: null,
        }
        var itemRow = $('#itemRow');
        var itemTemplate = $('#itemTemplate');
        var accounts = await ethereum.request({ method: 'eth_accounts' });

        $.getJSON('ClothesFactory.json', function (data) {
            var ClothesFactoryArtifact = data;
            Create.contracts.ClothesFactory = TruffleContract(ClothesFactoryArtifact);

            Create.contracts.ClothesFactory.setProvider(Create.web3Provider);

            Create.contracts.ClothesFactory.deployed().then(async function (instance) {
                ClothesInstance = instance;


                const data = await ClothesInstance.getMyDress({ from: accounts[0] });
                console.log(data.length);
                const metacl = "https://bafybeihocyys2l4hamjcwpxc6pymcy5nuaujogltymhur2emlehlgcidwe.ipfs.w3s.link/metacl%C3%B2.jpg";


                for (var j = 0; j < data.length; j++) {
                    var res = await ClothesInstance.getDress.call(data[j]);
                    var img = await ClothesInstance.tokenURI.call(data[j]);
                    var uri = img;
                    console.log(uri)
                    console.log(data[j]);

                    if (data[j] == 0) {
                        break;
                    }

                    item.tokenId = res[0].toNumber();
                    item.owner = res[1];
                    item.price = res[2].toNumber();
                    item.sold = res[3];
                    item.nome = res[4].toString();

                    itemTemplate.find('.panel-title').text(item.nome);
                    itemTemplate.find('.itemPrice').text(web3.fromWei(item.price, 'ether') + " Ether");
                    itemTemplate.find('.btn-onSale').attr('data-id', item.tokenId);
                    itemTemplate.find('img').attr('src', uri);
                    itemRow.append(itemTemplate.html());
                }

                console.log("1 volta");

                //disattiviamo il pulsante se l'utente l'ha già messo in vendita
                for (var i = 0; i < data.length; i++) {
                    var result = await ClothesInstance.getDress(data[i]);

                    if (data[i] == 0) {
                        break;
                    }
                    if (result[3] == true) {
                        $('.panel-item').eq(i).find('button').text('ON SOLD').attr('disabled', true);
                        console.log("sono entrato ed è true");
                    }
                }

            }).then(function (result) {
                Create.bindEvents();
            }).catch(function (err) {
                console.log(err.message);
                Create.bindEvents();
            });
        });
    },

    bindEvents: function () {
        $(document).on('click', '.btn-create', Create.CreateItem);
        $(document).on('click', '.btn-onSale', Create.onSaleItem);
        window.ethereum.on('accountsChanged', () => {
            window.location.reload();
        });

    },

    onSaleItem: async function (event) {
        event.preventDefault();
        var _id = parseInt($(event.target).data('id'));
        console.log(_id);
        var ClothesInstance;

        Create.contracts.ClothesFactory.deployed().then(async function (instance) {

            ClothesInstance = instance;
            console.log(_id);
            var accounts = await ethereum.request({ method: 'eth_accounts' });

            console.log("siamo dentro onSaleItem");

            await ClothesInstance.setOnSale(_id, { from: accounts[0] });
        }).then(function (result) {
            console.log(result);
            window.location = "http://localhost:3000/";
        }).catch(function (err) {
            console.log(err.message);
            location.reload(true);
            Create.bindEvents();
        });
    },
};


$(function () {
    $(window).load(function () {

        Create.initWeb3();
    });
});
