document.body.textContent.trim().split('\n')
.reduce(function x(sum,n,v){return sum+((v=(n/3|0)-2)<9?v:v+x(0,v))},0) // 4836845
