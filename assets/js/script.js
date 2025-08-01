/*$(document).ready(function () {
  $("#addTaskButton").click(function () {
    console.log("Add Task button clicked");
    var inputValue = $("#taskInput").val();
    console.log("Input value: " + inputValue);
    if (inputValue != "") {
      $("#taskList").append(
        '<li><input type="checkbox" id="taskCheckbox" class="removeTaskButton"> <label for="taskCheckbox">' +
          inputValue +
          "</label></li>"
      );
      console.log("Added task: " + inputValue);
      $("#taskInput").val("");
    }
    console.log("Task input cleared");
  });
});

$(document).click(function (event) {
  $(".removeTaskButton").on("click", function () {
    // $(this).parent().remove(); 
    var checked = $(this).is(":checked");
    if (checked) {
      console.log("Checkbox is checked" + $(this).is(":checked"));
      $(this)
        .next("label")
        .css("text-decoration", "line-through", "color", "red");
    }else{
        console.log("Checkbox is not checked" + $(this).is(":not(:checked)"));
        $(this).next("label").css("text-decoration", "none", "color", "black");
    }
  });
});*/


$(document).ready(function () {
  $('#addTaskButton').click(function () {
    const taskText = $('#taskInput').val().trim();
    if (taskText !== '') {
      addTask(taskText);
      $('#taskInput').val('');
    }
  });

  function addTask(text) {
    const taskItem = `
            <li class="task-item">
                <label class="custom-checkbox">
                    <input type="checkbox" class="checkbox-input">
                    <span class="checkmark">
                        <svg class="icon-checkmark">
                            <use xlink:href="#icon-checkmark"></use>
                        </svg>
                    </span>
                    <span class="task-text">${text}</span>
                </label>
            </li>
        `;
    $('#taskList').append(taskItem);
  }

  // Enter tuşu ile görev ekleme
  $('#taskInput').keypress(function (e) {
    var taskText = $('#taskInput').val().trim();
    if (e.which === 13 && taskText !== '') {
      addTask(taskText);
    }
  });
});
// boşlukta uyarı versin


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
        maxlength: 11
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
    messages: {
      name: {
        required: "Ad soyad zorunludur",
        minlength: "En az 2 karakter olmalı"
      },
      email: {
        required: "Email zorunludur",
        email: "Geçerli bir email adresi girin"
      },
      phone: {
        required: "Telefon zorunludur",
        digits: "Sadece rakam girin",
        minlength: "10 haneli olmalı",
        maxlength: "11 haneli olmalı"
      },
      workplaceType: {
        required: "Çalışma türü seçilmelidir"
      },
      employmentType: {
        required: "İstihdam türü seçilmelidir"
      },
      jobLocation: {
        required: "Lokasyon seçilmelidir"
      }
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
});



/*
$(document).ready(function () {
  // Submit butonu click eventi
  $("#submitBtn").click(function(e) {
    e.preventDefault();
    
    if (validateForm()) {
      var formData = collectFormData();
      submitData(formData);
    }
  });

  // Form validation diğerleride gelecek seçimler
  function validateForm() {
    var isValid = true;
    
    if ($("#name").val().trim() === "") {
      $("#name-error").text("Ad soyad zorunludur.").show();
      isValid = false;
    }
    
    if ($("#email").val().trim() === "") {
      $("#email-error").text("Email zorunludur.").show();
      isValid = false;
    }
    
    if ($("#phone").val().trim() === "") {
      $("#phone-error").text("Telefon zorunludur.").show();
      isValid = false;
    }
    
    return isValid;
  }
  
  // Form verilerini topla
  function collectFormData() {
    return {
      name: $("#name").val().trim(),
      email: $("#email").val().trim(),
      phone: $("#phone").val().trim(),
      workplaceType: $("#workplaceType").val(),
      employmentType: $("#employmentType").val(),
      jobLocation: $("#jobLocation").val(),
      timestamp: new Date().toISOString()
    };
  }
  
  // POST isteği simülasyonu
  function submitData(data) {
    $.ajax({
      url: 'https://httpbin.org/post', // Test endpoint
      type: 'POST',
      dataType: 'json',
      data: JSON.stringify(data),
      contentType: 'application/json',
      success: function(response) {
        console.log("POST Response:", response);
        saveToLocalStorage(data);
        alert("Form başarıyla gönderildi! Network tab'ı kontrol edin.");
      },
      error: function(xhr, status, error) {
        console.log("Error:", error);
        alert("POST isteği gönderildi ama hata aldı. Network tab'ı kontrol edin.");
      }
    });
  }
  
  // LocalStorage'a kaydet
  function saveToLocalStorage(data) {
    var applications = JSON.parse(localStorage.getItem('applications')) || [];
    applications.push(data);
    localStorage.setItem('applications', JSON.stringify(applications));
    console.log("LocalStorage'a kaydedildi:", data);
  }
});
*/