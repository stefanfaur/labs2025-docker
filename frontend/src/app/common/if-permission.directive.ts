import {Directive, effect, inject, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Directive({
  selector: '[appIfPermission]',
  standalone: true
})
export class IfPermissionDirective {

  authService = inject(AuthService)
  
  constructor(
    private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef
  ) {
    effect(() => {
      const shouldShow = this.authService.isAdmin();
      this.viewContainer.clear();
      if (shouldShow) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

}
