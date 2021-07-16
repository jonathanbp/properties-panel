import {
  render
} from '@testing-library/preact/pure';

import TestContainer from 'mocha-test-container-support';

import {
  query as domQuery
} from 'min-dom';

import {
  insertCoreStyles,
  changeInput
} from 'test/TestHelper';

import TextArea, { isEdited } from 'src/components/entries/TextArea';

insertCoreStyles();

const noop = () => {};


describe('<TextArea>', function() {

  let container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });


  it('should render', function() {

    // given
    const result = createTextArea({ container });

    // then
    expect(domQuery('.bio-properties-panel-textarea', result.container)).to.exist;
  });


  it('should update', function() {

    // given
    const updateSpy = sinon.spy();

    const result = createTextArea({ container, setValue: updateSpy });

    const input = domQuery('.bio-properties-panel-input', result.container);

    // when
    changeInput(input, 'foo');

    // then
    expect(updateSpy).to.have.been.calledWith('foo');
  });


  describe('#isEdited', function() {

    it('should NOT be edited', function() {

      // given
      const result = createTextArea({ container });

      const input = domQuery('.bio-properties-panel-input', result.container);

      // when
      const edited = isEdited(input);

      // then
      expect(edited).to.be.false;
    });


    it('should be edited', function() {

      // given
      const result = createTextArea({ container, getValue: () => 'foo' });

      const input = domQuery('.bio-properties-panel-input', result.container);

      // when
      const edited = isEdited(input);

      // then
      expect(edited).to.be.true;
    });


    it('should be edited after update', function() {

      // given
      const result = createTextArea({ container });

      const input = domQuery('.bio-properties-panel-input', result.container);

      // assume
      expect(isEdited(input)).to.be.false;

      // when
      changeInput(input, 'foo');

      // then
      expect(isEdited(input)).to.be.true;
    });

  });

});


// helpers ////////////////////

function createTextArea(options = {}) {
  const {
    element,
    id,
    description,
    debounce = fn => fn,
    label,
    getValue = noop,
    setValue = noop,
    rows,
    container
  } = options;

  return render(
    <TextArea
      element={ element }
      id={ id }
      label={ label }
      description={ description }
      getValue={ getValue }
      setValue={ setValue }
      debounce={ debounce }
      rows={ rows } />,
    { container });
}