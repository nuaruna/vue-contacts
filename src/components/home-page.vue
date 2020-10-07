<template>
  <div class="home-page">
    <nav>
      <div class="header">
        <div class="header-name">Книга контактов</div>
        <div class="nav-butttons">
          <div class="nav-butttons__item" @click="addItem">Добавить</div>
        </div>
      </div>
      <hr style="margin: 0" />
    </nav>
    <div class="content">
      <contacts-grid :data="contactList" @change="saveChanges" />
    </div>
    <add-contact v-if="showAdd" @confirm="saveChanges" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import ContactsGrid from "./contacts-grid.vue";
import AddContact from "./add-contact.vue";
import { Contact } from "@/interfaces";

@Component({
  components: {
    "contacts-grid": ContactsGrid,
    "add-contact": AddContact
  }
})
export default class HomePage extends Vue {
  contactList: Contact[] = [];
  showAdd = false;
  created() {
    const list = localStorage.getItem("ContactList");
    if (list) {
      this.contactList = JSON.parse(list) || [];
    } else this.contactList = [];
  }
  saveChanges(newList: Contact[]) {
    this.contactList = newList;
    localStorage.setItem("ContactList", JSON.stringify(this.contactList));
    this.showAdd = false;
  }
  addItem() {
    this.showAdd = true;
  }
}
</script>

<style lang="scss">
.home-page {
  .add-contact-button {
    position: relative;
    right: 40px;
    top: 20px;
    float: right;
    font-size: 15px;
  }
  .content {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .contacts-grid {
      max-width: 400px;
    }
  }
}
</style>
