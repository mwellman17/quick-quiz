import React, {useEffect, useState} from 'react';
import NewQuizFields from './NewQuizFields';
import { blankQuestion } from '../../utils/utils';
import _ from 'lodash';

export default function NewQuizForm (props) {
    const { editPath, onClose, user } = props;
    const [newQuiz, setNewQuiz] = useState({
        quiz: { name: "" },
        questions: [blankQuestion]
    });
    const [updateQuiz, setUpdateQuiz] = useState(null);

    useEffect(() => {
        if (editPath) {
            fetch(`/api/v1/quizzes/${editPath}`, { credentials: 'same-origin' })
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        let errorMessage = `${response.status} (${response.statusText})`,
                            error = new Error(errorMessage);
                        throw(error);
                    }
                })
                .then(response => {
                    return response.json();
                })
                .then(body => {
                    setUpdateQuiz({ quiz: body["quiz"], questions: body['questions'] });
                })
                .catch(error => console.error(`Error in fetch: ${error.message}`))
        }
    }, []);

    const validateForm = (payload) => {
        return true
    };

    const saveForm = (quiz, type) => {
        let payload = _.cloneDeep(quiz);
        payload['user'] = user;
        fetch(`/api/v1/quizzes${type === 'PATCH' ? `/${payload.quiz.id}`: ''}`, {
            method: type,
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    let errorMessage = `${response.status} (${response.statusText})`,
                        error = new Error(errorMessage);
                    throw(error);
                }
            })
            .then(response => response.json())
            .then(body => {
                onClose(body)
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`));
    };

    const handleSave = () => {
        if (updateQuiz) {
            if (validateForm(updateQuiz)) saveForm(updateQuiz, 'PATCH');
           // else render feedback
        } else {
            if (validateForm(newQuiz)) saveForm(newQuiz, 'POST');
            // else render feedback
        }
    };

    const renderForm = () => {
        if (editPath) {
            if (updateQuiz) {
                return <NewQuizFields data={updateQuiz} setData={setUpdateQuiz}/>
            } else return <p>loading...</p>
        } else {
            return <NewQuizFields data={newQuiz} setData={setNewQuiz}/>
        }
    };

    return (
        <div id="new-quiz-form">
            <h3>{editPath ? 'Edit Quiz' : 'Create a New Quiz'}</h3>
            {renderForm()}
            <div className="action-buttons">
                <button className="button" onClick={onClose}>Cancel</button>
                <button className="button" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}