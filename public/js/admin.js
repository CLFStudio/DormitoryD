Vue.http.options.emulateJSON = true;

var ques = new Vue({
    el: '#questions',
    data:{
        quesData: {questions:[]}
    },
    methods: {
        addAns: function (index) {
            if(this.tempAns){
                this.quesData.questions[index].ans.push(this.tempAns);
                this.tempAns="";
            }
        },
        addQues: function () {
            var tQues={question:'',ans:[]};
            this.quesData.questions.push(tQues);
        },
        save: function () {
            this.$http.post('/ques', this.quesData).then(function(res) {
			    if(res.body==1) alert("OK");
                else alert(res);
			});
        }
    }
});