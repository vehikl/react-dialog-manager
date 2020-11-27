import { Component } from './types/Component';

type DialogObject = { [name: string]: Component };

class DialogService {
  dialogs: DialogObject = {};

  register(name: string, dialog: Component) {
    this.dialogs[name] = dialog;
  }

  registerMultiple(dialogs: DialogObject) {
    this.dialogs = dialogs;
  }

  get(name: string): Component {
    if (!this.dialogs[name]) {
      throw new Error(`Dialog ${name} not found`);
    }
    return this.dialogs[name];
  }
}

export default new DialogService();
