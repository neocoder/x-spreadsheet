/* global document, window */
import { h } from './element';
import { bind } from './event';
import { cssPrefix } from '../config';

export default function tooltip(html, target) {
  if (target.classList.contains('active')) {
    return;
  }
  const {
    left, top, width, height,
  } = target.getBoundingClientRect();
  const el = h('div', `${cssPrefix}-tooltip`).html(html).show();
  document.body.appendChild(el.el);
  const elBox = el.box();
  // console.log('elBox:', elBox);
  const tooltipLeft = left + (width / 2) - (elBox.width / 2) + window.scrollX;
  const tooltipTop = top + height + 2 + window.scrollY;
  el.css('left', `${tooltipLeft}px`)
    .css('top', `${tooltipTop}px`);

  bind(target, 'mouseleave', () => {
    if (document.body.contains(el.el)) {
      document.body.removeChild(el.el);
    }
  });

  bind(target, 'click', () => {
    if (document.body.contains(el.el)) {
      document.body.removeChild(el.el);
    }
  });
}
