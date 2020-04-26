import React, { useState } from 'react'

export default function AnswerTile (props) {
    const [clicked, setClicked] = useState(false);
    const { answer, clickHandler } = props;

    const handleClick = () => {
        clickHandler(answer);
        setClicked(true)
    };

    let selectedClasses = clicked ? answer['correct_answer'] ? "correct" : "incorrect" : "";

    return (
        <div className={`answer ${selectedClasses}`} onClick={clicked ? null : handleClick}>
            <span className="answer-letter">{answer["letter"] + ")"}</span>
            <div className="answer-text" dangerouslySetInnerHTML={{ __html: answer.text }} />
        </div>
    )
}
