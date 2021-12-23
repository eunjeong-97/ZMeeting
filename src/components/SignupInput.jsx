import React from 'react'

const SignupInput = props => {
  const { signupItem } = props
  const {
    label,
    type,
    id,
    maxLength,
    minLength,
    errorMessage,
    onChange,
    isValid,
    value,
  } = signupItem

  return (
    <div className="contents">
      <h6 className="contents_title">
        <label htmlFor={id}>{label}</label>
      </h6>
      <div className="contents_input">
        <input
          type={type}
          id={id}
          name={id}
          minLength={minLength}
          maxLength={maxLength}
          onChange={onChange}
          value={value}
        />
      </div>
      {!isValid && <p className="contents_error">{errorMessage}</p>}
    </div>
  )
}

SignupInput.defaultProps = {
  type: 'text',
  minLength: '2',
  maxLength: '10',
  value: '',
}

export default SignupInput
