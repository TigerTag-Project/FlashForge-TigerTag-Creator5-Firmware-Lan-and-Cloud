/* One-click download of the LATEST firmware for one model.
   The release files carry their version in their name (as FlashForge ships
   them), so there is no fixed "latest" URL per model: ask GitHub which
   release is latest, pick this model's file by prefix, and hand it over. */
(function () {
  var REPO = 'TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud';
  var model = document.documentElement.getAttribute('data-model');       // "Creator5" | "Creator5Pro"
  var prefix = model + '-';                                               // the dash keeps the two apart
  var fallback = 'https://github.com/' + REPO + '/releases/latest';
  var msg = document.getElementById('msg');
  var link = document.getElementById('manual');
  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (rel) {
      var a = (rel.assets || []).filter(function (x) { return x.name.indexOf(prefix) === 0 && /\.tgz$/i.test(x.name); })[0];
      if (!a) throw new Error('no asset');
      msg.textContent = 'Downloading ' + a.name + ' …';
      link.href = a.browser_download_url;
      link.textContent = a.name;
      window.location.replace(a.browser_download_url);
    })
    .catch(function () {
      msg.textContent = 'Could not reach GitHub — pick your file on the release page:';
      link.href = fallback;
      link.textContent = 'Latest release';
      window.location.replace(fallback);
    });
})();
