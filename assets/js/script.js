
$(document).ready(function () {
  $('#employmentType').select2({
    placeholder: "Select employment types",
    allowClear: true
  });

  $('#workplaceType').select2({
    placeholder: "Choose workplace type",
    allowClear: true
  });

  $('#jobLocation').select2({
    placeholder: "Choose location",
    allowClear: true
  });
});


/*
$(document).ready(function () {
  $("#name").blur(function () {
    if (this.value.match(/[^a-zA-Z\s]/g)) {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
      $("#name-error").text("Sadece harf girişine izin verilir.").show();
    } else {
      $("#name-error").hide();
    }
  });
  $("#email").blur(function () {
    // Email formatını kontrol et
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(this.value)) {
      $("#email-error").text("Geçerli bir e-posta adresi girin.").show();
    } else {
      $("#email-error").hide();
    }
  });

  $("#phone").blur(function () {
    var phoneRegex = /^0[0-9]{10}$/; // 10 haneli telefon numarası için basit bir regex
    if (!phoneRegex.test(this.value)) {
      $("#phone-error").text("Boşluk bırakmadan geçerli bir telefon numarası girin. Örn: 0555 555 55 55").show();
    } else {
      $("#phone-error").hide();
    }
  });
});*/

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
      },
      workplaceType: {
        required: true
      },
      employmentType: {
        required: true
      },
      jobLocation: {
        required: true
      },

    },
    errorPlacement: function (error, element) {
      if (element.attr("name") === "workplaceType" || element.attr("name") === "employmentType" || element.attr("name") === "jobLocation") {
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
            maxlength: $.validator.format("Lütfen en fazla {0} karakter uzunluğunda bir değer giriniz."),
            minlength: $.validator.format("Lütfen en az {0} karakter uzunluğunda bir değer giriniz."),
        });
})