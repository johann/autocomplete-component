import React from 'react'
import SuggestionItem from './SuggestionItem'

function markIt (input, query) {
  const escaped = query.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  const regex = RegExp(escaped, 'gi')

  return {
    __html: input.replace(regex, '<mark>$&</mark>')
  }
}

function filterSuggestions (query, suggestions, length) {
  const regex = new RegExp(`\\b${query}`, 'i');
  return suggestions.filter((item) => regex.test(item.name)).slice(0, length)
}

class Suggestions extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      options: filterSuggestions(this.props.query, this.props.suggestions, this.props.maxSuggestionsLength)
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({
      options: filterSuggestions(newProps.query, newProps.suggestions, newProps.maxSuggestionsLength)
    })
  }

  render () {
    if (!this.props.expandable || !this.state.options.length) {
      return null
    }

    const options = this.state.options.map((item, i) => {
      const key = `${this.props.listboxId}-${i}`
      const classNames = []

      if (this.props.selectedIndex === i) {
        classNames.push(this.props.classNames.suggestionActive)
      }

      if (item.disabled) {
        classNames.push(this.props.classNames.suggestionDisabled)
      }

      return (
        <SuggestionItem key={key}/>
      )
    })

    return (
      <div className={this.props.classNames.suggestions}>
        <ul role='listbox' id={this.props.listboxId}>{options}</ul>
      </div>
    )
  }
}

export default Suggestions
