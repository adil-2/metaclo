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
            Create.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
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

    bindEvents: function () {
        $(document).on('click', '.btn-create', Create.CreateItem);
        $(document).on('click', '.btn-onSale', Create.onSaleItem);


    },

    onSaleItem: async function(event){
        event.preventDefault();
        var _id = parseInt($(event.target).data('id'));
        console.log(_id);
        var ClothesInstance;

        Create.contracts.ClothesFactory.deployed().then(async function (instance) {

            ClothesInstance = instance;
            console.log(_id);
            var accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log("ci siamo quasi")


           return await ClothesInstance.setOnSale(_id, {from: accounts[0]});
        }).then(function(result){
            console.log(result);
            location.reload(true);
        }).catch(function (err) {
            console.log(err.message);
        });
        return Create.bindEvents();
    },

    CreateItem: async function () {
        var ClothesInstance;

        Create.contracts.ClothesFactory.deployed().then(async function (instance) {

            ClothesInstance = instance;
            var listingPrice = await ClothesInstance.getPrezzoListino.call();

            var url = "htt/qualcosa";
            var price = $('#idPrezzo').val();
            var nome = $('#idNome').val();
            var desc = $('#idDescrizione').val();
            var isChecked = document.getElementById("myCheckBox").checked;

            if(isChecked){
                sale = true;
              } else {
                var sale = false;
              }

            console.log("prima");

            
            var accounts = await ethereum.request({ method: 'eth_accounts' });
            console.log(nome +" "+ desc);

            return ClothesInstance.createDress(url, nome, sale , price, { from: accounts[0], value: listingPrice});
        }).then(function (result) {

            window.location = "http://localhost:3000/";
            //location.reload(true);

            console.log(result);
        }).catch(function (err) {
            console.log(err.message);
        });

        Create.bindEvents();

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


                const data = await ClothesInstance.getMyDress({from: accounts[0]});
                console.log(data.length);
                               

                for (var j = 0; j < data.length; j++) {
                    var res = await ClothesInstance.getDress.call(data[j]);
                    console.log(data[j]);

                    if(data[j] == 0){
                        break;
                    }
                    


                    item.tokenId = res[0].toNumber();
                    item.owner = res[1];
                    item.price = res[2].toNumber();
                    item.sold = res[3];
                    item.nome = res[4].toString();
                    

                    itemTemplate.find('.panel-title').text(item.nome);
                    itemTemplate.find('.itemPrice').text(web3.fromWei(item.price, 'ether') + " Ether");

                    if(item.sold == false){
                    itemTemplate.find('.btn-onSale').attr('data-id', item.tokenId);
                    } else{
                        itemTemplate.find('.btn-onSale').text('ON SOLD').attr('disabled', true);
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

        return Create.bindEvents();
    },

};


$(function () {
    $(window).load(function () {

        Create.initWeb3();
    });
});
