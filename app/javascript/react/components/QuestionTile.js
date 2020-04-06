import React, { Component } from 'react'
import AnswerTile from "./AnswerTile";

class QuestionTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guesses: 0,
            points: null
        }
    }

    handleClick = (isCorrect) => {
        const { feedPoints } = this.props;
        const { guesses } = this.state;

        let newGuessCount = guesses + 1;
        if (isCorrect) {
            let totalPoints;
            if (newGuessCount === 1) totalPoints = 10;
            else if (newGuessCount === 2) totalPoints = 5;
            else if (newGuessCount === 3) totalPoints = 3;
            else totalPoints = 0;
            feedPoints(totalPoints);
            this.setState({ points: totalPoints })
        }
        else this.setState({ guesses: newGuessCount })
    };

    render() {
        const { handleClick } = this;
        const { question } = this.props;
        const { points } = this.state;

        let count = 0;
        let renderAnswers = question["answers"].map(answer => {
            count ++;
            return <AnswerTile key={count} answer={answer} clicked={handleClick} />
        });

        let renderImage = () => {
            if (question['image_url']) {
                return (
                    <a href="http://quick-quizzer.herokuapp.com/PA_CXR.jpg" target="_blank" rel="noopener noreferrer">
                        <img src={question['image_url']} alt=""/>
                    </a>
                )
            }
        };

        let renderPoints = () => {
            if (points != null) return <div className="score">{`+${points}`}</div>
        };

        let displayText = question.text.replace('most likely', '<b>most likely</b>');
        displayText = displayText.replace('best', '<b>best</b>');
        displayText = displayText.replace('true', '<b>true</b>');

        return (
            <div key={question.id} className="question">
                <h5>{question.number + ") "}<span dangerouslySetInnerHTML={{ __html: displayText }} /></h5>
                {renderImage()}
                {renderPoints()}
                <div className="answers">
                    {renderAnswers}
                </div>
            </div>
        )
    }
}

export default QuestionTile;