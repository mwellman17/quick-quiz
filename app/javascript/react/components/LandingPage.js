import React, { Component } from 'react'

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: null,
            questions: null
        }
    }
    componentDidMount(){
        fetch('/api/v1/quizzes', { credentials: 'same-origin' })
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
                this.setState({ quiz: body.quiz, questions: body.questions })
            })
            .catch(error => console.error(`Error in fetch: ${error.message}`))
    }

    renderQuiz = () => {
        const { quiz, questions } = this.state;
        if (!quiz) return <p>Loading...</p>;
        else {
            let renderQuestions = questions.map(question => {
                let renderAnswers = question["answers"].map(answer => {
                    return (
                        <div>
                            <p>{answer["letter"] + ") " + answer.text}</p>
                        </div>
                    )
                })
                return (
                    <div>
                        <h5>{question.number + ") " + question.text}</h5>
                        {renderAnswers}
                    </div>
                )
            })
            return (
                <div>
                    <h3>{quiz.name}</h3>
                    {renderQuestions}
                </div>
            )
        }
    };

    render() {
        const { renderQuiz } = this;

        return(
            <div>
                {renderQuiz()}
            </div>
        )
    }
}

export default LandingPage;