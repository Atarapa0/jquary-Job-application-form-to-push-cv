$(document).ready(function () {
  var applications = JSON.parse(localStorage.getItem("applications")) || [];

  if (applications.length > 0) {
    var sonBasvuru = applications[applications.length - 1];
    cv_template(sonBasvuru);
  }

  function cv_template(data) {
    console.log(data);

    $(".responsive").each(function (item) {
      var text = $(this).data("res");
      if (data.hasOwnProperty(text)) {
        var res = data[text];


    if (typeof res === "string") {
      // Eğer bu "skills" veya "tools" ise virgülden ayır
      if (text === "skills" ) {
        let items = res.split(",").map(e => e.trim());
        items.forEach(function (item) {
          console.log("66 " + text + ": " + item);
        });
      }else if(text === "tools"){
         let items = res.split(",").map(e => e.trim());
        items.forEach(function (item) {
          console.log("77 " + text + ": " + item);
        });
      } 
      else {
        // Diğer tüm string veriler
        console.log("11 " + text + ": " + res);
      }
    }

        //burada arraylaerin ismini alıyoruz
        if (Array.isArray(res)) {
        res.forEach(function (item) {
          if (typeof item === "object") {
            //arraylerin sırasını alıyoruz 1 2 3 array diye
            Object.entries(item).forEach(function ([key, value]) {
              if (Array.isArray(value)) {
                //console.log("22    " + key + ":"); //acıklama arrayını alıyoruz
                value.forEach(function (val) {
                  //aldığımız keylerin içindeki arrayi alıyoruz açıklama yani
                  console.log("33      - " + val);
                });
              } else {
                //arrayın içindeki array olmayanları yazdırıyoruz
                console.log("44    " + key + ": " + value);
              }
            });
          } else {
            console.log("55  - asdas" + item);
          }
        });
      }
      }
    });
  }
});


