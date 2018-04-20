import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

export const stateAnimation = trigger('state', [
  state('saved', style({backgroundColor: 'inherit'})),
  state('deleted', style({backgroundColor: 'inherit'})),
  transition('* => saved', animate('2s', keyframes([ // fade out
    style({backgroundColor: 'rgba(24, 170, 74, 0.8)', offset: 0}),
    style({backgroundColor: 'rgba(24, 170, 74, 0.6)', offset: 0.25}),
    style({backgroundColor: 'rgba(24, 170, 74, 0.3)', offset: 0.5}),
    style({backgroundColor: 'rgba(24, 170, 74, 0.2)', offset: 0.75})
  ]))),
  transition('* => deleted', animate('2s', keyframes([ // fade out
    style({backgroundColor: 'rgba(199, 24, 24, 0.8)', offset: 0}),
    style({backgroundColor: 'rgba(199, 24, 24, 0.6)', offset: 0.25}),
    style({backgroundColor: 'rgba(199, 24, 24, 0.3)', offset: 0.5}),
    style({backgroundColor: 'rgba(199, 24, 24, 0.2)', offset: 0.75})
  ])))
]);
