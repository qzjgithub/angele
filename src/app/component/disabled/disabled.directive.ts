/**
 * Created by admin on 2017/6/22.
 */
import {
  Directive,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[disabled]',
  exportAs: 'disabled'
})
export class DisabledDirective implements OnInit {

  ngOnInit(): void {
    console.log('disabled');
  }
}
