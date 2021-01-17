<template>
  <div class="home">
    <div class="nav">
      <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item class="nav__logo" href="#"
            >Лабораторна робота № 3</b-nav-item
          >
        </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="home__container container">
      <div class="home__toolbar toolbar">
        <div class="toolbar__inputs inputs">
          <b-input-group class="inputs__span">
            <span>X:</span>
            <b-form-input class="inputs__input" type="text"></b-form-input>
          </b-input-group>
          <b-input-group class="inputs__span">
            <span>Y:</span>
            <b-form-input class="inputs__input" type="text"></b-form-input>
          </b-input-group>
        </div>
        <div class="toolbar__btn-group">
          <b-button variant="secondary" class="toolbar__btn">
            Add point
          </b-button>
          <b-button variant="secondary" class="toolbar__btn">
            Import file
          </b-button>
          <b-button variant="secondary" class="toolbar__btn">
            Reset points
          </b-button>
        </div>
      </div>
      <div class="home__wrapper">
        <div class="home__table table">
          <b-table :items="table"></b-table>
        </div>
        <div class="home__plot plot">
          <Plotly :data="allGraphs" :layout="layout"></Plotly>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly';
import {
  firstFunction, dataForPlotFormBasicGauss, paramsGauss, summaryGauss,
} from '../../scripts';

export default {
  components: {
    Plotly,
  },
  mounted() {
    console.log(summaryGauss());
  },
  data() {
    return {
      items: [
      ],
      layout: {
        title: 'Graph',
      },
    };
  },
  computed: {
    table() {
      const tableValues = [];
      const values = firstFunction();
      values.x.forEach((element, i) => {
        tableValues.push({ x: +element.toFixed(3), y: +values.y[i].toFixed(3) });
      });
      return tableValues;
    },
    defaultGraph() {
      return [{
        ...firstFunction(),
        type: 'scatter',
      }];
    },
    allGraphs() {
      return [
        {
          ...firstFunction(),
          type: 'scatter',
          name: 'Function',
        },
        {
          ...dataForPlotFormBasicGauss(),
          mode: 'lines',
          name: 'Usual Gauss',
        },
        {
          ...paramsGauss(),
          mode: 'lines',
          name: 'Params Gauss',
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  background-color: #343a40;
  &__logo {
    font-size: 20px;
    font-weight: bold;
  }
}
.home {
  background-color: #a7c5e4;
  &__toolbar {
    margin-top: 50px;
    align-self: start;
  }
  &__table {
    width: 120px;
    margin-top: 20px;
  }
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 50px;
  }
  &__plot {
    max-width: 900px;
    // height: 900px;
  }
  height: 100vh;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 20px;
  &__btn-group {
    display: flex;
    gap: 10px;
  }
}

.inputs {
  width: 45px;
  &__input {
  }
  &__span {
    display: flex;
    align-items: center;
    gap: 3px;
  }
}
</style>
