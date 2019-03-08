import { querySelector } from '~/utils/dom/querySelector';
import './Splash.css';

export class Splash {
  private element = querySelector<HTMLDivElement>('.kata-splash');

  public fade() {
    this.element.style.transition = '0.3s';
    this.element.style.opacity = '0';
    this.element.style.visibility = 'hidden';
  }

  public error(err: any) {
    const message = querySelector<HTMLDivElement>('.kata-splash__error-details');
    message.innerText = err;

    this.element.classList.add('kata-splash--hasError');
  }
}
