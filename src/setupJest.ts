import 'jest';
import 'jest-preset-angular';

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: prop => {
      return '';
    }
  })
});
