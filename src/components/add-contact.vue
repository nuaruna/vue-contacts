<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container add-contact">
          <nav>
            <div class="header">
              <div class="header-name">Добавить контакт</div>
              <div class="nav-butttons">
                <div class="nav-butttons__item" @click="addContact">
                  Сохранить
                </div>
              </div>
              <div class="nav-butttons">
                <div class="nav-butttons__item" @click="cancelContact">
                  Отменить
                </div>
              </div>
            </div>
            <hr style="margin: 0" />
          </nav>
          <div class="modal-body content">
            <div class="name container">
              <label class="left">Имя</label>
              <input
                class="right"
                type="text"
                v-model="item.name"
                placeholder="Введите имя"
              />
            </div>
            <div class="phone container">
              <label class="left" style="padding-right: 20px;">Телефон</label>
              <input
                class="right"
                type="text"
                v-model="item.phone"
                placeholder="Введите номер"
              />
            </div>
            <div class="params">
              <div
                class="params__exist"
                v-for="param in parameters"
                :key="param.id"
              >
                <label class="caption">{{ param.caption }}</label>
                <label class="value">{{ param.value }}</label>
                <div class="actions">
                  <button
                    @click="deleteItem(param.id)"
                    class="buttons__delete"
                  />
                </div>
              </div>

              <div class="params__new">
                <input
                  type="text"
                  class="caption"
                  v-model="newParam.caption"
                  placeholder="Введите название"
                />
                <input
                  type="text"
                  class="value"
                  v-model="newParam.value"
                  placeholder="Введите значение"
                />
              </div>
              <div class="params__actions">
                <div class="add-button">
                  <button @click="addParam">Добавить параметр</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import Vue from "vue";
import { Contact, Parameter } from "@/interfaces";
import Component from "vue-class-component";
import { addParam, deleteParam, getUniqParamId } from "@/helpers";

@Component({})
export default class AddContact extends Vue {
  item: Contact = {
    id: Date.now(),
    name: "",
    phone: "",
    params: []
  };
  newParam: Parameter = {
    id: getUniqParamId(this.item),
    caption: "",
    value: ""
  };

  get parameters() {
    return this.item.params || [];
  }

  created() {
    this.item = {
      id: Date.now(),
      name: "",
      phone: "",
      params: []
    };
    this.newParam = {
      id: getUniqParamId(this.item),
      caption: "",
      value: ""
    };
  }

  addParam() {
    addParam(this.item, this.newParam);
    this.newParam = {
      id: getUniqParamId(this.item),
      caption: "",
      value: ""
    };
  }
  deleteParam(id: number) {
    deleteParam(id, this.item);
  }
  addContact() {
    const list = localStorage.getItem("ContactList");
    let items: Contact[];
    if (list) {
      items = JSON.parse(list) || [];
    } else items = [];
    items.push(this.item);
    this.$emit("confirm", items);
  }
  cancelContact() {
    const list = localStorage.getItem("ContactList");
    let items: Contact[];
    if (list) {
      items = JSON.parse(list) || [];
    } else items = [];
    this.$emit("confirm", items);
  }
}
</script>

<style lang="scss">
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
.add-contact {
  .modal-body {
    display: flex;
    flex-direction: column;
  }
}
</style>
