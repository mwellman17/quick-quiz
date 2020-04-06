import React, { Component } from 'react'
import AnswerTile from "./AnswerTile";

class QuestionTile extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const { question } = this.props;
        let count = 0;
        let renderAnswers = question["answers"].map(answer => {
            count ++;
            return <AnswerTile key={count} answer={answer} />
        });

        let renderImage = () => {
            if (question['image_url']) return <img src={question['image_url']} alt=""/>
        }

        let displayText = question.text.replace('most likely', '<b>most likely</b>');
        displayText = displayText.replace('best', '<b>best</b>');
        displayText = displayText.replace('true', '<b>true</b>');

        return (
            <div key={question.id} className="question">
                <h5>{question.number + ") "}<span dangerouslySetInnerHTML={{ __html: displayText }} /></h5>
                {renderImage()}
                <div className="answers">
                    {renderAnswers}
                </div>
            </div>
        )
    }
}

export default QuestionTile;