const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.netflix.com/br',
    env: { //definindo enviroments
      hideCredentials: true, //Para o acces token não vazar (Ocultar credenciais)
      requestMode: true, //para feedback visual da api
    },
  },
  fixturesFolder: false,
  video: true,
})
