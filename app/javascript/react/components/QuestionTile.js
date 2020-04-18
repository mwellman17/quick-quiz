import React, { useState } from 'react'
import AnswerTile from "./AnswerTile";

export default function QuestionTile (props) {
    const [guesses, setGuesses] = useState(0);
    const [points, setPoints] = useState(null);
    const { question, feedPoints } = props;

    const handleClick = (isCorrect) => {
        let newGuessCount = guesses + 1;
        if (isCorrect) {
            let totalPoints;
            if (newGuessCount === 1) totalPoints = 10;
            else if (newGuessCount === 2) totalPoints = 5;
            else if (newGuessCount === 3) totalPoints = 3;
            else totalPoints = 0;
            feedPoints(totalPoints);
            setPoints(totalPoints)
        }
        else setGuesses(newGuessCount)
    };


    let count = 0;
    let renderAnswers = question["answers"].map(answer => {
        count ++;
        return <AnswerTile key={count} answer={answer} clickHandler={handleClick} />
    });

    let renderImage = () => {
        if (question['image_url']) {
            return (
                <a href={question['image_url']} target="_blank" rel="noopener noreferrer">
                    <img src={question['image_url']} alt=""/>
                </a>
            )
        }
    };

    let renderPoints = () => {
        if (points != null) return <div className="score">{`+${points}`}</div>
    };

    return (
        <div key={question.id} className="question">
            <h5>{question.number + ") "}<span dangerouslySetInnerHTML={{ __html: question.text }} /></h5>
            {renderImage()}
            {renderPoints()}
            <div className="answers">
                {renderAnswers}
            </div>
        </div>
    )
}
