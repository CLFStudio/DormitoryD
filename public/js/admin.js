var ques = new Vue({
    el: '#questions',
    data:{
        questions: [
            {
                question: '',
                ans: ['233','344'],
            }
        ]
    },
    methods: {
        addAns: function () {

        },
        addQues: function () {
            var tQues={question:'',ans:[]};
            this.questions.push(tQues);
        }
    }
});