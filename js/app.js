window.onload=function() {

    // Translation
    Vue.use(Polyglot, {
        defaultLanguage: 'english',
        languagesAvailable: ['dansk']
    });

    Vue.locales({
        'dansk': {
            'information_title': 'Indtast din information',
            'information_name': 'Navn',
            'information_company': 'Firma',
            'information_required': 'Påkrævet',
            'slide_next': 'Næste',
            'slide_previous': 'Tilbage',
            'guidelines': 'Retningslinjer',
            'recommendations': 'Anbefalinger',
            'quiz_error': 'Desværre, forkert svar.',
            'quiz_success': 'Du har svaret rigtigt!',
        },
        'english': {
            'information_title': 'Input your information',
            'information_name': 'Name',
            'information_company': 'Company',
            'information_required': 'Required',
            'slide_next': 'Next',
            'slide_previous': 'Previous',
            'guidelines': 'Guidelines',
            'recommendations': 'Recommendations',
            'quiz_error': 'Sorry, that is wrong.',
            'quiz_success': 'That is correct!',
        }
    });

    // Objects
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
                answered: false,
                correct: false,
            }
        ]
    };

    // Application
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
                this.$polyglot.setLang({lang: language});
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
