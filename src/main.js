import Vue from 'vue';
import {Time} from './time';
import _ from 'lodash';

require('bootstrap/dist/css/bootstrap.css');
require('bootstrap');


let meuVue = new Vue({
  el: '#app',
  data: {
    order:{
      keys:['pontos', 'gm', 'gs'],
      sort:['desc', 'desc', 'asc'],
    },
    colunas:['nome', 'pontos', 'gm', 'gs', 'saldo'],
    filter: '',
    times: [
      new Time("AFC", require('./assets/afc.jpg')),
      new Time("Aguia", require('./assets/aguia.jpg')),
      new Time("Barcelona", require('./assets/barcelona.jpg')),
      new Time("Deportivo", require('./assets/deportivo.jpg')),
      new Time("Drakon", require('./assets/drakon.jpg')),
      new Time("Petropolis", require('./assets/images.png')),
      new Time("Real Madri", require('./assets/realmadri.jpg')),
      new Time("Real Madruga", require('./assets/realmadruga.jpg')),
      new Time("Real Parças", require('./assets/realparcas.jpg')),
      new Time("Seven", require('./assets/seven.jpg'))
    ],
    novoJogo: {
      casa: {
        time: null,
        gols: 0
      },
      fora: {
        time: null,
        gols: 0
      }
    },
    view: 'tabela'
  },

  methods: {
    fimJogo(){
      let timeAdversario = this.novoJogo.fora.time;
      let gols = +this.novoJogo.casa.gols;
      let golsAdversario = +this.novoJogo.fora.gols;
      this.novoJogo.casa.time.fimJogo(timeAdversario, gols, golsAdversario);
      this.showView('tabela');
    },

    createNovoJogo(){
      let indexCasa = Math.floor(Math.random() * 11),
          indexFora = Math.floor(Math.random() * 11);

      this.novoJogo.casa.time = this.times[indexCasa];
      this.novoJogo.casa.gols = 0;
      this.novoJogo.fora.time = this.times[indexFora];
      this.novoJogo.fora.gols = 0;
      this.showView('novoJogo');
    },

    showView(view){
      this.view = view;
    },

    sortBy(coluna){
      this.order.keys = coluna;
      this.order
    }
  },

  computed:{
    timesFiltered(){
      let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);

      return _.filter(colecao, item => {
        return item.nome.indexOf(this.filter) >=0;
      });
    }
  },

  filters: {
    saldo(time){
      return time.gm - time.gs;
    },
    ucWords(value){
      return value.charAt(0).toUpperCase()+value.slice(1);
    }
  }
});