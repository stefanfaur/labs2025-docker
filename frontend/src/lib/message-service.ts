import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';


@Injectable({
  providedIn: "root"
})
export class MessageService {

  private document = inject(DOCUMENT);

  log(message: string, data: any): void {
    // Create div
    const div = this.document.createElement('div');
    div.classList.add('toast-message');

    // Create h2
    const h2 = this.document.createElement('h2');
    h2.textContent = message;

    // Create p
    const p = this.document.createElement('p');
    p.textContent = JSON.stringify(data).substring(0, 1000) + '...';

    // Append h2 and p to div
    div.appendChild(h2);
    div.appendChild(p);

    // Append div to body
    this.document.body.appendChild(div);

    // Remove div after 5 seconds
    setTimeout(() => {
      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    }, 10000);
  }

}
