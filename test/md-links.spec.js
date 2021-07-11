const modulo = require('../modulo');
const mdLinks = require('../mdlinks');



describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

});

  

const file = '../links.md';

test('mdLinks es un objeto', () => {
  expect(typeof mdLinks).toBe('object');
});
test('Debería devolver true a una ruta absoluta', () => {
  expect(mdLinks.isAbsolute(file)).toBeFalsy();
});
test('Debería devolver la extensión del archivo', () => {
  expect(mdLinks.checkExtName(file)).toBe('.md');
});
