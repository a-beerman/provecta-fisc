import { HttpErrorResponse } from '@angular/common/http';
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

  static getErrorMessage(
    err: HttpErrorResponse & { errors: any[] },
    action?: (role: string) => void
  ) {
    const exception = err?.error as any;
    let message = exception?.Message || '';

    if (!message) {
      if (typeof err.error === 'string') {
        // If the error is a string, use it directly
        message = err.error;
      } else if (err.error && err.error.message) {
        // If the error is an object with a message property, use that
        message = err.error.message;
      } else if (err.error && err.error.Message) {
        // If the error is an object with a Message property, use that
        message = err.error.Message;
      }
    }

    if (!message) {
      message = err.message;
    }

    // Handle structured error response with validation errors
    if (err.error && err.error.errors && Array.isArray(err.error.errors)) {
      const errorMessages = err.error.errors.map((error: any) => {
        if (error.property && error.constraints) {
          const constraintMessages = Object.values(error.constraints).join(
            ', '
          );
          return `${error.property}: ${constraintMessages}`;
        }
        return JSON.stringify(error);
      });

      const pattern =
        err.error.pattern ||
        err.error.message ||
        'Validation failed with errors:';
      message = `${pattern}\n${errorMessages.join('<br/>')}`;
    }
    // Handle simple array of errors (fallback)
    else if (err.errors) {
      message = err.errors.join(', ');
    }

    if (err.error?.response?.errors) {
      const additionalMessage = Object.keys(err.error.response.errors)
        .map((key) => err.error.response.errors[key].message)
        .filter((msg) => msg)
        .join('<br/>');

      if (additionalMessage) {
        message += `<br/><br/>${additionalMessage}`;
      }
    }

    if (!message) {
      return;
    }

    return message;
  }
}
