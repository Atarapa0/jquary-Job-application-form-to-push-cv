
$(document).ready(function () {
  $('#skills').select2({
    placeholder: "Select skills",
    allowClear: true
  });
});


$(document).ready(function () {
  // Form validation rules
  $(".form").validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        digits: true,  //pattern: /^[0-9]{10,11}$/,
        minlength: 10,
        maxlength: 13
      },website: {
        required: true,
        url: true
      },
       workCompany: {
        required: true
      },
      workTask: {
        required: true
      },
      workDuration: {
        required: true
      },
      workDescription: {
        required: true
      },
      educationName: {
        required: true
      },
      educationLevel: {
        required: true
      },
      educationDate: {
        required: true
      },
      qualificationsName: {
        required: true
      },
      qualificationsCompany: {
        required: true
      },
      qualificationsDate: {
        required: true
      },
      skills: {
        required: true
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") === "workExperience[]") {
        error.insertAfter(element.next(".select2-container"));
      } else {
        error.insertAfter(element);
      }
    },
    submitHandler: function (form) {
      // Form geçerli olduğunda buraya gelir
      var formData = collectFormData();
      submitData(formData);
      return false; // Sayfanın reload olmasını engeller
    }
  });



  // Form verilerini topla
  function collectFormData() {
    return {
      name: $("#name").val().toString(),
      email: $("#email").val().toString(),
      phone: $("#phone").val(),
      workplaceType: $("#workplaceType").val().toString(),
      employmentType: $("#employmentType").val().toString(),
      jobLocation: $("#jobLocation").val().toString(),
      termsCheckbox: $("#termsCheckbox").is(":checked"),
      timestamp: new Date().toISOString()
    };
  }

  // POST isteği simülasyonu
  function submitData(data) {
    $.ajax({
      url: 'https://httpbin.org/post',
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function (response) {
        console.log("POST Response:", response);
        saveToLocalStorage(data);
        alert("Form başarıyla gönderildi! Network tab'ı kontrol edin.");
      },
      error: function (xhr, status, error) {
        console.log("Error:", error);
        alert("POST isteği gönderildi ama hata aldı. Network tab'ı kontrol edin.");
      }
    });
  }

  function saveToLocalStorage(data) {
    var applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push(data);
    localStorage.setItem('applications', JSON.stringify(applications));
    console.log("LocalStorage'a kaydedildi:", data);
  }

  $(".checkmark").click(function () {
    $("#termsCheckbox").trigger("click")
})
});

$(function(){
  $.extend($.validator.messages, {
            required: "Bu alanın doldurulması zorunludur.",
            email: "Lütfen geçerli bir e-posta adresi giriniz.",
        });
})