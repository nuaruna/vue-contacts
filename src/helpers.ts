import { Contact, Parameter } from './interfaces';

export function getUniqParamId(item?: Contact | null): number | 0 {
  let i = 0;
  if (!item || !item.params) return 0;
  while (item.params.map(x => x.id).includes(i)) i++;
  return i;
}
export function addParam(item: Contact | null, newParam: Parameter){
    if (!item || !item.params || !newParam) return;
    if (item.params.length > 10) {
      alert("Превышено максимальное количество параметров у контакта! (10)");
      return;
    }
    if (!newParam.caption || !newParam.caption.trim()) {
      alert("Задайте название параметра!");
      return;
    }
    item.params.push(newParam);
}

export function deleteParam(id: number, item: Contact | null) {
    if (!item || !item.params) return;
    const index = item.params.map(x => x.id).indexOf(id);
    if (index > -1) {
      item.params.splice(index, 1);
    }
  }