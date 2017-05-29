    window.onload=function() {

    var user = {
        language: '',
        name: '',
        company: ''
    };

    var guidelines = [
        {
            image: 'evacuation.png',
            text: 'Evakuation'
        },
        {
            image: 'vest.png',
            text: 'Vest'
        }
    ];

    var recommendations = [
        {
            image: 'stairs.png',
            text: 'Forsigtig færdsel på trapper. Vi anbefaler, at man holder ved gelænder ved færdsel på trapper.'
        },
    ];

    var quiz = {
        title: 'Quiz',
        questions: [
            {
                title: "Ved rundgangen skal jeg?",
                description: "",
                image: '',
                answers: [
                    { text: 'Altid blive sammen med gruppen', correct: true },
                    { text: 'Det er OK, hvis jeg stopper, hvis noget ser interessant ud', correct: false },
                    { text: 'Hvis jeg bare følger op senere, er det OK', correct: false },
                ],
                message: '',
                answered: false,
                correct: false,
            }, {
                title: "Question 2",
                description: "Description",
                image: 'question2.png',
                answers: [
                    { text: 'Wrong, too bad.', correct: false },
                    { text: 'Right!', correct: true },
                    { text: 'Wrong!', correct: false },
                ],
                message: '',
                answered: false,
                correct: false,
            }
        ]
    };

    new Vue({
        el: "#app",
        data: {
            slideIndex: 0,
            user: user,
            guidelines: guidelines,
            recommendations: recommendations,
            quiz: quiz,
            questionIndex: 0,
            quizCompleted: false,
            questionCompleted: false,
            responses: new Array(quiz.questions.length)
        },
        methods: {
            selectLanguage: function(language) {
                this.user.language = language;
                this.nextSlide();
            },
            nextSlide: function () {
                this.slideIndex++;
            },
            prevSlide: function () {
                this.slideIndex--;
            },
            next: function() {
                // Get question and answer
                var question = this.quiz.questions[this.questionIndex];
                var answer = question.answers[this.responses[this.questionIndex]];

                // Set data
                question.answered = true;
                question.correct = answer.correct;

                //  If answer correct, proceed
                if (question.correct === true) {
                    this.questionIndex++;
                } else {
                    question.message = 'Wrong.';
                }
            },
            prev: function() {

                if (this.questionIndex === 0) {
                    this.prevSlide();
                    return;
                }

                // Reset answered if answer was incorrect.
                var question = this.quiz.questions[this.questionIndex];
                if (question.answered && question.correct === false) {
                    question.answered = false;
                }

                this.questionIndex--;
            },
            unanswer: function () {
                this.quiz.questions[this.questionIndex].answered = false;
            },
            // TODO: Refactor
            score: function () {
                return quiz.questions.length;
            }
        }
    });
}
