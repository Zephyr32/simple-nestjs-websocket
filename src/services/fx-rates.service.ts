import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FxRatesService {
  /**
   * Generate a mock price feed by adding random numbers to a base rate
   * @returns {Observable}
   */

  public getFeed() {
    return new Observable((observer) => {
      setInterval(() => {
        const price = this.generatePrice();

        observer.next(price);
      }, 500);
    });
  }

  public generatePrice() {
    let base = 0.8;

    base += Math.random() / 10;

    return base;
  }
}
