import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: "root"
})
export class MessageService {

  private document = inject(DOCUMENT);
  private toastContainer: HTMLElement | null = null;

  constructor() {
    this.createToastContainer();
    this.addToastStyles();
  }

  private createToastContainer(): void {
    if (!this.toastContainer) {
      this.toastContainer = this.document.createElement('div');
      this.toastContainer.classList.add('toast-container');
      this.document.body.appendChild(this.toastContainer);
    }
  }

  private addToastStyles(): void {
    // Check if styles already exist
    if (this.document.getElementById('toast-styles')) return;

    const style = this.document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast-container {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        gap: 12px;
        pointer-events: none;
      }

      .toast-message {
        background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
        color: white;
        padding: 16px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(255, 107, 53, 0.3), 0 4px 16px rgba(0, 0, 0, 0.1);
        min-width: 300px;
        max-width: 400px;
        pointer-events: auto;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
      }

      .toast-message::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 100%);
      }

      .toast-message.show {
        transform: translateX(0);
        opacity: 1;
      }

      .toast-message.hide {
        transform: translateX(100%);
        opacity: 0;
      }

      .toast-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
      }

      .toast-icon {
        font-size: 20px;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
      }

      .toast-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        flex: 1;
      }

      .toast-close {
        background: none;
        border: none;
        color: rgba(255, 255, 255, 0.8);
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
      }

      .toast-close:hover {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        transform: scale(1.1);
      }

      .toast-content {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.5;
        max-height: none;
        overflow-wrap: break-word;
        word-break: break-all;
        background: rgba(255, 255, 255, 0.1);
        padding: 12px;
        border-radius: 6px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        margin-top: 8px;
        white-space: pre-wrap;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 8;
        overflow: hidden;
      }

      .toast-message:hover {
        transform: translateX(-5px) scale(1.02);
        box-shadow: 0 12px 40px rgba(255, 107, 53, 0.4), 0 6px 20px rgba(0, 0, 0, 0.15);
      }

      @media (max-width: 480px) {
        .toast-container {
          top: 10px;
          right: 10px;
          left: 10px;
        }

        .toast-message {
          min-width: auto;
          max-width: none;
        }

        .toast-content {
          -webkit-line-clamp: 6;
          font-size: 10px;
        }
      }
    `;
    this.document.head.appendChild(style);
  }

  log(message: string, data: any): void {
    // Create toast div
    const toast = this.document.createElement('div');
    toast.classList.add('toast-message');

    // Create header
    const header = this.document.createElement('div');
    header.classList.add('toast-header');

    // Create icon
    const icon = this.document.createElement('span');
    icon.classList.add('toast-icon');
    icon.textContent = '🍕';

    // Create title
    const title = this.document.createElement('h3');
    title.classList.add('toast-title');
    title.textContent = message;

    // Create close button
    const closeBtn = this.document.createElement('button');
    closeBtn.classList.add('toast-close');
    closeBtn.innerHTML = '×';
    closeBtn.onclick = () => this.removeToast(toast);

    // Create content
    const content = this.document.createElement('div');
    content.classList.add('toast-content');
    const dataStr = JSON.stringify(data).substring(0, 1000) + '...';
    content.textContent = dataStr;

    // Assemble toast
    header.appendChild(icon);
    header.appendChild(title);
    header.appendChild(closeBtn);
    toast.appendChild(header);

    // Only add content if data is meaningful
    if (data && Object.keys(data).length > 0) {
      toast.appendChild(content);
    }

    // Add to container
    if (this.toastContainer) {
      this.toastContainer.appendChild(toast);
    }

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 50);

    // Auto remove after 4 seconds
    setTimeout(() => this.removeToast(toast), 4000);
  }

  private removeToast(toast: HTMLElement): void {
    toast.classList.add('hide');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 400);
  }
}
