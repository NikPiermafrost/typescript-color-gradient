import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateGradient } from '../src/index.ts';

describe('It generates a gradient', () => {
  it('It generates a gradient from devault value', () => {
    assert.equal(generateGradient().length, 10);
    assert.doesNotThrow(() => generateGradient());
  });

  it('it generates a gradient from one color', () => {
    assert.equal(generateGradient(['#000000']).length, 10);
    assert.doesNotThrow(() => generateGradient(['#000000']));
  });

  it('It generates a gradient from more colors', () => {
    assert.throws(() => generateGradient(['#000000', 'ff00ff']), new Error('Invalid color format: ff00ff'));
  });

  it('it generates a gradient of 20 elements', () => {
    assert.equal(generateGradient([], 20).length, 20);
    assert.doesNotThrow(() => generateGradient([], 20));
  });

  it('It generates a gradient from three colors and 25 elements', () => {
    assert.equal(generateGradient(['#000000', '#ffffff', '#ff0000'], 25).length, 25);
    assert.doesNotThrow(() => generateGradient(['#000000', '#ffffff', '#ff0000'], 25));
  });

  it('only two colors requested, return them', () => {
    const colors = ['#000000', '#ffffff'];
    assert.deepEqual(generateGradient(colors, 2), colors);
  });

  it('one color requested returns the first stop, zero returns none', () => {
    assert.deepEqual(generateGradient(['#ABCDEF', '#000000'], 1), ['#ABCDEF']);
    assert.deepEqual(generateGradient(['#ABCDEF'], 0), []);
  });

  it('It throws correct excpetions', () => {
    const rangeError = new RangeError('Number of colors should be a non-negative integer');
    assert.throws(() => generateGradient([], -1), rangeError);
    assert.throws(() => generateGradient([], NaN), rangeError);
    assert.throws(() => generateGradient(['Mario']), new Error('Invalid color format: Mario'));
    assert.throws(() => generateGradient(['Pippo']), new Error('Invalid color format: Pippo'));
    assert.throws(() => generateGradient(['#Pippo']), new Error('Invalid color format: #Pippo'));
    assert.throws(() => generateGradient(['#00fz00']), new Error('Invalid color format: #00fz00'));
  });
});
