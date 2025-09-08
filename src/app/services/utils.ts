import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Utils {
  static s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  static generateGuid() {
    return (
      this.s4() +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      '-' +
      this.s4() +
      this.s4() +
      this.s4()
    );
  }

  static getInstanceId() {
    const instanceId = localStorage.getItem('instanceId');
    if (!instanceId) {
      const guid = this.generateGuid();
      localStorage.setItem('instanceId', guid);

      return guid;
    }
    return instanceId;
  }
}
