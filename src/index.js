(() => {
  angular
    .module('investmentcalc', [])
    .config(Config)
    .controller('controller', Controller);

  function Config($locationProvider) {
    $locationProvider.hashPrefix('');
  }

  function Controller($http) {
    this.amount = 50;
    this.goal = 1000;
    this.list = [];

    this.calcAmount = (entry) => {
      return this.trim(this.amount / entry.price_usd);
    };

    this.calcGoal = (entry) => {
      return this.trim(entry.price_usd * (this.goal / this.amount));
    };

    $http.get('https://api.coinmarketcap.com/v1/ticker/?limit=200')
      .then(({ data }) => {
        this.list = data;
      })
      .catch();

    this.trim = (amount) => {
      const trimmed = Math.floor(amount * 1000) / 1000;
      return trimmed > 1 ? trimmed : Math.floor(amount * 100000) / 100000;
    };
  }
})();
