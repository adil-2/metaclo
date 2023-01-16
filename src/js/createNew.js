App = {
    web3Provider: null,
    contracts: {},


    initWeb3: async function () {
        // Modern dApp browsers...
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
        // Legacy dApp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
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
        return App.CreateItem();
    },

    bindEvents: function () {
        console.log("salve");
        $(document).on('click', '.btn-create', App.CreateItem);

        window.ethereum.on('accountsChanged', () => {
            window.location.reload();
        })


    },

    CreateItem: async function () {
        var ClothesInstance;

        $.getJSON('ClothesFactory.json', function (data) {
            var ClothesFactoryArtifact = data;
            App.contracts.ClothesFactory = TruffleContract(ClothesFactoryArtifact);
            App.contracts.ClothesFactory.setProvider(App.web3Provider);

            App.contracts.ClothesFactory.deployed().then(async function (instance) {

                ClothesInstance = instance;
                var listingPrice = await ClothesInstance.getPrezzoListino.call();


                //var url = "htt/qualcosa";
                //var price = $('#idPrezzo').val();
                //var nome = $('#idNome').val();
                //var desc = $('#idDescrizione').val();

                //caricamento dell'img
                /*
                const fileInput = document.getElementById('img');
                fileInput.onchange = fileSelected;
                function fileSelected(e) {
                    if (e.target.files.length < 1) {
                        console.log('nothing selected')
                        return
                    }
                    handleFileSelected(e.target.files[0])
                }
                */




                //var isChecked = document.getElementById("myCheckBox").checked;

                //if (isChecked) {
                //    sale = true;
                //} else {
                 //   var sale = false;
                //}

                //console.log("è stato cliccato " + sale);


                var accounts = await ethereum.request({ method: 'eth_accounts' });
                
                return await ClothesInstance.createDress("htt", "vittorio", true, 50, { from: accounts[0], value: listingPrice });
            
        }).then(function (result) {

            //window.location = "http://localhost:3000/";
            //location.reload(true);

            console.log(result);
        }).catch(function (err) {
            console.log(err.message);
        });
        App.bindEvents();
    });
    }
    
}

$(function () {
    $(window).load(function () {

        App.initWeb3();
    });
});
