import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface Props{
	isOpen: boolean;
	onClose: () => void;
}

export class Modal extends React.Component<Props, {}> {
    render() {
      if (this.props.isOpen === false)
        return null

      return (
        <div>
          <div className="modal">
            {this.props.children}
          </div>
          <div className="bg" onClick={e => this.close(e)}/>
        </div>
      )
    }

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }