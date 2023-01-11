App = {
    web3Provider: null,
    contracts: {},

    initWeb3: async function () {
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },


    initContract: function () {
        $.getJSON('ClothesFactory.json', function (data) {
            var ClothesFactoryArtifact = data;
            App.contracts.ClothesFactory = TruffleContract(ClothesFactoryArtifact);

            App.contracts.ClothesFactory.setProvider(App.web3Provider);

        });

        return App.GetMartketItem();
    },


    GetMartketItem: async function () {

        //aggiunto un reindirizzamento al contratto perché nella funzione non mi riesce a trovare il contratto
        var ClothesInstance;
        var item = {
            price: null,
            tokenId: null,
            owner: null,
            sold: false,
        }
        var itemRow = $('#itemRow');
        var itemTemplate = $('#itemTemplate');

        $.getJSON('ClothesFactory.json', function (data) {
            var ClothesFactoryArtifact = data;
            App.contracts.ClothesFactory = TruffleContract(ClothesFactoryArtifact);

            App.contracts.ClothesFactory.setProvider(App.web3Provider);

            App.contracts.ClothesFactory.deployed().then(async function (instance) {
                ClothesInstance = instance;

                const data = await ClothesInstance.getAllOnSale.call();


                for (var j = 0; j < data.length; j++) {
                    var res = await ClothesInstance.getDress.call(data[j]);

                    if (data[j] == 0) {
                        break;
                    }

                    item.tokenId = res[0].toNumber();
                    item.owner = res[1];
                    item.price = (res[2].toNumber());
                    item.sold = res[3];
                    item.nome = res[4].toString();

                    itemTemplate.find('.panel-title').text(item.nome);
                    itemTemplate.find('.itemPrice').text(web3.fromWei(item.price, 'ether') + " Ether");
                    itemTemplate.find('.itemSold').text("Fai girare la moneta!!");

                    var accounts = await ethereum.request({ method: 'eth_accounts' });

                    if ((item.sold == true) && (item.owner == accounts[0])) {
                        itemTemplate.find('.btn-buy').text('IT YOURS').attr('disabled', true);
                    } else if (item.sold == true && item.owner != accounts[0]) {
                        itemTemplate.find('.btn-buy').attr('data-id', item.tokenId)
                    }


                    itemRow.append(itemTemplate.html());

                }

                return item.tokenId;

            }).then(function (result) {
                //console.log(result);

            }).catch(function (err) {
                console.log(err.message);
            });
        });

        return App.bindEvents();
    },


    bindEvents: function () {
        $(document).on('click', '.btn-buy', App.buyDress);

    },

    //da fare tutta, per ora caccia il listino prezzi
    buyDress: async function (event) {
        event.preventDefault();
        var _id = parseInt($(event.target).data('id'));
        console.log(_id);
        var inst;

        App.contracts.ClothesFactory.deployed().then(async function (instance) {
            inst = instance;

            var accounts = await ethereum.request({ method: 'eth_accounts' });
            var res = await inst.getDress(_id);
            var price = res[2].toNumber();

            console.log(price);

            return inst.createDressMarketSale(_id, { from: accounts[0], value: price });
        }).then(function () {
            console.log("ci siamo, hai venduto");
            location.reload(true);
        }).catch(function (err) {
            console.log(err.message);
            //location.reload(true);

        });

        //location.reload(true);
        return App.bindEvents();
    },



};


$(function () {
    $(window).load(function () {

        App.initWeb3();
    });
});
