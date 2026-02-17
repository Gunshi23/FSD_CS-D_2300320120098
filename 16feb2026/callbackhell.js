const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hello');
    }, 1000);       
});
if (success){
    resolve('Hello');
}
else{    reject('Error');} 
myPromise.then((message) => {
    console.log(message);
    return 'World';
}).then((message) => {
    console.log(message);
}).catch((error) => {
    console.error(error);
});