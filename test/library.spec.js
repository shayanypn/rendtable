/* global describe, it, before */

chai.expect();
const expect = chai.expect;

chai.should();
const should = chai.should;

describe(' - - - Check if library exist or not', () => {  
  it('should return library exist', () => {
    expect(RendTable).to.exist;
  });

  it('should return library version', () => {
    (typeof RendTable.version()).should.be.a('string');
  });

  it('should have foo', () => {
    document.getElementById('table').should.have.attr('foo')
  });
});
