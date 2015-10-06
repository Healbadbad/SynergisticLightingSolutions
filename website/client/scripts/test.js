/**
 * Created by wrightjt on 10/2/2015.
 */
Template.test.events({
   'change input': function(e) {
       files = $("input[type='file']")[0].files[0];
       // console.log(files);
       // e.preventDefault();
       // e.stopPropagation();
       // var reader = new FileReader();
       // console.log(files);
       // //reader.onloadend = function() {
           //console.log(reader.result);
       // Meteor.call('uploadEchoFile', files, "IQ8ICKDOZGGE74XJQ", function(url){
       //    console.log("this is dumb " + url);
          
       // });
      Meteor.call('uploadEchoFile', files, "IQ8ICKDOZGGE74XJQ", iFuckingHateMeteor);
       
   }
});

function iFuckingHateMeteor(jsonURL){
  Meteor.http.call("GET",
    jsonURL,
    function(error, result){
      if(result.statusCode === 200){
        console.log("fuck this shit");
        console.log(result);
      }
    }
  );
}