

$(document).ready(function () {
  var applications = JSON.parse(localStorage.getItem("applications")) || [];

  if (applications.length > 0) {
    var sonBasvuru = applications[applications.length - 1];
    cv_template(sonBasvuru);
  }



  function cv_template(data) {

    $(".responsive").each(function () {
      var text = $(this).data("res");
      if (data.hasOwnProperty(text)) {
        var res = data[text];
        if (typeof res === "string") {
          // Eğer bu "skills" veya "tools" ise virgülden ayır
          if (text === "skills") {
            $(".skills_list").empty();
            let items = res.split(",").map(e => e.trim());
            items.forEach(function (item) {
              addskills(item);
            });
          }else if (text === "tools") {
            $(".tools_list").empty();
            let items = res.split(",").map(e => e.trim());
            items.forEach(function (item) {
              addtools(item);
            });
          }
          else {
            // Diğer tüm string veriler
            $(this).text(res);
          }
        }


        if (data.workExperiences && Array.isArray(data.workExperiences)) {
          $(".work_experiences").empty();
          data.workExperiences.forEach(function (workExp) {
            addwork(workExp);
            adddescription(workExp);
            // Descriptions ekle
            if (workExp.descriptions && Array.isArray(workExp.descriptions)) {
              
            }
          });
        }""

        // Education List
        if (data.educationList && Array.isArray(data.educationList)) {
          $(".education_list").empty();
          data.educationList.forEach(function (edu) {
            addeducation(edu);
          });
        }

        // Qualifications
        if (data.qualifications && Array.isArray(data.qualifications)) {
          $(".qualifications_list").empty();
          data.qualifications.forEach(function (qual) {
            addqualification(qual);
          });
        }
      }
    });
  }
});



function addwork(value) {

  const task = value.task || "";
  const company = value.company || "";
  const duration = value.duration || "";
  const workItem = `
  <div class="work_experiences_detail">
         <span  class="responsive" data-res="task">${task}</span>
         <span  class="responsive" data-res="company">${company}</span>
         <span  class="responsive" data-res="duration">${duration}</span>
           `;
  $(".work_experiences").append(workItem);

}

function adddescription(value) {
  let destval =``;
  value.descriptions.forEach(function (desc) {
           destval  +=`
           <li class="responsive" data-res="description">${desc}</li>
           `;     
              })


  const descriptionItem = `
  <div class="work_experiences_description">
  <ul>${destval}</ul>
  </div>
  `;
  $(".work_experiences ").append(descriptionItem);
}



function addeducation(value) {
  const educationItem = `
  <div class="education_item">
  <span  class="responsive" data-res="name">${value.name}</span>
  <span  class="responsive" data-res="level">${value.level}</span>
  <span  class="responsive" data-res="date">${value.date}</span>
  </div>
  `;
  $(".education_list").append(educationItem);
}

function addqualification(value) {
  const qualificationItem = `
  <span  class="responsive" data-res="name">${value.name}</span>
  <span  class="responsive" data-res="company">${value.company}</span>
  <span  class="responsive" data-res="date">${value.date}</span>
  `;
  $(".qualifications_list").append(qualificationItem);
}

function addskills(value) {
  const skillsItem = ` <ul><li class="responsive" data-res="skills">${value}</li></ul>
                `;
  $(".skills_list").append(skillsItem);
}

function addtools(value) {
  const toolsItem = ` <ul><li class="responsive" data-res="name">${value}</li></ul>
                `;
                console.log("toolsItem: " + toolsItem);
  $(".tools_list").append(toolsItem);
}


function addleftheader(value) {
  const rightHeaderItem = `
                          <p id="cv_name" class="responsive" data-res="name">Name:</p>
                        <p id="cv_title" class="responsive" data-res="title">Title:</p>
                        <div class="content">
                            <div class="content_email"> <img src="assets/images/icons/Email.png" alt="Email"
                                    class="img">
                                <p id="cv_email" class="responsive" data-res="email">Email:</p>
                            </div>
                            <div class="content_phone"> <img src="assets/images/icons/phone.png" alt="Phone"
                                    class="img">
                                <p id="cv_phone" class="responsive" data-res="phone">Phone:</p>
                            </div>
                            <div class="content_website"> <img src="assets/images/icons/Website.png" alt="Website"
                                    class="img">
                                <p id="cv_website" class="responsive" data-res="website">Website:</p>
                            </div>
                        </div>
  `;
  $(".left_header").append(leftHeaderItem);
}


/*

function cv_template(data) {
  console.log(data);

  // String & basit verileri bastır
  $(".responsive").each(function () {
    var key = $(this).data("res");
    if (data.hasOwnProperty(key)) {
      var value = data[key];

      // skills ve tools string ama virgülle ayrılmış
      if (key === "skills" || key === "tools") {
        let items = value.split(",").map(e => e.trim());
        let container = key === "skills" ? ".skills_list" : ".tools_list";
        $(container).empty(); // Önceki span'ları sil

        items.forEach(item => {
          $(container).append(`<span class="responsive" data-res="${key}">${item}</span>`);
        });
      }

      // Stringse direkt yaz
      else if (typeof value === "string") {
        $(this).text(value);
      }
    }
  });

  // Work Experiences
  if (Array.isArray(data.workExperiences)) {
    $(".work_experiences").empty();

    data.workExperiences.forEach(exp => {
      let workHtml = `
        <div class="work_experience_duration">
          <span class="responsive" data-res="task">${exp.task}</span>
          <span class="responsive" data-res="company">${exp.company}</span>
          <span class="responsive" data-res="duration">${exp.duration}</span>
        </div>
      `;

      // Açıklamalar varsa
      if (Array.isArray(exp.descriptions)) {
        exp.descriptions.forEach(desc => {
          workHtml += `<div><span class="responsive" data-res="description">- ${desc}</span></div>`;
        });
      }

      $(".work_experiences").append(workHtml);
    });
  }

  // Education List
  if (Array.isArray(data.educationList)) {
    $(".education_list").empty();
    data.educationList.forEach(edu => {
      let eduHtml = `
        <div class="education_item">
          <span class="responsive" data-res="name">${edu.name}</span>
          <span class="responsive" data-res="level">${edu.level}</span>
          <span class="responsive" data-res="date">${edu.date}</span>
        </div>
      `;
      $(".education_list").append(eduHtml);
    });
  }

  // Qualifications
  if (Array.isArray(data.qualifications)) {
    $(".qualifications_list").empty();
    data.qualifications.forEach(q => {
      let qHtml = `
        <div class="qualification_item">
          <span class="responsive" data-res="name">${q.name}</span>
          <span class="responsive" data-res="company">${q.company}</span>
          <span class="responsive" data-res="date">${q.date}</span>
        </div>
      `;
      $(".qualifications_list").append(qHtml);
    });
  }
}

});


*/