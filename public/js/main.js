Vue.http.options.emulateJSON = true;

var ScaleLoader = VueSpinner.ScaleLoader;

var spinner = new Vue({
	el: '#loader',
	components: {
		ScaleLoader
	},
	data () {
		return {
			color: '#3AB982',
            height: '35px',
            width: '4px',
            margin: '2px',
            radius: '2px'
		}
	}
});

var vm = new Vue({
	el: '#container',
	ready: function() {
		this.$http.get('../ques.json').then(function(response){
			this.$set('questions', response.json())
			if(localStorage.t==1){
				this.index=response.json().length-1;
			}
      	}, (response) => {
			  alert("Error");
      	});
	},	
	data: {
		index:0,
		ans:{},
		questions:''
	},
	methods: {
		click: function(index,select) {
			var bu = document.getElementById('bu');
			this.ans[index]=select;
			this.index=this.index+1;
			if(this.index==this.questions.length-1&&localStorage.t!=1){
				this.$http.post('/ans', this.ans).then(function(res) {
					if(res.body==1) localStorage.t=1;
				});
			}
			if(this.index!=0){
				bu.style.display="block";
			}
		},
		reverse: function(){
			this.index=this.index-1;
		}
	}	
});


window.onload = function () {
	var loader = document.getElementById('loader'),
		container = document.getElementById('container');
	loader.style.opacity=0;

	container.style.opacity=1;
}