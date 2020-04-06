import React, { Component } from 'react'

class AnswerTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    handleClick = (event) => {
        this.setState({ clicked: true })
    };

    render() {
        const { handleClick } = this;
        const { answer } = this.props;
        const { clicked } = this.state;
        let selectedClasses = clicked ? answer['correct_answer'] ? "correct" : "incorrect" : "";

        return (
            <p className={`answer ${selectedClasses}`} onClick={clicked ? null : handleClick}>
                {answer["letter"] + ") " + answer.text}
            </p>
        )
    }
}

export default AnswerTile;