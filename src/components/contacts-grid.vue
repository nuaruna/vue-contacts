<template>
  <table class="contacts-grid">
    <tbody v-if="formattedData.length">
      <tr v-for="item in formattedData" :key="item.id" class="item">
        <td>
          <div class="item__content" @click="selectContact(item.id)">
            <span class="name">{{ item.name || "Без имени" }}</span>
            <span class="phone" v-if="item.phone">{{ item.phone }}</span>
          </div>
        </td>
        <td v-if="item.id !== changingItem" width="10%">
          <div class="buttons">
            <button
              @click="deleteItem(item.id, item.name)"
              class="buttons__delete"
            />
          </div>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr class="emptyhelp">
        <td>
          <p>Список контактов пуст!</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Vue, Model, Component } from "vue-property-decorator";
import { Contact } from "@/interfaces";

@Component({})
export default class ContactsGrid extends Vue {
  @Model("change", { type: Array }) readonly data!: Contact[];

  private sortAsc = false;
  private changingItem: number | null = null;

  created() {
    this.sortAsc = false;
  }
  get formattedData(): Contact[] {
    return this.data || [];
  }

  saveChanges() {
    this.$emit("change", this.data);
  }

  selectContact(id: number) {
    this.$router.push({ path: `/contact/${id}` });
  }

  async deleteItem(id: number, name?: string) {
    const confirm = await this.$confirm(
      `Вы уверены, что хотите удалить контакт ${name}?`
    ).show();
    if (!confirm) return;
    const index = this.data.map(x => x.id).indexOf(id);
    if (index > -1) {
      this.data.splice(index, 1);
    }
    this.saveChanges();
  }
}
</script>

<style lang="scss">
.contacts-grid {
  width: 100%;
  .emptyhelp {
    text-align: center;
  }
  .item {
    .buttons {
      display: flex;
      justify-content: space-around;
    }
    &:hover {
      background-color: #b9b9b9;
    }
    td {
      border: 1px solid black;
    }
    &__content {
      padding-left: 10px;
      display: flex;
      flex-direction: column;
      .name {
        font-size: 20px;
      }
      .phone {
        font-size: 14px;
      }
      cursor: pointer;
    }
  }
}
</style>
