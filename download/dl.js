/* FlashForge × TigerSystem — download page logic.
   The release files carry their version in their name (as FlashForge ships
   them), so there is no fixed "latest" URL per model: ask GitHub which release
   is latest, pick THIS model's file by prefix, show its version / date / size /
   SHA-256, and point the Download button at it (never auto-started). Offline or rate-limited → the button falls
   back to the release page. */
(function () {
  var REPO = 'TigerTag-Project/FlashForge-TigerTag-Creator5-Firmware-Lan-and-Cloud';
  var RELEASES = 'https://github.com/' + REPO + '/releases/latest';
  var root = document.documentElement;
  var model = root.getAttribute('data-model');          // "Creator5" | "Creator5Pro" | "" (home)
  var $ = function (id) { return document.getElementById(id); };

  function fmtSize(b) { return b ? (b / 1048576).toFixed(1) + ' MB' : ''; }
  function fmtDate(iso) {
    try { return new Date(iso).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); }
    catch (e) { return ''; }
  }
  function label(tag) {
    var m = /(\d+\.\d+\.\d+-\d+\.\d+\.\d+)/.exec(tag || '');
    return m ? m[1] : String(tag || '').replace(/^v/, '');
  }
  function sha(asset, body) {
    if (asset.digest && /^sha256:/.test(asset.digest)) return asset.digest.slice(7);
    var re = new RegExp('([0-9a-f]{64})\\s+' + asset.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    var m = re.exec(body || '');
    return m ? m[1] : '';
  }
  function setText(id, v) { var el = $(id); if (el) el.textContent = v; }

  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (rel) {
      // Home page: only the version chip.
      setText('ver', label(rel.tag_name));
      setText('date', fmtDate(rel.published_at));
      if (!model) return;

      var a = (rel.assets || []).filter(function (x) {
        return x.name.indexOf(model + '-') === 0 && /\.tgz$/i.test(x.name);   // the dash keeps the two apart
      })[0];
      if (!a) throw new Error('no asset');

      setText('size', fmtSize(a.size));
      setText('file', a.name);
      var h = sha(a, rel.body);
      if (h) { setText('sha', h); $('shaBox').hidden = false; }

      var btn = $('dl');
      btn.href = a.browser_download_url;
      btn.removeAttribute('aria-disabled');

      // Never started on its own: the visitor clicks when ready.
      var st = $('status');
      st.textContent = 'Ready — ' + a.name;
      st.className = 'status status--ok';
    })
    .catch(function () {
      var btn = $('dl');
      if (btn) btn.href = RELEASES;
      setText('status', 'Could not reach GitHub just now — the button opens the release page instead.');
    });

  var copy = $('copy');
  if (copy) copy.addEventListener('click', function () {
    var v = $('sha').textContent;
    (navigator.clipboard ? navigator.clipboard.writeText(v) : Promise.reject()).then(function () {
      copy.textContent = 'Copied'; setTimeout(function () { copy.textContent = 'Copy'; }, 1400);
    }, function () {});
  });
})();
