<template>
  <div class="contact-page" v-if="Contact">
    <nav>
      <div class="header">
        <div class="header-name">{{ pageName }}</div>
        <div class="nav-butttons">
          <div
            v-if="changeMode && history.length"
            class="nav-butttons__item"
            @click="cancelLastChange"
          >
            Отмена последнего действия
          </div>
          <div
            v-if="!changeMode"
            class="nav-butttons__item"
            @click="changeContact"
          >
            Редактировать
          </div>
          <div
            v-if="!changeMode"
            class="nav-butttons__item"
            @click="backToList"
          >
            К списку
          </div>
          <div
            v-if="changeMode"
            class="nav-butttons__item"
            @click="saveContact"
          >
            Сохранить
          </div>
          <div
            v-if="changeMode"
            class="nav-butttons__item"
            @click="cancelChanges"
          >
            Отменить
          </div>
        </div>
      </div>
      <hr style="margin: 0" />
    </nav>
    <div>
      <div class="content">
        <div class="name container">
          <label class="left">Имя</label>
          <input
            v-if="changeMode"
            class="right"
            type="text"
            v-model="Contact.name"
            @change="setLastChange('name', $event)"
          />
          <label v-else class="right">{{ Contact.name }} </label>
        </div>
        <div class="phone container">
          <label class="left" style="padding-right: 20px;">Телефон</label>
          <input
            v-if="changeMode"
            class="right"
            type="text"
            v-model="Contact.phone"
            @change="setLastChange('phone', $event)"
          />
          <label v-else class="right">{{ Contact.phone }} </label>
        </div>
        <div class="params">
          <div
            class="params__exist"
            v-for="(param, index) in parameters"
            :key="param.id"
          >
            <label v-if="!changeMode" class="caption">
              {{ param.caption }}</label
            >
            <label v-if="!changeMode" class="value">{{ param.value }}</label>
            <input
              v-if="changeMode"
              type="text"
              class="caption"
              v-model="param.caption"
              @change="setLastChange('caption', $event, index)"
            />
            <input
              v-if="changeMode"
              type="text"
              class="value"
              v-model="param.value"
              @change="setLastChange('value', $event, index)"
            />
            <div class="actions" v-if="changeMode">
              <button
                @click="deleteParam(param.id, param.caption)"
                class="buttons__delete"
              />
            </div>
          </div>

          <div class="params__new" v-if="changeMode">
            <input type="text" class="caption" v-model="newParam.caption" />
            <input type="text" class="value" v-model="newParam.value" />
          </div>
          <div class="params__actions" v-if="changeMode">
            <div class="add-button">
              <button @click="addParam">Добавить параметр</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Contact, Parameter } from "@/interfaces";
import { getUniqParamId, addParam, deleteParam } from "@/helpers";
@Component({})
export default class ContactPage extends Vue {
  @Prop() readonly id!: string;
  changeMode = false;
  Contact: Contact | null = null;
  newParam: Parameter = {
    id: getUniqParamId(),
    caption: "",
    value: ""
  };
  pageName = "";
  history: {
    field: keyof Parameter | keyof Contact;
    value: unknown;
    oldValue: unknown;
    index?: number;
  }[] = [];
  initialContact: Contact | null = null;

  created() {
    const list: Contact[] =
      JSON.parse(localStorage.getItem("ContactList") || "{[]}") || [];
    let index = -1;
    if (list.length) {
      index = list.map(x => x.id).indexOf(+this.id);
    }
    if (index > -1) {
      this.Contact = list[index];
    }
    this.pageName = this.Contact?.name || "";
    this.newParam = {
      id: getUniqParamId(),
      caption: "",
      value: ""
    };
    this.changeMode = false;
  }

  get parameters() {
    return this.Contact?.params || [];
  }

  //вытягиваем из истории последнее изменение и откатываем Contact
  cancelLastChange() {
    const change = this.history.pop();
    if (!change || !this.Contact) return;
    if (
      change.index !== undefined &&
      this.Contact.params &&
      this.Contact.params[change.index]
    ) {
      this.Contact.params[change.index] = {
        ...this.Contact.params[change.index],
        [change.field]: change.oldValue
      } as Parameter;
    } else {
      this.Contact = {
        ...this.Contact,
        [change.field]: change.oldValue
      } as Contact;
    }
    this.setInitialContact();
  }

  addParam() {
    addParam(this.Contact, this.newParam);
    this.newParam = {
      id: getUniqParamId(this.Contact),
      caption: "",
      value: ""
    };
  }

  //сохряняем изменение в историю
  setLastChange(
    field: keyof Parameter | keyof Contact,
    event: Event,
    index?: number
  ) {
    if (!this.Contact || !this.initialContact) return;
    if (
      index !== undefined &&
      this.Contact.params &&
      this.initialContact.params
    ) {
      this.history.push({
        field: field,
        value: this.Contact.params[index][field as keyof Parameter],
        oldValue: this.initialContact.params[index][field as keyof Parameter],
        index: index
      });
      this.setInitialContact();
      return;
    }
    this.history.push({
      field: field,
      value: this.Contact[field as keyof Contact],
      oldValue: this.initialContact[field as keyof Contact]
    });
    this.setInitialContact();
  }

  setInitialContact() {
    this.initialContact = {
      ...this.Contact,
      params: JSON.parse(JSON.stringify(this.parameters))
    } as Contact;
  }

  saveContact() {
    const list: Contact[] =
      JSON.parse(localStorage.getItem("ContactList") || "{[]}") || [];
    let index = -1;
    if (list.length) {
      index = list.map(x => x.id).indexOf(+this.id);
    }
    if (this.Contact && index > -1) {
      list[index] = this.Contact;
    }
    localStorage.setItem("ContactList", JSON.stringify(list));
    this.pageName = this.Contact?.name || "";
    this.changeMode = false;
  }

  cancelChanges() {
    const list: Contact[] =
      JSON.parse(localStorage.getItem("ContactList") || "{[]}") || [];
    let index = -1;
    if (list.length) {
      index = list.map(x => x.id).indexOf(+this.id);
    }
    if (index > -1) {
      this.Contact = list[index];
    }
    this.changeMode = false;
  }

  async deleteParam(id: number, caption: string) {
    const confirm = await this.$confirm(
      `Вы уверены, что хотите удалить поле "${caption}"?`
    ).show();
    if (!confirm) return;
    deleteParam(id, this.Contact);
  }

  changeContact() {
    this.changeMode = true;
    this.setInitialContact();
    this.history = []; // история изменений
  }

  backToList() {
    this.$router.push("/");
  }
}
</script>

<style lang="scss">
.contact-page {
  .content {
    padding: 20px 10% 0 10%;
  }
}
</style>
