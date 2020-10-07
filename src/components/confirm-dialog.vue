<template>
  <transition name="modal" v-if="isShow">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container add-contact">
          <div class="modal-header">
            Внимание
          </div>
          <div class="modal-body">
            {{ message }}
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="confirm">
              Да
            </button>
            <button class="modal-default-button" @click="cancel">
              Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class ConfirmDialog extends Vue {
  public message = "";
  private isShow = false;
  answer: Function = () => {
    return false;
  };

  show() {
    this.isShow = true;
    return new Promise<boolean>((resolve: Function) => {
      this.answer = resolve;
    });
  }
  confirm() {
    this.close();
    this.$emit("confirm");
    this.answer(true);
  }
  close() {
    this.isShow = false;
  }
  cancel() {
    this.close();
    this.$emit("cancel");
    this.answer(false);
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 650px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  margin: 0 10px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-footer {
  padding-bottom: 20px;
}
</style>
