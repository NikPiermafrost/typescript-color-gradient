import { Gradient } from '../src/index';
import tap from 'tap';

tap.test('It generates a gradient', (t) => {
  t.test('It generates a gradient from devault value', (sub) => {
    sub.equal(new Gradient().getColors().length, 10);
  
    sub.doesNotThrow(() => new Gradient().getColors());
    sub.end();
  });

  t.test('it generates a gradient from one color', (sub) => {
    sub.equal(new Gradient().setGradient('#000000').getColors().length, 10);

    sub.doesNotThrow(() => new Gradient().setGradient('#000000').getColors());
    sub.end();
  });

  t.test('It generates a gradient from more colors', (sub) => {
    sub.equal(new Gradient().setGradient('#000000', 'ff00ff').getColors().length, 10);

    sub.doesNotThrow(() => new Gradient().setGradient('#000000', 'ff00ff').getColors());
    sub.end();
  });

  t.test('it generates a gradient of 20 elements', (sub) => {
    sub.equal(new Gradient().setNumberOfColors(20).getColors().length, 20);

    sub.doesNotThrow(() => new Gradient().setNumberOfColors(20).getColors());
    sub.end();
  });

  t.test('It retreives a color by index correctly', (sub) => {
    sub.doesNotThrow(() => new Gradient().getColor(1));

    sub.throws(() => new Gradient().getColor(10), RangeError(`value should be lesser than ${10}`));

    sub.end();
  });

  t.test('It throws correct excpetions', (sub) => {
    sub.throws(() => new Gradient().setNumberOfColors(-1), RangeError('midPoint should be greater or equal than 0'));
    sub.throws(() => new Gradient().setNumberOfColors(NaN), RangeError('midPoint should be a number'));
    sub.throws(() => new Gradient().setGradient('Mario').setNumberOfColors(10), Error('All colors must be defined and/or not empty'));
    sub.throws(() => new Gradient().getColor(+'Pippo'), Error('value should be a number'));
    sub.throws(() => new Gradient().getColor(NaN), Error('value should be a number'));
    sub.throws(() => new Gradient().getColor(-1), RangeError('value should be greater or equal than 0'));
    sub.throws(() => new Gradient().setGradient('Pippo').getColors(), Error('All colors must be defined and/or not empty'));
    sub.throws(() => new Gradient().setGradient('#Pippo').getColors(), Error('All colors must be defined and/or not empty'));
    sub.throws(() => new Gradient().setGradient('#00fz00').getColors(), Error('All colors must be defined and/or not empty'));

    sub.end();
  });

  t.endAll();
});