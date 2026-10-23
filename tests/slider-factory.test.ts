import { expect, it } from 'vitest';
import { runInNewContext } from 'node:vm';
import { sliderChunk } from '../scripts/slider-factory.mjs';

it('emits only the slider registration without executing the page bootstrap or module', () => {
  const source = '(function(){const modules={4345:function(e,t,i){i(1).define("slider",function(){});},99:function(){throw Error("unrelated");}}; throw Error("page bootstrap");})();';
  const self = { webpackChunk: [] as any[] };
  runInNewContext(sliderChunk(source, 4345), { self });
  expect(self.webpackChunk).toHaveLength(1);
  expect(Object.keys(self.webpackChunk[0][1])).toEqual(['4345']);
  expect(typeof self.webpackChunk[0][1][4345]).toBe('function');
});
it('rejects missing or unexpected factories', () => {
  expect(() => sliderChunk('({99:function(){}})', 4345)).toThrow('Missing');
  expect(() => sliderChunk('({4345:function(){}})', 4345)).toThrow('Unexpected');
});
