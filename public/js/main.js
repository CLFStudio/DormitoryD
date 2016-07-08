Vue.http.options.emulateJSON = true;

var vm = new Vue({
	el: '#container',
	ready: function() {
		this.$http.get('../ques.json').then(function(response){
			this.$set('questions', response.json())
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
				this.$http.post('/ans', this.ans).then(function(res) {
					if(res.body==1) localStorage.t=1;
					else{
						alert('Wrong');
					}
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