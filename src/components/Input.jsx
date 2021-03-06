import React from 'react'

const SIZER_STYLES = {
  position: 'absolute',
  width: 0,
  height: 0,
  visibility: 'hidden',
  overflow: 'scroll',
  whiteSpace: 'pre'
}

const STYLE_PROPS = [
  'fontSize',
  'fontFamily',
  'fontWeight',
  'fontStyle',
  'letterSpacing'
]

class Input extends React.Component {
  constructor (props) {
    super(props)
    this.state = { inputWidth: null }
  }

  componentDidMount () {
    if (this.props.autoresize) {
      this.copyInputStyles()
      this.updateInputWidth()
    }

    if (this.props.autofocus) {
      this.input.focus()
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.autoresize && prevProps.query !== this.props.query) {
      this.updateInputWidth()
    }
  }

  componentWillReceiveProps (newProps) {
    if (this.input.value !== newProps.query) {
      this.input.value = newProps.query
    }
  }

  copyInputStyles () {
    const inputStyle = window.getComputedStyle(this.input)

    STYLE_PROPS.forEach((prop) => {
      this.sizer.style[prop] = inputStyle[prop]
    })
  }

  updateInputWidth () {
    this.setState({ inputWidth: Math.ceil(this.sizer.scrollWidth) + 2 })
  }

  render () {
    const sizerText = this.props.query || this.props.placeholder

    const { expandable, placeholder, listboxId, selectedIndex } = this.props

    const selectedId = `${listboxId}-${selectedIndex}`

    return (
      <div className={this.props.classNames.searchInput}>
        <input
          ref={(c) => { this.input = c }}
          role='combobox'
          placeholder={placeholder}
          style={{ width: this.state.inputWidth}} onFocus={this.props.onFocus} onBlur={this.props.onBlur}/>
        <div ref={(c) => { this.sizer = c }} style={SIZER_STYLES}>{sizerText}</div>
      </div>
    )
  }
}

export default Input
