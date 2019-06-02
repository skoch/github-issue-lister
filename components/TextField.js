import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from '../styles/components/textfield.scss';
import { generateUniqueId } from '../utils/misc';

class TextField extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    floatingLabelText: PropTypes.string,
    type: PropTypes.oneOf([
      'email',
      'text',
      'tel',
      'password',
    ]),
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    value: '',
    placeholder: '',
    floatingLabelText: '',
    type: 'text',
    onChange: null,
    onFocus: null,
    onBlur: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value || '',
      focused: false,
      uniqueId: 0,
    };
  }

  componentWillMount() {
    const {
      name,
      placeholder,
      floatingLabelText,
    } = this.props;

    this.setState({
      ...this.state,
      uniqueId: generateUniqueId({
        name,
        placeholder,
        floatingLabelText,
      }),
    });
  }

  handleInputFocus = () => {
    const { onFocus } = this.props;
    this.setState({
      ...this.state,
      focused: true,
    });

    if (onFocus) {
      onFocus();
    }
  }

  handleInputBlur = () => {
    const { onBlur } = this.props;
    this.setState({
      ...this.state,
      focused: false,
    });

    if (onBlur) {
      onBlur();
    }
  }

  handleInputChange = (event) => {
    const { onChange } = this.props;
    const { value } = event.target;

    this.setState({
      ...this.state,
      value,
    });

    if (onChange) {
      onChange(event);
    }
  }

  render() {
    const {
      type,
      name,
      placeholder,
      floatingLabelText,
    } = this.props;
    const {
      value,
      focused,
      uniqueId,
    } = this.state;

    const textfieldClassName = classnames(
      styles.textfield,
      { [styles.focus]: focused },
    );

    const labelClassName = classnames(
      { [styles.valueSet]: !!value },
    );

    return (
      <div className={styles.textfieldWrapper}>
        <div className={textfieldClassName}>
          <label
            className={labelClassName}
            htmlFor={uniqueId}
          >
            {floatingLabelText}
          </label>
          <input
            id={uniqueId}
            type={type}
            name={name}
            placeholder={focused ? placeholder : ''}
            value={value}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
            onFocus={this.handleInputFocus}
            required
          />
        </div>
      </div>
    );
  }
}

export default TextField;
