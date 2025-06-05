import {Directive, effect, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Directive({
  selector: '[appIfPermission]',
  standalone: true
})
export class IfPermissionDirective {

  authService = inject(AuthService)
  isLoggedIn = toSignal(this.authService.isLoggedIn())
  constructor(
    private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef
  ) {
    effect(() => {
      const shouldShow = this.isLoggedIn();
      this.viewContainer.clear();
      if (shouldShow) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

}
