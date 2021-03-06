Vue.http.options.emulateJSON = true;
Vue.config.devtools = true;

var ques = new Vue({
    el: '#questions',
    data:{
        quesData: [],
        tempAns: ''
    },
    methods: {
        addAns: function (index) {
            if(this.tempAns){
                this.quesData[index].ans.push(this.tempAns);
                this.tempAns="";
            }
        },
        addQues: function () {
            var tQues={question:'',ans:[]};
            this.quesData.push(tQues);
        },
        save: function () {
            var quesData=this.quesData;
            var quesDataNow={
                time:Date(),
                data:quesData
            }
            quesDataNow = JSON.stringify(quesDataNow);
            this.$http.post('/questions/post', quesDataNow, { emulateJSON: true }).then(function(res) {
			    var ans = JSON.parse(res.body);
                if(ans.ok) alert("Save ok");
                else alert("Wrong");
			});
        }
    }
});