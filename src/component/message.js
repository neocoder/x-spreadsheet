/* global document */
import { h } from './element';
import Icon from './icon';
import { cssPrefix } from '../config';

const CLASS_NO_SCROLL = `${cssPrefix}-no-scroll`;

export function xtoast(title, content) {
  const el = h('div', `${cssPrefix}-toast`);
  const dimmer = h('div', `${cssPrefix}-dimmer active`);
  const remove = () => {
    document.body.removeChild(el.el);
    document.body.removeChild(dimmer.el);
    document.body.classList.remove(CLASS_NO_SCROLL);
  };

  el.children(
    h('div', `${cssPrefix}-toast-header`).children(
      new Icon('close').on('click.stop', () => remove()),
      title,
    ),
    h('div', `${cssPrefix}-toast-content`).html(content),
  );
  document.body.appendChild(el.el);
  document.body.appendChild(dimmer.el);
  document.body.classList.add(CLASS_NO_SCROLL);
  // set offset
  const { width, height } = el.box();
  const { clientHeight, clientWidth } = document.documentElement;
  el.offset({
    left: (clientWidth - width) / 2,
    top: (clientHeight - height) / 3,
  });
}

export default {};
