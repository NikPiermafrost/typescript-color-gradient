import { generateGradient } from '../src/index';
import tap from 'tap';

tap.test('It generates a gradient', (t) => {
  t.test('It generates a gradient from devault value', (sub) => {
    sub.equal(generateGradient().length, 10);
  
    sub.doesNotThrow(() => generateGradient());
    sub.end();
  });

  t.test('it generates a gradient from one color', (sub) => {
    sub.equal(generateGradient(['#000000']).length, 10);

    sub.doesNotThrow(() => generateGradient(['#000000']));
    sub.end();
  });

  t.test('It generates a gradient from more colors', (sub) => {
    sub.throws(() => generateGradient(['#000000', 'ff00ff']), Error('Invalid color: ff00ff'));
    sub.end();
  });

  t.test('it generates a gradient of 20 elements', (sub) => {
    sub.equal(generateGradient([], 20).length, 20);

    sub.doesNotThrow(() => generateGradient([], 20));
    sub.end();
  });

  t.test('It generates a gradient from three colors and 25 elements', (sub) => {
    sub.equal(generateGradient(['#000000', '#ffffff', '#ff0000'], 25).length, 25);

    sub.doesNotThrow(() => generateGradient(['#000000', '#ffffff', '#ff0000'], 25));
    sub.end();
  });

  t.test('It throws correct excpetions', (sub) => {
    sub.throws(() => generateGradient([], -1), RangeError('Number of colors should be a non-negative integer'));
    sub.throws(() => generateGradient([], NaN), RangeError('Number of colors should be a non-negative integer'));
    sub.throws(() => generateGradient(['Mario']), Error('Invalid color: Mario'));
    sub.throws(() => generateGradient(['Pippo']), Error('Invalid color: Pippo'));
    sub.throws(() => generateGradient(['#Pippo']), Error('Invalid color: #Pippo'));
    sub.throws(() => generateGradient(['#00fz00']), Error('Invalid color: #00fz00'));

    sub.end();
  });

  t.endAll();
});