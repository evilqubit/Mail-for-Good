import React, {Component, PropTypes} from 'react';
import 'react-quill/dist/quill.snow.css';

import TextEditorRich from '../../components/common/TextEditorRich';
import TextEditorPlain from '../../components/common/TextEditorPlain';

export default class TextEditor extends Component {

  static propTypes = {
    input: PropTypes.object.isRequired,
    textEditorValue: PropTypes.oneOfType(['string', 'object']), // Can be null or str
    textEditorType: PropTypes.string
  }

  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const oldType = this.props.textEditorType;
    const newType = nextProps.textEditorType;
    // Clear text editor on switch as html does not directly translate into plaintext
    if (oldType !== newType) {
      this.props.input.onChange('');
    }
  }

  state = {
    // NOTE: We're using state here rather than just directly hooking the component up with redux form
      // as doing so causes critical, weird buggy issues with the text editor.
    value: ''
  }

  onChange(value) {
    // Update redux form
    // See state comment for why we're updating two instances of component state
    this.setState({ value });
    this.props.input.onChange(value);
  }

  render() {
    const { value } = this.state;
    /*const {
      input: {
        value
      }
    } = this.props;*/

    const isPlaintext = this.props.textEditorType === 'Plaintext';

    const textEditorProps = {
      value,
      onChange: this.onChange
    };

    // Render either a plaintext or html editor
    return (
      isPlaintext
        ? <TextEditorPlain {...textEditorProps} />
        : <TextEditorRich {...textEditorProps} />
    );
  }

}
