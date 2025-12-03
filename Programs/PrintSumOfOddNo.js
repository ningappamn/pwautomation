//Print sum of odd numbers from 0 to 50

let sum=0;
for(let i=0;i<=50;i++){

    if(i % 2 === 1){

    sum=sum+i;
    }
}

console.log(`Sum of odd numbers from 0 to 50 is : ${sum}`);