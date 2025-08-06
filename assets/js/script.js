$(document).ready(function () {
  $('#skills').select2({
    placeholder: "Select skills",
    allowClear: true
  });
  $('#tools').select2({
    placeholder: "Select tools",
    allowClear: true
  });

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
      title: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        digits: true,  //pattern: /^[0-9]{10,11}$/,
        minlength: 10,
        maxlength: 13
      }, website: {
        required: true,
        url: true
      },
      description: {
        required: true,
        minlength: 10
      },
      /*workCompany: {
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
      },*/
      skills: {
        required: true
      },
      tools: {
        required: true
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") === "skills" || element.attr("name") === "tools") {
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


  var workExperiences = [];
  var educations = [];
  var qualifications = [];
  var descriptionCount = 2; // açıklama sayacı



  // Form verilerini topla
  function collectFormData() {

    var descriptions = [];
    $('input[name="workDescription[]"]').each(function () {
      var val = $(this).val();
      if (val) descriptions.push(val);
    });

    $('input[name="workExperience[]"]').each(function () {
      var val = $(this).val();
      if (val) workExperiences.push(val);
    });
    return {
      name: $("#name").val().toString(),
      description: $("#description").val().toString(),
      title: $("#title").val().toString(),
      email: $("#email").val().toString(),
      phone: $("#phone").val(),
      website: $("#website").val().toString(),
      workExperiences: workExperiences,
      educationList: educations,
      qualifications: qualifications,
      skills: $("#skills").val() ? $("#skills").val().toString() : "",
      tools: $("#tools").val() ? $("#tools").val().toString() : "",
      termsCheckbox: $("#termsCheckbox").is(":checked"),
      timestamp: new Date().toISOString()
    };
  }
  // POST isteği simülasyonu
  function submitData(data) {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/posts',
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



  $("#add-workDescription").click(function () {
    var descHTML = `
      <div class="form_work_experience_description">
        <label>Description ${descriptionCount} *</label>
        <input type="text" name="workDescription[]" placeholder="Enter your work description" />
        <div class="error-message" style="display:none;"></div>
      </div>
    `;
    $("#work_description_list").append(descHTML);

    descriptionCount++; // sayacı artır
  });


  $("#add-workExperience").click(function () {
    // Inputlardan değerleri al
    var company = $('#workCompany').val().trim();
    var task = $('#workTask').val().trim();
    var duration = $('#workDuration').val().trim();

    // Açıklamaları dizi olarak topla
    var descriptions = [];
    $('input[name="workDescription[]"]').each(function () {
      var val = $(this).val().trim();
      if (val) descriptions.push(val);
    });

    // Basit validasyon
    if (!company || !task || !duration || descriptions.length === 0) {
      alert("Lütfen iş deneyimi ve açıklamaların tümünü doldurun.");
      return;
    }

    // Yeni iş deneyimini diziye ekle
    workExperiences.push({
      company: company,
      task: task,
      duration: duration,
      descriptions: descriptions
    });

    var indexwork = workExperiences.length - 1;

    console.log("Yeni iş deneyimi eklendi:", workExperiences);
    // Ekrana da göstermek istersen:
    $(".work_experience_list").append(`
    <div class="work_experience_item"  data-index="${indexwork}">
    <div class="cart p-4 m-0 border-0 bd-example m-0 border-0">
    <div class="cart_body">
      <p><strong>${company}</strong> <br>${task} <br>(${duration})</p>
      <img src="assets/images/delete_item.png" alt="delete item" class="img-fluid" />
      </div>
      <div class="cart_description">
      <ul>
        ${descriptions.map(desc => `<li>${desc}</li>`).join('')}
      </ul>
      </div>
      </div>
    </div>
  `);

    $('#workCompany').val('');
    $('#workTask').val('');
    $('#workDuration').val('');
    $("#work_description_list").empty();
    // İlk açıklama inputunu da temizle
    $('input[name="workDescription[]"]').first().val('');

    descriptionCount = 2;


  })



  $(document).on('click', '.work_experience_item img', function () {
    var $item = $(this).closest('.work_experience_item');
    var index = $item.data('indexwork');

    // Diziden sil
    workExperiences.splice(index, 1);

    // DOM'dan sil
    $item.remove();

    // index'leri yeniden güncelle (DOM ile senkronizasyon için)
    $('.work_experience_item').each(function (i) {
      $(this).attr('data-index', i);
    });

    console.log("Güncel workExperiences:", workExperiences);
  });


  // Tüm eğitimleri burada tutacağız
  var educations = [];

  $("#add-education").click(function () {
    // Input değerlerini al
    var eduname = $('#educationName').val().trim();
    var edulevel = $('#educationLevel').val().trim();
    var edudate = $('#educationDate').val().trim();

    // Boş alan kontrolü
    if (!eduname || !edulevel || !edudate) {
      alert("Lütfen tüm eğitim bilgilerini girin.");
      return;
    }

    // Yeni eğitim nesnesi oluştur
    var education = {
      name: eduname,
      level: edulevel,
      date: edudate
    };

    // Dizimize ekle
    educations.push(education);

    var indexedu = educations.length - 1;

    // Console'a Tüm Listeyi Yazdır
    console.log("Tüm eğitimler:", educations);

    // Ekrana da göstermek istersen:
    $(".education_list").append(`
    <div class="education_item" data-index="${indexedu}">
    <div class="cart p-4 m-0 border-0 bd-example m-0 border-0">
    <div class="cart_body">
      <p><strong>${education.name}</strong> <br> ${education.level} <br>(${education.date})</p>
       <img src="assets/images/delete_item.png" alt="delete item" class="img-fluid" />
    </div>
    </div>
    </div>
  `);

    // Input'ları temizle
    $('#educationName').val('');
    $('#educationLevel').val('');
    $('#educationDate').val('');
  });

  $(document).on('click', '.education_list img', function () {
    var $item = $(this).closest('.education_item');
    var index = $item.data('indexedu');

    // Diziden sil
    educations.splice(index, 1);

    // DOM'dan sil
    $item.remove();

    // index'leri yeniden güncelle (DOM ile senkronizasyon için)
    $('.education_item').each(function (i) {
      $(this).attr('data-index', i);
    });

    console.log("Güncel educations:", educations);
  });

  $("#add-qualifications").click(function () {
    // Input değerlerini al
    var qualificationsName = $('#qualificationsName').val().trim();
    var qualificationsCompany = $('#qualificationsCompany').val().trim();
    var qualificationsDate = $('#qualificationsDate').val().trim();

    // Boş alan kontrolü
    if (!qualificationsName || !qualificationsCompany || !qualificationsDate) {
      alert("Lütfen tüm nitelik bilgilerini girin.");
      return;
    }

    // Yeni nitelik nesnesi oluştur
    var qualification = {
      name: qualificationsName,
      company: qualificationsCompany,
      date: qualificationsDate
    };

    qualifications.push(qualification);
    var indexqual = qualifications.length - 1;

    // Console'a Tüm Listeyi Yazdır
    console.log("Tüm nitelikler:", qualifications);

    // Ekrana da göstermek istersen:
    $(".qualifications_list").append(`
    <div class="qualification_item" data-index="${indexqual}">
    <div class="cart p-4 m-0 border-0 bd-example m-0 border-0">
    <div class="cart_body">
      <p><strong>${qualification.name}</strong>  <br>${qualification.company} <br>(${qualification.date})</p>
      <img src="assets/images/delete_item.png" alt="delete item" class="img-fluid" />
      </div>
    </div>
    </div>
  `);

    // Input'ları temizle
    $('#qualificationsName').val('');
    $('#qualificationsCompany').val('');
    $('#qualificationsDate').val('');
  })

   $(document).on('click', '.qualifications_list img', function () {
    var $item = $(this).closest('.qualification_item');
    var index = $item.data('indexqual');

    // Diziden sil
    qualifications.splice(index, 1);

    // DOM'dan sil
    $item.remove();

    // index'leri yeniden güncelle (DOM ile senkronizasyon için)
    $('.qualification_item').each(function (i) {
      $(this).attr('data-index', i);
    });

    console.log("Güncel qualifications:", qualifications);
  });




});


// jQuery Validation için Türkçe mesajlar
$(function () {
  $.extend($.validator.messages, {
    required: "Bu alanın doldurulması zorunludur.",
    email: "Lütfen geçerli bir e-posta adresi giriniz.",
    url: "Lütfen geçerli bir URL giriniz.",
    digits: "Lütfen sadece rakam giriniz.",
    minlength: $.validator.format("Lütfen en az {0} karakter giriniz."),
    maxlength: $.validator.format("Lütfen en fazla {0} karakter giriniz."),
  });
})