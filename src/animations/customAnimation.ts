import { Animation, createAnimation } from '@ionic/core';

export const customAnimation = (baseEl: HTMLElement, opts: any): Animation => {
  const enteringAnimation = createAnimation()
    .addElement(opts.enteringEl)
    .fromTo('opacity', '0', '1')
    .fromTo('transform', 'translateX(100%)', 'translateX(0)');

  const leavingAnimation = createAnimation()
    .addElement(opts.leavingEl)
    .fromTo('opacity', '1', '0')
    .fromTo('transform', 'translateX(0)', 'translateX(-100%)');

  return createAnimation()
    .addElement(baseEl)
    .easing('ease-out')
    .duration(500)
    .addAnimation([enteringAnimation, leavingAnimation]);
};                  