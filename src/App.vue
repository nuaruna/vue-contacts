<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .header {
    line-height: 45px;
    .header-name {
      font-size: 40px;
      display: inline-block;
    }
    .nav-butttons {
      float: right;
      display: flex;
      flex-direction: row;
      &__item {
        padding: 4px 10px 4px 10px;
        cursor: pointer;
        &:hover {
          background-color: #b9b9b9;
        }
      }
    }
  }
  .buttons__delete {
    cursor: pointer;
    background-color: red;
    &::after {
      content: "x";
    }
  }
  .content {
    .container {
      border: 1px solid #ccc;
      padding: 20px 10px 20px 10px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "left right";
      .left {
        grid-area: left;
      }
      .right {
        grid-area: right;
      }
    }
    label {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    input {
      flex: auto;
      max-width: 150px;
    }
    .params {
      border: 1px solid #ccc;
      padding: 20px 10px 20px 10px;
      display: flex;
      flex-direction: column;
      .caption {
        grid-area: caption;
      }
      .value {
        grid-area: value;
      }
      .add-button {
        grid-area: add-button;
      }
      .actions {
        grid-area: actions;
      }
      &__exist {
        display: grid;
        grid-template-columns: 1fr 1fr 30px;
        grid-template-areas: "caption value actions";
        margin: 10px 0px 10px 0px;
      }
      &__new {
        display: grid;
        grid-template-columns: 1fr 1fr 30px;
        grid-template-areas: "caption value .";
        margin: 10px 0 10px 0;
      }
      &__actions {
        display: grid;
        grid-template-columns: 1fr 1fr 30px;
        grid-template-areas: ". add-button .";
        margin: 10px 0 10px 0;
      }
    }
  }
}
</style>
