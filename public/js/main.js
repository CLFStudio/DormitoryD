Vue.http.options.emulateJSON = true;
Vue.config.devtools = true;

var vm = new Vue({
	el: '#container',
	ready: function() {
		this.$http.get('/questions/get').then(function(response){
			this.$set('questions', response.json().data)
			if(localStorage.t==1){
				this.index=response.json().length-1;
			}
      	});
	},	
	data: {
		index:0,
		ans:{},
		questions:''
	},
	methods: {
		click: function(index,select) {
			this.ans[index]=select;
			this.index=this.index+1;
			if(this.index==this.questions.length-1&&localStorage.t!=1){
				this.$http.post('/ans/post', this.ans, { emulateJSON: true }).then(function(res) {
					var ans = JSON.parse(res.body);
                	if(ans.ok) {localStorage.t=1;alert("提交成功");}
					else alert("Wrong.Please ask Admin");
				});
			}
		},
		reverse: function(){
			this.index=this.index-1;
		}
	}	
});


window.onload = function () {
	var container = document.getElementById('container');
	container.style.opacity=1;
}