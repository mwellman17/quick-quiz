import React, { useState } from 'react';

export default function QuizTile (props) {
    const [copied, setCopied] = useState(false);
    const { quiz, handleEdit } = props;
    const pathName = quiz.id + '=:' + quiz.name.match(/[\w]/g).join('');
    const fullPath = `/quizzes/${pathName}`;

    const renderCopyLink = () => {
        if (document.queryCommandSupported('copy')) {
            const copyToClipboard = () => {
                const textField = document.createElement('textarea');
                textField.innerText = `http://quick-quizzer.herokuapp.com${fullPath}`;
                document.body.appendChild(textField);
                textField.select();
                document.execCommand('copy');
                textField.remove();
                setCopied(true);
                setTimeout( () => setCopied(false), 3000)
            };
            if (copied) {
                return (
                    <span className="tip">
                        <i className="fas fa-clipboard-check action success"/>
                        <span>copied!</span>
                    </span>
                )
            }
            else {
                return (
                    <span className="tip">
                        <i onClick={copyToClipboard} className="fas fa-clipboard-list action"/>
                        <span>copy link to clipboard</span>
                    </span>
                )
            }
        }
    };

    return (
        <div className="quiz-tile">
            <span className="tip">
                <i onClick={() => handleEdit(pathName)} className="far fa-edit action"/>
                <span>edit</span>
            </span>
            {renderCopyLink()}
            <a className="action" href={fullPath}>{quiz.name}</a>
        </div>
    )
}