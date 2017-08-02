function x() {
   var promise = new Promise(function(resolve, reject) {
     window.setTimeout(function() {
       resolve('done!');
     });
   });
   return promise;
}

x().then(function(done) {
  console.log(done); // --> 'done!'
});
