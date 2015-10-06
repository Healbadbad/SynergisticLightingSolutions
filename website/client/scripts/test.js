/**
 * Created by wrightjt on 10/2/2015.
 */
Template.test.events({
   'change input': function(e) {
       files = $("input[type='file']")[0].val();
       console.log(files);
       e.preventDefault();
       e.stopPropagation();
       var reader = new FileReader();
       console.log(files);
       //reader.onloadend = function() {
           //console.log(reader.result);
       Meteor.call('uploadEchoFile', files, "IQ8ICKDOZGGE74XJQ");

       //};

   }
});