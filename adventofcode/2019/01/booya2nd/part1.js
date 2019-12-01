document.body.textContent.trim().split('\n')
.reduce((sum,n)=>sum+=(n/3|0)-2,0)  // 3226488
