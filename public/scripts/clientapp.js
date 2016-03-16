

//jQuery
$(document).ready(function() {

    $('#submit-button').on('click', postData);
    $('.toggle').on('click', toggleButton);
    $('.peopleData').on('click','.nukeperson', nukePerson);

    getData();


});


function postData() {
    event.preventDefault();
    // serializeData();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });
      // $('#sql-form').find('input[type=text]').val('');
      $('#sql-form').trigger('reset');
}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log('Here is the GET data: ', data);
            appendDom(data);
        }
    });
}

function appendDom(dataArray) {
  $('.peopleData').empty();
  $('.peopleData').append('<ul></ul>');
  var $el = $('.peopleData').children().last();

  for (var i = 0; i < dataArray.length; i++) {
    $el.append('<div class="entry-box"> <p class="container entry"> ENTRY' + '   ' +
    dataArray[i].id + ': ' +
    dataArray[i].name + '  ' + '<br />' +
    dataArray[i].address + ' ' +
    dataArray[i].city + ', ' +
    dataArray[i].state + ' ' +
    dataArray[i].zip_code + '</p>' + '  ' +
    '<button class="nukeperson" data-id="' + dataArray[i].id + '">Delete Entry</button>' + '<br />' + '<br /> </div>');
  }
}

function nukePerson() {
  // console.log('Delete button works!');

  var delID = {
    id: $(this).data('id')
  };
  // console.log(delID);
  $.ajax({
    type: 'DELETE',
    url: '/delEntry',
    data: delID,
    success: function(data) {
      console.log('Deleted Entry: ', data);
      getData();
    }
  });
}

function toggleButton() {
  $('.peopleData').slideToggle();
}

//END _-_-_-_-_|



//experiemental code that either didn't work or that I made better, but still
//wanted to keep for some reason:

// $('.hide').on('click', hideButton);

// function showButton() {
//   getData(); //I realize this is unecessary and redundent, but I like having it here!
// }


// var values = {};
//
// function serializeData() {
//     var values = {};
//     $.each($('#sql-form').serializeArray(), function(i, field) {
//         values[field.name] = field.value;
//     return values;
//   });
//
// }
