define(['config_default', 'main'],
  function (cDefault, main) {
    return function () {
      fetch('config.json')
        .then(function (res) {return res.json();})
        .then(function (out) {
          window.config = Object.assign(cDefault, out);
          if ((window.config.firmware || {}).enabled && (window.config.firmware || {}).url) {
            // Load firmware state
            fetch(window.config.firmware.url)
              .then(function (res) {return res.json();})
              .then(function (out) {
              }).catch(function (err) { throw err; })
              .finally(function() {
                main();
              });
          } else {
            main();
          }
        }).catch(function (err) { throw err; });
    };
  });
