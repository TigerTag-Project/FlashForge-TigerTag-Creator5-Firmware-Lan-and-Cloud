/* FlashForge × TigerSystem — download pages, translations.
   Same 11 locales as Tiger Studio Manager. The HTML ships in English (search
   engines, no-JS); this file swaps every [data-i18n] node to the visitor's
   language — browser language first, then their pick, remembered locally.
   Values may hold simple trusted markup (<b>, <a>): they are ours, not input.
   {model} / {other} / {file} are filled from the page. */
(function () {
  var LANGS = {
    'en': 'English', 'fr': 'Français', 'de': 'Deutsch', 'es': 'Español', 'it': 'Italiano',
    'zh': '中文', 'pt': 'Português (BR)', 'pt-pt': 'Português (PT)', 'pl': 'Polski', 'ru': 'Русский', 'nl': 'Nederlands'
  };
  var VIDEO = 'https://www.youtube.com/watch?v=qaaGUUdZaHQ';
  var S = {
    en: {
      'nav.install': 'Install',
      'hero.title': 'Cloud + LAN firmware',
      'hero.lede': 'The official FlashForge × TigerSystem firmware for the {model}: keep FlashForge Cloud, and reach the printer on your network at the same time.',
      'chip.version': 'Version', 'chip.official': '✓ Official FlashForge build',
      'btn.download': 'Download for {model}',
      'status.finding': 'Finding the latest version…', 'status.ready': 'Ready — {file}',
      'status.offline': 'Could not reach GitHub just now — the button opens the release page instead.',
      'sha.summary': 'Verify the file — SHA-256', 'sha.copy': 'Copy', 'sha.copied': 'Copied', 'sha.file': 'File:',
      'warn.title': "Don't accept the printer's own online update.",
      'warn.body': "When the printer offers an update on its screen (or under Tools → Firmware), it installs FlashForge's <b>standard</b> firmware — and Cloud + LAN is gone. Tap <b>&lt;</b> to skip it and update from here instead. Already accepted one? Just reinstall this file by USB.",
      'install.title': 'Install in six steps',
      'install.sub': 'FlashForge\'s standard USB update — shown in their official video <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Format a USB drive', 's1.d': 'FAT32 (FAT / FAT16 also work), MBR partition table.',
      's2.t': 'Copy the file to the root', 's2.d': "Not in a folder. Don't rename or unpack it — the printer opens it itself. One firmware file only.",
      's3.t': 'Switch the printer off', 's3.d': 'Before plugging anything in.',
      's4.t': 'Plug the drive in', 's4.d': "Into the printer's USB port.",
      's5.t': 'Switch it on', 's5.d': "It finds the file and installs it. Don't cut the power while it works.",
      's6.t': 'Remove the drive', 's6.d': 'Once the printer has restarted on the new version. Done.',
      'chg.title': 'What it changes', 'chg.sub': 'Out of the box, a Creator 5 makes you choose between Cloud and LAN. Not any more.',
      'chg.stock': 'Stock', 'chg.r1': 'FlashForge Cloud — app, remote access', 'chg.r2': 'LAN — local tools on your network',
      'chg.r3': '<b>Both at the same time</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect and TigerSpool with Cloud on',
      'ts.title': 'RFID for a printer that has no reader',
      'ts.quote': "The spool's identity belongs to its owner — not to a printer brand.",
      'ts.body': "TigerSystem is the open ecosystem for 3D-printing filament. A TigerTag NFC chip carries each spool's full profile in an open format any device can read. With this firmware, your Creator 5 joins it: Tiger Studio, Tiger NFC Connect and TigerSpool read the chip of any TigerTag brand — or one you made at home — and put the filament in the right slot.",
      'ts.cta': 'Discover TigerSystem →', 'ts.why': 'Why we built it',
      'eco.title': 'The ecosystem — everything is open', 'eco.sub': 'Every piece is published, readable and free to build on.',
      'eco.studio': 'Desktop app — inventory, racks, live printers across six brands.',
      'eco.nfc': 'iOS and Android — tap to read, tap to write.',
      'eco.spool': 'Reader box beside the printer — scan a spool, it lands in the right slot.',
      'eco.proto.b': 'TigerTag protocol', 'eco.proto': 'The open chip format — full spec and public registry.',
      'eco.scale': 'Connected filament scale with dual NFC readers.',
      'eco.docs': 'The source of truth — for humans and AI.',
      'thanks': "<strong>Thank you, FlashForge.</strong> This is an official FlashForge firmware, developed by their engineering team at TigerTag's request and in close collaboration with us, and published here with their agreement. Opening a printer to an ecosystem that is not your own is a rare decision — every maker who owns one benefits from it.",
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistributed with their permission. Part of <a href="https://tigersystem.io">TigerSystem</a> by <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'All releases',
      'home.title': 'Cloud + LAN firmware for the Creator 5',
      'home.lede': 'The official FlashForge × TigerSystem firmware — FlashForge Cloud and your local network, both on at once.',
      'home.latest': 'Latest version', 'home.download': 'Download'
    },
    fr: {
      'nav.install': 'Installation',
      'hero.title': 'Firmware Cloud + LAN',
      'hero.lede': "Le firmware officiel FlashForge × TigerSystem pour la {model} : gardez FlashForge Cloud et accédez à l'imprimante sur votre réseau, en même temps.",
      'chip.version': 'Version', 'chip.official': '✓ Build officiel FlashForge',
      'btn.download': 'Télécharger pour la {model}',
      'status.finding': 'Recherche de la dernière version…', 'status.ready': 'Prêt — {file}',
      'status.offline': "GitHub ne répond pas pour l'instant — le bouton ouvre la page de la version à la place.",
      'sha.summary': 'Vérifier le fichier — SHA-256', 'sha.copy': 'Copier', 'sha.copied': 'Copié', 'sha.file': 'Fichier :',
      'warn.title': "N'acceptez pas la mise à jour en ligne proposée par l'imprimante.",
      'warn.body': "Quand l'imprimante propose une mise à jour à l'écran (ou dans Outils → Firmware), elle installe le firmware <b>standard</b> de FlashForge — et le Cloud + LAN disparaît. Touchez <b>&lt;</b> pour l'ignorer et mettez à jour depuis cette page. Vous l'avez déjà acceptée ? Réinstallez simplement ce fichier par clé USB.",
      'install.title': 'Installation en six étapes',
      'install.sub': 'La mise à jour USB standard de FlashForge — montrée dans leur vidéo officielle <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Formatez une clé USB', 's1.d': 'En FAT32 (FAT / FAT16 fonctionnent aussi), table de partition MBR.',
      's2.t': 'Copiez le fichier à la racine', 's2.d': "Pas dans un dossier. Ne le renommez pas, ne le décompressez pas — l'imprimante l'ouvre elle-même. Un seul fichier de firmware.",
      's3.t': "Éteignez l'imprimante", 's3.d': 'Avant de brancher quoi que ce soit.',
      's4.t': 'Branchez la clé', 's4.d': "Sur le port USB de l'imprimante.",
      's5.t': 'Rallumez-la', 's5.d': "Elle trouve le fichier et l'installe. Ne coupez pas le courant pendant l'opération.",
      's6.t': 'Retirez la clé', 's6.d': "Une fois l'imprimante redémarrée sur la nouvelle version. C'est fait.",
      'chg.title': 'Ce que ça change', 'chg.sub': "D'origine, une Creator 5 vous fait choisir entre Cloud et LAN. Plus maintenant.",
      'chg.stock': "D'origine", 'chg.r1': 'FlashForge Cloud — appli, accès à distance', 'chg.r2': 'LAN — outils locaux sur votre réseau',
      'chg.r3': '<b>Les deux en même temps</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect et TigerSpool avec le Cloud activé',
      'ts.title': "La RFID pour une imprimante qui n'a pas de lecteur",
      'ts.quote': "L'identité d'une bobine appartient à son propriétaire — pas à une marque d'imprimante.",
      'ts.body': "TigerSystem est l'écosystème ouvert du filament d'impression 3D. Une puce NFC TigerTag porte le profil complet de chaque bobine dans un format ouvert que tout appareil peut lire. Avec ce firmware, votre Creator 5 le rejoint : Tiger Studio, Tiger NFC Connect et TigerSpool lisent la puce de toute marque TigerTag — ou celle que vous avez créée chez vous — et placent le filament dans le bon emplacement.",
      'ts.cta': 'Découvrir TigerSystem →', 'ts.why': "Pourquoi nous l'avons créé",
      'eco.title': "L'écosystème — tout est ouvert", 'eco.sub': 'Chaque brique est publiée, lisible et libre de réutilisation.',
      'eco.studio': 'Appli de bureau — inventaire, racks, imprimantes en direct sur six marques.',
      'eco.nfc': 'iOS et Android — approchez pour lire, approchez pour écrire.',
      'eco.spool': "Boîtier lecteur à côté de l'imprimante — scannez une bobine, elle arrive dans le bon emplacement.",
      'eco.proto.b': 'Protocole TigerTag', 'eco.proto': 'Le format de puce ouvert — spécification complète et registre public.',
      'eco.scale': 'Balance à filament connectée avec deux lecteurs NFC.',
      'eco.docs': 'La source de vérité — pour les humains et les IA.',
      'thanks': "<strong>Merci, FlashForge.</strong> Ce firmware officiel FlashForge a été développé par leur équipe d'ingénieurs à la demande de TigerTag et en étroite collaboration avec nous, et il est publié ici avec leur accord. Ouvrir une imprimante à un écosystème qui n'est pas le sien est une décision rare — chaque maker qui en possède une en profite.",
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistribué avec son autorisation. Fait partie de <a href="https://tigersystem.io">TigerSystem</a> par <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Toutes les versions',
      'home.title': 'Firmware Cloud + LAN pour la Creator 5',
      'home.lede': 'Le firmware officiel FlashForge × TigerSystem — FlashForge Cloud et votre réseau local, les deux à la fois.',
      'home.latest': 'Dernière version', 'home.download': 'Télécharger'
    },
    de: {
      'nav.install': 'Installation',
      'hero.title': 'Cloud-+-LAN-Firmware',
      'hero.lede': 'Die offizielle FlashForge × TigerSystem-Firmware für den {model}: FlashForge Cloud behalten und den Drucker gleichzeitig in deinem Netzwerk erreichen.',
      'chip.version': 'Version', 'chip.official': '✓ Offizieller FlashForge-Build',
      'btn.download': 'Download für {model}',
      'status.finding': 'Neueste Version wird gesucht…', 'status.ready': 'Bereit — {file}',
      'status.offline': 'GitHub ist gerade nicht erreichbar — der Button öffnet stattdessen die Release-Seite.',
      'sha.summary': 'Datei prüfen — SHA-256', 'sha.copy': 'Kopieren', 'sha.copied': 'Kopiert', 'sha.file': 'Datei:',
      'warn.title': 'Akzeptiere nicht das Online-Update des Druckers.',
      'warn.body': 'Wenn der Drucker auf seinem Bildschirm (oder unter Werkzeuge → Firmware) ein Update anbietet, installiert er die <b>Standard</b>-Firmware von FlashForge — und Cloud + LAN ist weg. Tippe auf <b>&lt;</b>, um es zu überspringen, und aktualisiere stattdessen hier. Schon akzeptiert? Installiere diese Datei einfach erneut per USB.',
      'install.title': 'Installation in sechs Schritten',
      'install.sub': 'Das Standard-USB-Update von FlashForge — gezeigt in ihrem offiziellen Video <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'USB-Stick formatieren', 's1.d': 'FAT32 (FAT / FAT16 gehen auch), MBR-Partitionstabelle.',
      's2.t': 'Datei ins Stammverzeichnis kopieren', 's2.d': 'Nicht in einen Ordner. Nicht umbenennen oder entpacken — der Drucker öffnet sie selbst. Nur eine Firmware-Datei.',
      's3.t': 'Drucker ausschalten', 's3.d': 'Bevor du etwas einsteckst.',
      's4.t': 'Stick einstecken', 's4.d': 'In den USB-Anschluss des Druckers.',
      's5.t': 'Einschalten', 's5.d': 'Er findet die Datei und installiert sie. Während des Vorgangs nicht den Strom trennen.',
      's6.t': 'Stick entfernen', 's6.d': 'Sobald der Drucker mit der neuen Version neu gestartet ist. Fertig.',
      'chg.title': 'Was sich ändert', 'chg.sub': 'Ab Werk musst du beim Creator 5 zwischen Cloud und LAN wählen. Jetzt nicht mehr.',
      'chg.stock': 'Ab Werk', 'chg.r1': 'FlashForge Cloud — App, Fernzugriff', 'chg.r2': 'LAN — lokale Tools in deinem Netzwerk',
      'chg.r3': '<b>Beides gleichzeitig</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect und TigerSpool bei aktiver Cloud',
      'ts.title': 'RFID für einen Drucker ohne Lesegerät',
      'ts.quote': 'Die Identität einer Spule gehört ihrem Besitzer — nicht einer Druckermarke.',
      'ts.body': 'TigerSystem ist das offene Ökosystem für 3D-Druck-Filament. Ein TigerTag-NFC-Chip trägt das vollständige Profil jeder Spule in einem offenen Format, das jedes Gerät lesen kann. Mit dieser Firmware wird dein Creator 5 Teil davon: Tiger Studio, Tiger NFC Connect und TigerSpool lesen den Chip jeder TigerTag-Marke — oder einen, den du selbst gemacht hast — und legen das Filament in den richtigen Slot.',
      'ts.cta': 'TigerSystem entdecken →', 'ts.why': 'Warum wir es gebaut haben',
      'eco.title': 'Das Ökosystem — alles ist offen', 'eco.sub': 'Jeder Baustein ist veröffentlicht, lesbar und frei nutzbar.',
      'eco.studio': 'Desktop-App — Bestand, Regale, Live-Drucker von sechs Marken.',
      'eco.nfc': 'iOS und Android — antippen zum Lesen, antippen zum Schreiben.',
      'eco.spool': 'Lesebox neben dem Drucker — Spule scannen, sie landet im richtigen Slot.',
      'eco.proto.b': 'TigerTag-Protokoll', 'eco.proto': 'Das offene Chip-Format — vollständige Spezifikation und öffentliches Register.',
      'eco.scale': 'Vernetzte Filamentwaage mit zwei NFC-Lesern.',
      'eco.docs': 'Die maßgebliche Quelle — für Menschen und KI.',
      'thanks': '<strong>Danke, FlashForge.</strong> Dies ist eine offizielle FlashForge-Firmware, entwickelt von ihrem Engineering-Team auf Anfrage von TigerTag und in enger Zusammenarbeit mit uns, und hier mit ihrer Zustimmung veröffentlicht. Einen Drucker für ein fremdes Ökosystem zu öffnen, ist eine seltene Entscheidung — jeder Maker, der einen besitzt, profitiert davon.',
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, mit Genehmigung weitergegeben. Teil von <a href="https://tigersystem.io">TigerSystem</a> von <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Alle Releases',
      'home.title': 'Cloud-+-LAN-Firmware für den Creator 5',
      'home.lede': 'Die offizielle FlashForge × TigerSystem-Firmware — FlashForge Cloud und dein lokales Netzwerk, beides gleichzeitig.',
      'home.latest': 'Neueste Version', 'home.download': 'Download'
    },
    es: {
      'nav.install': 'Instalación',
      'hero.title': 'Firmware Cloud + LAN',
      'hero.lede': 'El firmware oficial FlashForge × TigerSystem para la {model}: conserva FlashForge Cloud y accede a la impresora en tu red al mismo tiempo.',
      'chip.version': 'Versión', 'chip.official': '✓ Compilación oficial de FlashForge',
      'btn.download': 'Descargar para {model}',
      'status.finding': 'Buscando la última versión…', 'status.ready': 'Listo — {file}',
      'status.offline': 'No se puede contactar con GitHub ahora — el botón abre la página de la versión.',
      'sha.summary': 'Verificar el archivo — SHA-256', 'sha.copy': 'Copiar', 'sha.copied': 'Copiado', 'sha.file': 'Archivo:',
      'warn.title': 'No aceptes la actualización en línea de la impresora.',
      'warn.body': 'Cuando la impresora ofrece una actualización en su pantalla (o en Herramientas → Firmware), instala el firmware <b>estándar</b> de FlashForge — y Cloud + LAN desaparece. Toca <b>&lt;</b> para omitirla y actualiza desde aquí. ¿Ya la aceptaste? Vuelve a instalar este archivo por USB.',
      'install.title': 'Instalación en seis pasos',
      'install.sub': 'La actualización USB estándar de FlashForge — mostrada en su vídeo oficial <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Formatea un USB', 's1.d': 'FAT32 (FAT / FAT16 también sirven), tabla de particiones MBR.',
      's2.t': 'Copia el archivo en la raíz', 's2.d': 'No en una carpeta. No lo renombres ni lo descomprimas — la impresora lo abre sola. Un solo archivo de firmware.',
      's3.t': 'Apaga la impresora', 's3.d': 'Antes de conectar nada.',
      's4.t': 'Conecta el USB', 's4.d': 'En el puerto USB de la impresora.',
      's5.t': 'Enciéndela', 's5.d': 'Encuentra el archivo y lo instala. No cortes la corriente mientras trabaja.',
      's6.t': 'Retira el USB', 's6.d': 'Cuando la impresora se haya reiniciado con la nueva versión. Listo.',
      'chg.title': 'Qué cambia', 'chg.sub': 'De fábrica, la Creator 5 te obliga a elegir entre Cloud y LAN. Ya no.',
      'chg.stock': 'De fábrica', 'chg.r1': 'FlashForge Cloud — app, acceso remoto', 'chg.r2': 'LAN — herramientas locales en tu red',
      'chg.r3': '<b>Ambos a la vez</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect y TigerSpool con Cloud activado',
      'ts.title': 'RFID para una impresora sin lector',
      'ts.quote': 'La identidad de una bobina pertenece a su dueño, no a una marca de impresoras.',
      'ts.body': 'TigerSystem es el ecosistema abierto del filamento de impresión 3D. Un chip NFC TigerTag lleva el perfil completo de cada bobina en un formato abierto que cualquier dispositivo puede leer. Con este firmware, tu Creator 5 se une a él: Tiger Studio, Tiger NFC Connect y TigerSpool leen el chip de cualquier marca TigerTag — o uno hecho en casa — y colocan el filamento en la ranura correcta.',
      'ts.cta': 'Descubre TigerSystem →', 'ts.why': 'Por qué lo creamos',
      'eco.title': 'El ecosistema — todo es abierto', 'eco.sub': 'Cada pieza está publicada, es legible y libre para construir encima.',
      'eco.studio': 'App de escritorio — inventario, estanterías, impresoras en vivo de seis marcas.',
      'eco.nfc': 'iOS y Android — acerca para leer, acerca para escribir.',
      'eco.spool': 'Caja lectora junto a la impresora — escanea una bobina y va a la ranura correcta.',
      'eco.proto.b': 'Protocolo TigerTag', 'eco.proto': 'El formato de chip abierto — especificación completa y registro público.',
      'eco.scale': 'Báscula de filamento conectada con dos lectores NFC.',
      'eco.docs': 'La fuente de verdad — para personas e IA.',
      'thanks': '<strong>Gracias, FlashForge.</strong> Este es un firmware oficial de FlashForge, desarrollado por su equipo de ingeniería a petición de TigerTag y en estrecha colaboración con nosotros, y publicado aquí con su autorización. Abrir una impresora a un ecosistema que no es el tuyo es una decisión poco común — todo maker que tenga una se beneficia.',
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistribuido con su permiso. Parte de <a href="https://tigersystem.io">TigerSystem</a> por <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Todas las versiones',
      'home.title': 'Firmware Cloud + LAN para la Creator 5',
      'home.lede': 'El firmware oficial FlashForge × TigerSystem — FlashForge Cloud y tu red local, los dos a la vez.',
      'home.latest': 'Última versión', 'home.download': 'Descargar'
    },
    it: {
      'nav.install': 'Installazione',
      'hero.title': 'Firmware Cloud + LAN',
      'hero.lede': 'Il firmware ufficiale FlashForge × TigerSystem per la {model}: mantieni FlashForge Cloud e raggiungi la stampante sulla tua rete, allo stesso tempo.',
      'chip.version': 'Versione', 'chip.official': '✓ Build ufficiale FlashForge',
      'btn.download': 'Scarica per {model}',
      'status.finding': "Ricerca dell'ultima versione…", 'status.ready': 'Pronto — {file}',
      'status.offline': 'GitHub non risponde al momento — il pulsante apre invece la pagina della release.',
      'sha.summary': 'Verifica il file — SHA-256', 'sha.copy': 'Copia', 'sha.copied': 'Copiato', 'sha.file': 'File:',
      'warn.title': "Non accettare l'aggiornamento online della stampante.",
      'warn.body': "Quando la stampante propone un aggiornamento sullo schermo (o in Strumenti → Firmware), installa il firmware <b>standard</b> di FlashForge — e Cloud + LAN sparisce. Tocca <b>&lt;</b> per saltarlo e aggiorna da qui. L'hai già accettato? Reinstalla questo file via USB.",
      'install.title': 'Installazione in sei passi',
      'install.sub': "L'aggiornamento USB standard di FlashForge — mostrato nel loro video ufficiale <a href=\"" + VIDEO + "\">Upgrade firmware via USB</a>.",
      's1.t': 'Formatta una chiavetta USB', 's1.d': 'FAT32 (anche FAT / FAT16 vanno bene), tabella delle partizioni MBR.',
      's2.t': 'Copia il file nella radice', 's2.d': 'Non in una cartella. Non rinominarlo né scompattarlo — la stampante lo apre da sola. Un solo file firmware.',
      's3.t': 'Spegni la stampante', 's3.d': 'Prima di collegare qualsiasi cosa.',
      's4.t': 'Inserisci la chiavetta', 's4.d': 'Nella porta USB della stampante.',
      's5.t': 'Riaccendila', 's5.d': "Trova il file e lo installa. Non togliere la corrente durante l'operazione.",
      's6.t': 'Rimuovi la chiavetta', 's6.d': 'Quando la stampante si è riavviata con la nuova versione. Fatto.',
      'chg.title': 'Cosa cambia', 'chg.sub': 'Di serie, la Creator 5 ti fa scegliere tra Cloud e LAN. Non più.',
      'chg.stock': 'Di serie', 'chg.r1': 'FlashForge Cloud — app, accesso remoto', 'chg.r2': 'LAN — strumenti locali sulla tua rete',
      'chg.r3': '<b>Entrambi insieme</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect e TigerSpool con il Cloud attivo',
      'ts.title': 'RFID per una stampante senza lettore',
      'ts.quote': "L'identità di una bobina appartiene al suo proprietario, non a un marchio di stampanti.",
      'ts.body': "TigerSystem è l'ecosistema aperto del filamento per la stampa 3D. Un chip NFC TigerTag porta il profilo completo di ogni bobina in un formato aperto che qualsiasi dispositivo può leggere. Con questo firmware la tua Creator 5 ne fa parte: Tiger Studio, Tiger NFC Connect e TigerSpool leggono il chip di qualsiasi marchio TigerTag — o uno fatto in casa — e mettono il filamento nello slot giusto.",
      'ts.cta': 'Scopri TigerSystem →', 'ts.why': "Perché l'abbiamo creato",
      'eco.title': "L'ecosistema — tutto è aperto", 'eco.sub': 'Ogni pezzo è pubblicato, leggibile e libero da riutilizzare.',
      'eco.studio': 'App desktop — inventario, scaffali, stampanti in diretta di sei marchi.',
      'eco.nfc': 'iOS e Android — avvicina per leggere, avvicina per scrivere.',
      'eco.spool': 'Box lettore accanto alla stampante — scansiona una bobina e finisce nello slot giusto.',
      'eco.proto.b': 'Protocollo TigerTag', 'eco.proto': 'Il formato di chip aperto — specifica completa e registro pubblico.',
      'eco.scale': 'Bilancia per filamento connessa con due lettori NFC.',
      'eco.docs': 'La fonte di verità — per persone e IA.',
      'thanks': "<strong>Grazie, FlashForge.</strong> Questo è un firmware ufficiale FlashForge, sviluppato dal loro team di ingegneria su richiesta di TigerTag e in stretta collaborazione con noi, e pubblicato qui con il loro consenso. Aprire una stampante a un ecosistema che non è il proprio è una decisione rara — ogni maker che ne possiede una ne beneficia.",
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, ridistribuito con il loro permesso. Parte di <a href="https://tigersystem.io">TigerSystem</a> di <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Tutte le release',
      'home.title': 'Firmware Cloud + LAN per la Creator 5',
      'home.lede': 'Il firmware ufficiale FlashForge × TigerSystem — FlashForge Cloud e la tua rete locale, entrambi insieme.',
      'home.latest': 'Ultima versione', 'home.download': 'Scarica'
    },
    zh: {
      'nav.install': '安装',
      'hero.title': 'Cloud + LAN 固件',
      'hero.lede': '适用于 {model} 的 FlashForge × TigerSystem 官方固件：保留 FlashForge 云，同时在局域网内访问打印机。',
      'chip.version': '版本', 'chip.official': '✓ FlashForge 官方构建',
      'btn.download': '下载 {model} 固件',
      'status.finding': '正在查找最新版本…', 'status.ready': '已就绪 — {file}',
      'status.offline': '暂时无法连接 GitHub — 按钮将打开发布页面。',
      'sha.summary': '校验文件 — SHA-256', 'sha.copy': '复制', 'sha.copied': '已复制', 'sha.file': '文件：',
      'warn.title': '不要接受打印机自带的在线更新。',
      'warn.body': '当打印机在屏幕上（或在 工具 → 固件 中）提示更新时，它会安装 FlashForge 的<b>标准</b>固件——Cloud + LAN 功能将随之消失。点击 <b>&lt;</b> 跳过，改为从本页更新。已经接受了？用 U 盘重新安装此文件即可。',
      'install.title': '六步完成安装',
      'install.sub': 'FlashForge 标准 U 盘升级方式——见其官方视频 <a href="' + VIDEO + '">Upgrade firmware via USB</a>。',
      's1.t': '格式化 U 盘', 's1.d': 'FAT32（FAT / FAT16 也可），MBR 分区表。',
      's2.t': '将文件复制到根目录', 's2.d': '不要放在文件夹里。不要重命名或解压——打印机会自行读取。只放一个固件文件。',
      's3.t': '关闭打印机', 's3.d': '在插入任何设备之前。',
      's4.t': '插入 U 盘', 's4.d': '插入打印机的 USB 接口。',
      's5.t': '开机', 's5.d': '打印机会找到文件并安装。安装过程中请勿断电。',
      's6.t': '拔出 U 盘', 's6.d': '打印机以新版本重启后即可。完成。',
      'chg.title': '带来的变化', 'chg.sub': '出厂时，Creator 5 只能在 Cloud 和 LAN 之间二选一。现在不用了。',
      'chg.stock': '出厂固件', 'chg.r1': 'FlashForge 云 — 应用、远程访问', 'chg.r2': '局域网 — 网络内的本地工具',
      'chg.r3': '<b>两者同时开启</b>', 'chg.r4': '开启云时使用 Tiger Studio、Tiger NFC Connect 和 TigerSpool',
      'ts.title': '让没有读卡器的打印机用上 RFID',
      'ts.quote': '耗材的身份属于它的主人——而不是某个打印机品牌。',
      'ts.body': 'TigerSystem 是面向 3D 打印耗材的开放生态。TigerTag NFC 芯片以任何设备都能读取的开放格式，记录每卷耗材的完整信息。有了这个固件，你的 Creator 5 也能加入：Tiger Studio、Tiger NFC Connect 和 TigerSpool 可读取任何 TigerTag 品牌的芯片——或你自己制作的芯片——并把耗材放进正确的料槽。',
      'ts.cta': '了解 TigerSystem →', 'ts.why': '我们为什么做它',
      'eco.title': '生态系统——一切开放', 'eco.sub': '每个部分都已公开、可读，并可自由使用。',
      'eco.studio': '桌面应用——库存、料架、六大品牌打印机实时状态。',
      'eco.nfc': 'iOS 与 Android——轻触读取，轻触写入。',
      'eco.spool': '放在打印机旁的读卡盒——扫一下耗材，自动进入正确料槽。',
      'eco.proto.b': 'TigerTag 协议', 'eco.proto': '开放的芯片格式——完整规范与公开注册表。',
      'eco.scale': '配备双 NFC 读卡器的联网耗材秤。',
      'eco.docs': '权威资料来源——供人类与 AI 使用。',
      'thanks': '<strong>感谢 FlashForge。</strong>这是一款 FlashForge 官方固件，由其工程团队应 TigerTag 的请求、与我们密切合作开发，并经其同意在此发布。让打印机向并非自家的生态开放，是一个难得的决定——每一位拥有它的创客都会因此受益。',
      'foot.copy': '固件 © <a href="https://www.flashforge.com">FlashForge</a>，经其许可再分发。<a href="https://tigersystem.io">TigerSystem</a> 的一部分，由 <a href="https://github.com/TigerTag-Project">TigerTag</a> 提供。',
      'foot.releases': '全部版本',
      'home.title': 'Creator 5 的 Cloud + LAN 固件',
      'home.lede': 'FlashForge × TigerSystem 官方固件——FlashForge 云与本地网络同时开启。',
      'home.latest': '最新版本', 'home.download': '下载'
    },
    pt: {
      'nav.install': 'Instalação',
      'hero.title': 'Firmware Cloud + LAN',
      'hero.lede': 'O firmware oficial FlashForge × TigerSystem para a {model}: mantenha o FlashForge Cloud e acesse a impressora na sua rede ao mesmo tempo.',
      'chip.version': 'Versão', 'chip.official': '✓ Build oficial FlashForge',
      'btn.download': 'Baixar para {model}',
      'status.finding': 'Procurando a versão mais recente…', 'status.ready': 'Pronto — {file}',
      'status.offline': 'Não foi possível acessar o GitHub agora — o botão abre a página da versão.',
      'sha.summary': 'Verificar o arquivo — SHA-256', 'sha.copy': 'Copiar', 'sha.copied': 'Copiado', 'sha.file': 'Arquivo:',
      'warn.title': 'Não aceite a atualização online da própria impressora.',
      'warn.body': 'Quando a impressora oferece uma atualização na tela (ou em Ferramentas → Firmware), ela instala o firmware <b>padrão</b> da FlashForge — e o Cloud + LAN some. Toque em <b>&lt;</b> para pular e atualize por aqui. Já aceitou? É só reinstalar este arquivo pelo pendrive.',
      'install.title': 'Instalação em seis passos',
      'install.sub': 'A atualização USB padrão da FlashForge — mostrada no vídeo oficial <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Formate um pendrive', 's1.d': 'FAT32 (FAT / FAT16 também funcionam), tabela de partição MBR.',
      's2.t': 'Copie o arquivo para a raiz', 's2.d': 'Não em uma pasta. Não renomeie nem descompacte — a impressora abre sozinha. Apenas um arquivo de firmware.',
      's3.t': 'Desligue a impressora', 's3.d': 'Antes de conectar qualquer coisa.',
      's4.t': 'Conecte o pendrive', 's4.d': 'Na porta USB da impressora.',
      's5.t': 'Ligue a impressora', 's5.d': 'Ela encontra o arquivo e instala. Não corte a energia durante o processo.',
      's6.t': 'Remova o pendrive', 's6.d': 'Quando a impressora reiniciar com a nova versão. Pronto.',
      'chg.title': 'O que muda', 'chg.sub': 'De fábrica, a Creator 5 obriga você a escolher entre Cloud e LAN. Não mais.',
      'chg.stock': 'De fábrica', 'chg.r1': 'FlashForge Cloud — app, acesso remoto', 'chg.r2': 'LAN — ferramentas locais na sua rede',
      'chg.r3': '<b>Os dois ao mesmo tempo</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect e TigerSpool com o Cloud ativo',
      'ts.title': 'RFID para uma impressora sem leitor',
      'ts.quote': 'A identidade de um carretel pertence ao seu dono — não a uma marca de impressora.',
      'ts.body': 'TigerSystem é o ecossistema aberto do filamento para impressão 3D. Um chip NFC TigerTag guarda o perfil completo de cada carretel em um formato aberto que qualquer dispositivo lê. Com este firmware, sua Creator 5 entra nele: Tiger Studio, Tiger NFC Connect e TigerSpool leem o chip de qualquer marca TigerTag — ou um feito em casa — e colocam o filamento no slot certo.',
      'ts.cta': 'Conheça o TigerSystem →', 'ts.why': 'Por que criamos',
      'eco.title': 'O ecossistema — tudo é aberto', 'eco.sub': 'Cada peça é publicada, legível e livre para usar.',
      'eco.studio': 'App para desktop — estoque, prateleiras, impressoras ao vivo de seis marcas.',
      'eco.nfc': 'iOS e Android — aproxime para ler, aproxime para gravar.',
      'eco.spool': 'Caixa leitora ao lado da impressora — escaneie um carretel e ele vai para o slot certo.',
      'eco.proto.b': 'Protocolo TigerTag', 'eco.proto': 'O formato de chip aberto — especificação completa e registro público.',
      'eco.scale': 'Balança de filamento conectada com dois leitores NFC.',
      'eco.docs': 'A fonte da verdade — para pessoas e IA.',
      'thanks': '<strong>Obrigado, FlashForge.</strong> Este é um firmware oficial da FlashForge, desenvolvido pela equipe de engenharia deles a pedido da TigerTag e em estreita colaboração conosco, e publicado aqui com a autorização deles. Abrir uma impressora para um ecossistema que não é o seu é uma decisão rara — todo maker que tem uma sai ganhando.',
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistribuído com permissão. Parte do <a href="https://tigersystem.io">TigerSystem</a> pela <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Todas as versões',
      'home.title': 'Firmware Cloud + LAN para a Creator 5',
      'home.lede': 'O firmware oficial FlashForge × TigerSystem — FlashForge Cloud e sua rede local, os dois ao mesmo tempo.',
      'home.latest': 'Versão mais recente', 'home.download': 'Baixar'
    },
    'pt-pt': {
      'nav.install': 'Instalação',
      'hero.title': 'Firmware Cloud + LAN',
      'hero.lede': 'O firmware oficial FlashForge × TigerSystem para a {model}: mantenha o FlashForge Cloud e aceda à impressora na sua rede ao mesmo tempo.',
      'chip.version': 'Versão', 'chip.official': '✓ Build oficial FlashForge',
      'btn.download': 'Descarregar para {model}',
      'status.finding': 'A procurar a versão mais recente…', 'status.ready': 'Pronto — {file}',
      'status.offline': 'Não foi possível contactar o GitHub agora — o botão abre a página da versão.',
      'sha.summary': 'Verificar o ficheiro — SHA-256', 'sha.copy': 'Copiar', 'sha.copied': 'Copiado', 'sha.file': 'Ficheiro:',
      'warn.title': 'Não aceite a atualização online da própria impressora.',
      'warn.body': 'Quando a impressora propõe uma atualização no ecrã (ou em Ferramentas → Firmware), instala o firmware <b>padrão</b> da FlashForge — e o Cloud + LAN desaparece. Toque em <b>&lt;</b> para a ignorar e atualize a partir daqui. Já a aceitou? Basta reinstalar este ficheiro por pen USB.',
      'install.title': 'Instalação em seis passos',
      'install.sub': 'A atualização USB padrão da FlashForge — mostrada no vídeo oficial <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Formate uma pen USB', 's1.d': 'FAT32 (FAT / FAT16 também funcionam), tabela de partições MBR.',
      's2.t': 'Copie o ficheiro para a raiz', 's2.d': 'Não numa pasta. Não o renomeie nem descomprima — a impressora abre-o sozinha. Apenas um ficheiro de firmware.',
      's3.t': 'Desligue a impressora', 's3.d': 'Antes de ligar o que quer que seja.',
      's4.t': 'Insira a pen', 's4.d': 'Na porta USB da impressora.',
      's5.t': 'Volte a ligá-la', 's5.d': 'Encontra o ficheiro e instala-o. Não corte a energia durante o processo.',
      's6.t': 'Retire a pen', 's6.d': 'Depois de a impressora reiniciar com a nova versão. Concluído.',
      'chg.title': 'O que muda', 'chg.sub': 'De fábrica, a Creator 5 obriga a escolher entre Cloud e LAN. Já não.',
      'chg.stock': 'De fábrica', 'chg.r1': 'FlashForge Cloud — app, acesso remoto', 'chg.r2': 'LAN — ferramentas locais na sua rede',
      'chg.r3': '<b>Os dois ao mesmo tempo</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect e TigerSpool com o Cloud ativo',
      'ts.title': 'RFID para uma impressora sem leitor',
      'ts.quote': 'A identidade de uma bobine pertence ao seu dono — não a uma marca de impressoras.',
      'ts.body': 'O TigerSystem é o ecossistema aberto do filamento para impressão 3D. Um chip NFC TigerTag guarda o perfil completo de cada bobine num formato aberto que qualquer dispositivo consegue ler. Com este firmware, a sua Creator 5 junta-se a ele: Tiger Studio, Tiger NFC Connect e TigerSpool leem o chip de qualquer marca TigerTag — ou um feito em casa — e colocam o filamento no slot certo.',
      'ts.cta': 'Descubra o TigerSystem →', 'ts.why': 'Porque o criámos',
      'eco.title': 'O ecossistema — tudo é aberto', 'eco.sub': 'Cada peça está publicada, é legível e livre para reutilizar.',
      'eco.studio': 'App de secretária — inventário, prateleiras, impressoras em direto de seis marcas.',
      'eco.nfc': 'iOS e Android — aproxime para ler, aproxime para escrever.',
      'eco.spool': 'Caixa leitora ao lado da impressora — digitalize uma bobine e ela vai para o slot certo.',
      'eco.proto.b': 'Protocolo TigerTag', 'eco.proto': 'O formato de chip aberto — especificação completa e registo público.',
      'eco.scale': 'Balança de filamento ligada com dois leitores NFC.',
      'eco.docs': 'A fonte de verdade — para pessoas e IA.',
      'thanks': '<strong>Obrigado, FlashForge.</strong> Este é um firmware oficial da FlashForge, desenvolvido pela sua equipa de engenharia a pedido da TigerTag e em estreita colaboração connosco, e publicado aqui com o seu acordo. Abrir uma impressora a um ecossistema que não é o seu é uma decisão rara — todos os makers que têm uma beneficiam.',
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, redistribuído com autorização. Parte do <a href="https://tigersystem.io">TigerSystem</a> pela <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Todas as versões',
      'home.title': 'Firmware Cloud + LAN para a Creator 5',
      'home.lede': 'O firmware oficial FlashForge × TigerSystem — FlashForge Cloud e a sua rede local, os dois ao mesmo tempo.',
      'home.latest': 'Versão mais recente', 'home.download': 'Descarregar'
    },
    pl: {
      'nav.install': 'Instalacja',
      'hero.title': 'Firmware Cloud + LAN',
      'hero.lede': 'Oficjalny firmware FlashForge × TigerSystem dla {model}: zachowaj FlashForge Cloud i jednocześnie łącz się z drukarką w swojej sieci.',
      'chip.version': 'Wersja', 'chip.official': '✓ Oficjalna kompilacja FlashForge',
      'btn.download': 'Pobierz dla {model}',
      'status.finding': 'Szukam najnowszej wersji…', 'status.ready': 'Gotowe — {file}',
      'status.offline': 'Nie można teraz połączyć się z GitHubem — przycisk otworzy stronę wydania.',
      'sha.summary': 'Zweryfikuj plik — SHA-256', 'sha.copy': 'Kopiuj', 'sha.copied': 'Skopiowano', 'sha.file': 'Plik:',
      'warn.title': 'Nie akceptuj aktualizacji online proponowanej przez drukarkę.',
      'warn.body': 'Gdy drukarka proponuje aktualizację na ekranie (lub w Narzędzia → Firmware), instaluje <b>standardowy</b> firmware FlashForge — i Cloud + LAN znika. Stuknij <b>&lt;</b>, aby ją pominąć, i aktualizuj stąd. Już zaakceptowana? Po prostu zainstaluj ten plik ponownie z pendrive’a.',
      'install.title': 'Instalacja w sześciu krokach',
      'install.sub': 'Standardowa aktualizacja USB od FlashForge — pokazana w ich oficjalnym filmie <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Sformatuj pendrive', 's1.d': 'FAT32 (FAT / FAT16 też działają), tablica partycji MBR.',
      's2.t': 'Skopiuj plik do katalogu głównego', 's2.d': 'Nie do folderu. Nie zmieniaj nazwy i nie rozpakowuj — drukarka otworzy go sama. Tylko jeden plik firmware.',
      's3.t': 'Wyłącz drukarkę', 's3.d': 'Zanim cokolwiek podłączysz.',
      's4.t': 'Podłącz pendrive', 's4.d': 'Do portu USB drukarki.',
      's5.t': 'Włącz ją', 's5.d': 'Znajdzie plik i go zainstaluje. Nie odłączaj zasilania w trakcie.',
      's6.t': 'Wyjmij pendrive', 's6.d': 'Gdy drukarka uruchomi się ponownie z nową wersją. Gotowe.',
      'chg.title': 'Co się zmienia', 'chg.sub': 'Fabrycznie Creator 5 każe wybierać między Cloud a LAN. Już nie.',
      'chg.stock': 'Fabryczny', 'chg.r1': 'FlashForge Cloud — aplikacja, zdalny dostęp', 'chg.r2': 'LAN — lokalne narzędzia w twojej sieci',
      'chg.r3': '<b>Oba jednocześnie</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect i TigerSpool przy włączonym Cloud',
      'ts.title': 'RFID dla drukarki bez czytnika',
      'ts.quote': 'Tożsamość szpuli należy do jej właściciela — nie do marki drukarki.',
      'ts.body': 'TigerSystem to otwarty ekosystem filamentu do druku 3D. Chip NFC TigerTag przechowuje pełny profil każdej szpuli w otwartym formacie, który odczyta każde urządzenie. Z tym firmware twoja Creator 5 do niego dołącza: Tiger Studio, Tiger NFC Connect i TigerSpool odczytują chip każdej marki TigerTag — albo zrobiony w domu — i umieszczają filament we właściwym slocie.',
      'ts.cta': 'Poznaj TigerSystem →', 'ts.why': 'Dlaczego go stworzyliśmy',
      'eco.title': 'Ekosystem — wszystko jest otwarte', 'eco.sub': 'Każdy element jest opublikowany, czytelny i wolny do użycia.',
      'eco.studio': 'Aplikacja desktopowa — magazyn, regały, drukarki na żywo sześciu marek.',
      'eco.nfc': 'iOS i Android — zbliż, by odczytać, zbliż, by zapisać.',
      'eco.spool': 'Czytnik obok drukarki — zeskanuj szpulę, trafi do właściwego slotu.',
      'eco.proto.b': 'Protokół TigerTag', 'eco.proto': 'Otwarty format chipa — pełna specyfikacja i publiczny rejestr.',
      'eco.scale': 'Podłączona waga do filamentu z dwoma czytnikami NFC.',
      'eco.docs': 'Źródło prawdy — dla ludzi i AI.',
      'thanks': '<strong>Dziękujemy, FlashForge.</strong> To oficjalny firmware FlashForge, opracowany przez ich zespół inżynierów na prośbę TigerTag i w ścisłej współpracy z nami, opublikowany tutaj za ich zgodą. Otwarcie drukarki na ekosystem, który nie jest twój, to rzadka decyzja — korzysta na niej każdy maker, który ją ma.',
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, rozpowszechniany za ich zgodą. Część <a href="https://tigersystem.io">TigerSystem</a> od <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Wszystkie wydania',
      'home.title': 'Firmware Cloud + LAN dla Creator 5',
      'home.lede': 'Oficjalny firmware FlashForge × TigerSystem — FlashForge Cloud i twoja sieć lokalna jednocześnie.',
      'home.latest': 'Najnowsza wersja', 'home.download': 'Pobierz'
    },
    ru: {
      'nav.install': 'Установка',
      'hero.title': 'Прошивка Cloud + LAN',
      'hero.lede': 'Официальная прошивка FlashForge × TigerSystem для {model}: сохраните FlashForge Cloud и одновременно подключайтесь к принтеру по локальной сети.',
      'chip.version': 'Версия', 'chip.official': '✓ Официальная сборка FlashForge',
      'btn.download': 'Скачать для {model}',
      'status.finding': 'Ищем последнюю версию…', 'status.ready': 'Готово — {file}',
      'status.offline': 'GitHub сейчас недоступен — кнопка откроет страницу релиза.',
      'sha.summary': 'Проверить файл — SHA-256', 'sha.copy': 'Копировать', 'sha.copied': 'Скопировано', 'sha.file': 'Файл:',
      'warn.title': 'Не принимайте онлайн-обновление самого принтера.',
      'warn.body': 'Когда принтер предлагает обновление на экране (или в Инструменты → Прошивка), он устанавливает <b>стандартную</b> прошивку FlashForge — и Cloud + LAN пропадает. Нажмите <b>&lt;</b>, чтобы пропустить, и обновляйтесь отсюда. Уже приняли? Просто переустановите этот файл с флешки.',
      'install.title': 'Установка в шесть шагов',
      'install.sub': 'Стандартное обновление FlashForge через USB — показано в их официальном видео <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Отформатируйте флешку', 's1.d': 'FAT32 (FAT / FAT16 тоже подойдут), таблица разделов MBR.',
      's2.t': 'Скопируйте файл в корень', 's2.d': 'Не в папку. Не переименовывайте и не распаковывайте — принтер откроет его сам. Только один файл прошивки.',
      's3.t': 'Выключите принтер', 's3.d': 'Прежде чем что-либо подключать.',
      's4.t': 'Вставьте флешку', 's4.d': 'В USB-порт принтера.',
      's5.t': 'Включите его', 's5.d': 'Он найдёт файл и установит его. Не отключайте питание в процессе.',
      's6.t': 'Извлеките флешку', 's6.d': 'Когда принтер перезагрузится с новой версией. Готово.',
      'chg.title': 'Что меняется', 'chg.sub': 'Из коробки Creator 5 заставляет выбирать между Cloud и LAN. Больше нет.',
      'chg.stock': 'Заводская', 'chg.r1': 'FlashForge Cloud — приложение, удалённый доступ', 'chg.r2': 'LAN — локальные инструменты в вашей сети',
      'chg.r3': '<b>Оба одновременно</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect и TigerSpool при включённом Cloud',
      'ts.title': 'RFID для принтера без считывателя',
      'ts.quote': 'Идентичность катушки принадлежит её владельцу, а не бренду принтера.',
      'ts.body': 'TigerSystem — открытая экосистема для филамента 3D-печати. NFC-чип TigerTag хранит полный профиль каждой катушки в открытом формате, который может прочитать любое устройство. С этой прошивкой ваш Creator 5 присоединяется к ней: Tiger Studio, Tiger NFC Connect и TigerSpool читают чип любой марки TigerTag — или сделанный дома — и помещают филамент в нужный слот.',
      'ts.cta': 'Узнать о TigerSystem →', 'ts.why': 'Зачем мы это сделали',
      'eco.title': 'Экосистема — всё открыто', 'eco.sub': 'Каждая часть опубликована, читаема и свободна для использования.',
      'eco.studio': 'Настольное приложение — склад, стеллажи, принтеры шести брендов в реальном времени.',
      'eco.nfc': 'iOS и Android — поднесите, чтобы прочитать, поднесите, чтобы записать.',
      'eco.spool': 'Считыватель рядом с принтером — отсканируйте катушку, и она попадёт в нужный слот.',
      'eco.proto.b': 'Протокол TigerTag', 'eco.proto': 'Открытый формат чипа — полная спецификация и публичный реестр.',
      'eco.scale': 'Подключённые весы для филамента с двумя NFC-считывателями.',
      'eco.docs': 'Источник истины — для людей и ИИ.',
      'thanks': '<strong>Спасибо, FlashForge.</strong> Это официальная прошивка FlashForge, разработанная их инженерной командой по запросу TigerTag и в тесном сотрудничестве с нами, и опубликованная здесь с их согласия. Открыть принтер для чужой экосистемы — редкое решение, и выигрывает от него каждый мейкер, у которого он есть.',
      'foot.copy': 'Прошивка © <a href="https://www.flashforge.com">FlashForge</a>, распространяется с их разрешения. Часть <a href="https://tigersystem.io">TigerSystem</a> от <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Все релизы',
      'home.title': 'Прошивка Cloud + LAN для Creator 5',
      'home.lede': 'Официальная прошивка FlashForge × TigerSystem — FlashForge Cloud и ваша локальная сеть одновременно.',
      'home.latest': 'Последняя версия', 'home.download': 'Скачать'
    },
    nl: {
      'nav.install': 'Installeren',
      'hero.title': 'Cloud + LAN-firmware',
      'hero.lede': 'De officiële FlashForge × TigerSystem-firmware voor de {model}: houd FlashForge Cloud en bereik de printer tegelijk op je netwerk.',
      'chip.version': 'Versie', 'chip.official': '✓ Officiële FlashForge-build',
      'btn.download': 'Downloaden voor {model}',
      'status.finding': 'Nieuwste versie zoeken…', 'status.ready': 'Klaar — {file}',
      'status.offline': 'GitHub is nu niet bereikbaar — de knop opent in plaats daarvan de releasepagina.',
      'sha.summary': 'Bestand controleren — SHA-256', 'sha.copy': 'Kopiëren', 'sha.copied': 'Gekopieerd', 'sha.file': 'Bestand:',
      'warn.title': 'Accepteer de online-update van de printer zelf niet.',
      'warn.body': 'Als de printer op zijn scherm (of onder Extra → Firmware) een update aanbiedt, installeert hij de <b>standaard</b>firmware van FlashForge — en Cloud + LAN is weg. Tik op <b>&lt;</b> om hem over te slaan en update hier. Al geaccepteerd? Installeer dit bestand gewoon opnieuw via USB.',
      'install.title': 'Installeren in zes stappen',
      'install.sub': 'De standaard USB-update van FlashForge — getoond in hun officiële video <a href="' + VIDEO + '">Upgrade firmware via USB</a>.',
      's1.t': 'Formatteer een USB-stick', 's1.d': 'FAT32 (FAT / FAT16 werken ook), MBR-partitietabel.',
      's2.t': 'Kopieer het bestand naar de hoofdmap', 's2.d': 'Niet in een map. Niet hernoemen of uitpakken — de printer opent het zelf. Slechts één firmwarebestand.',
      's3.t': 'Zet de printer uit', 's3.d': 'Voordat je iets aansluit.',
      's4.t': 'Steek de stick erin', 's4.d': 'In de USB-poort van de printer.',
      's5.t': 'Zet hem aan', 's5.d': 'Hij vindt het bestand en installeert het. Haal de stroom er niet af terwijl hij bezig is.',
      's6.t': 'Verwijder de stick', 's6.d': 'Zodra de printer op de nieuwe versie is herstart. Klaar.',
      'chg.title': 'Wat er verandert', 'chg.sub': 'Standaard laat een Creator 5 je kiezen tussen Cloud en LAN. Nu niet meer.',
      'chg.stock': 'Standaard', 'chg.r1': 'FlashForge Cloud — app, toegang op afstand', 'chg.r2': 'LAN — lokale tools op je netwerk',
      'chg.r3': '<b>Allebei tegelijk</b>', 'chg.r4': 'Tiger Studio, Tiger NFC Connect en TigerSpool met Cloud aan',
      'ts.title': 'RFID voor een printer zonder lezer',
      'ts.quote': 'De identiteit van een spoel is van de eigenaar — niet van een printermerk.',
      'ts.body': 'TigerSystem is het open ecosysteem voor 3D-printfilament. Een TigerTag-NFC-chip draagt het volledige profiel van elke spoel in een open formaat dat elk apparaat kan lezen. Met deze firmware doet je Creator 5 mee: Tiger Studio, Tiger NFC Connect en TigerSpool lezen de chip van elk TigerTag-merk — of een die je thuis maakte — en zetten het filament in het juiste slot.',
      'ts.cta': 'Ontdek TigerSystem →', 'ts.why': 'Waarom we het bouwden',
      'eco.title': 'Het ecosysteem — alles is open', 'eco.sub': 'Elk onderdeel is gepubliceerd, leesbaar en vrij om op voort te bouwen.',
      'eco.studio': 'Desktop-app — voorraad, rekken, live printers van zes merken.',
      'eco.nfc': 'iOS en Android — tik om te lezen, tik om te schrijven.',
      'eco.spool': 'Leesbox naast de printer — scan een spoel en hij belandt in het juiste slot.',
      'eco.proto.b': 'TigerTag-protocol', 'eco.proto': 'Het open chipformaat — volledige specificatie en openbaar register.',
      'eco.scale': 'Verbonden filamentweegschaal met twee NFC-lezers.',
      'eco.docs': 'De bron van waarheid — voor mensen en AI.',
      'thanks': '<strong>Bedankt, FlashForge.</strong> Dit is een officiële FlashForge-firmware, ontwikkeld door hun engineeringteam op verzoek van TigerTag en in nauwe samenwerking met ons, en hier gepubliceerd met hun toestemming. Een printer openstellen voor een ecosysteem dat niet het jouwe is, is een zeldzame beslissing — elke maker die er een heeft, profiteert ervan.',
      'foot.copy': 'Firmware © <a href="https://www.flashforge.com">FlashForge</a>, verspreid met hun toestemming. Onderdeel van <a href="https://tigersystem.io">TigerSystem</a> door <a href="https://github.com/TigerTag-Project">TigerTag</a>.',
      'foot.releases': 'Alle releases',
      'home.title': 'Cloud + LAN-firmware voor de Creator 5',
      'home.lede': 'De officiële FlashForge × TigerSystem-firmware — FlashForge Cloud en je lokale netwerk, allebei tegelijk.',
      'home.latest': 'Nieuwste versie', 'home.download': 'Downloaden'
    }
  };

  var KEY = 'ffgfw.lang';
  function pick() {
    try { var s = localStorage.getItem(KEY); if (s && S[s]) return s; } catch (e) {}
    var list = (navigator.languages || [navigator.language || 'en']).map(function (l) { return String(l).toLowerCase(); });
    for (var i = 0; i < list.length; i++) {
      var l = list[i];
      if (l === 'pt-pt') return 'pt-pt';
      if (S[l]) return l;
      var base = l.split('-')[0];
      if (base === 'pt') return 'pt';
      if (S[base]) return base;
    }
    return 'en';
  }
  var lang = pick();
  var vars = {};

  function fill(str) {
    return String(str).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  }
  function t(key) { return fill((S[lang] && S[lang][key]) || S.en[key] || key); }

  function apply() {
    var root = document.documentElement;
    root.lang = lang === 'pt' ? 'pt-BR' : (lang === 'pt-pt' ? 'pt-PT' : lang);
    vars.model = root.getAttribute('data-name') || '';
    vars.other = root.getAttribute('data-other') || '';
    var nodes = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < nodes.length; i++) nodes[i].innerHTML = t(nodes[i].getAttribute('data-i18n'));
    document.dispatchEvent(new CustomEvent('ffgfw:lang', { detail: lang }));
  }

  window.FFGFW_I18N = {
    t: function (key, extra) { var save = vars; vars = Object.assign({}, vars, extra || {}); var out = t(key); vars = save; return out; },
    lang: function () { return lang; },
    locale: function () { return lang === 'pt' ? 'pt-BR' : (lang === 'pt-pt' ? 'pt-PT' : lang); }
  };

  /* Language menu — a styled list, not the browser's native <select>.
     Keyboard: Enter/Space/↓ open, ↑/↓ move, Enter picks, Esc/Tab close. */
  var TICK = '<svg class="tick" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';
  function setLang(next) {
    lang = next;
    try { localStorage.setItem(KEY, lang); } catch (e) {}
    apply();
  }
  function paintMenu() {
    var lbl = document.getElementById('langLabel');
    if (lbl) lbl.textContent = LANGS[lang];
    var items = document.querySelectorAll('#langList li');
    for (var i = 0; i < items.length; i++) items[i].setAttribute('aria-selected', String(items[i].getAttribute('data-lang') === lang));
  }
  document.addEventListener('ffgfw:lang', paintMenu);

  function wireMenu() {
    var menu = document.getElementById('langMenu'), btn = document.getElementById('langBtn'), list = document.getElementById('langList');
    if (!menu || !btn || !list) return;
    list.innerHTML = Object.keys(LANGS).map(function (k) {
      return '<li role="option" data-lang="' + k + '" aria-selected="false"><span>' + LANGS[k] + '</span><small>' + k + '</small>' + TICK + '</li>';
    }).join('');
    var items = [].slice.call(list.querySelectorAll('li'));
    var focus = -1;
    function mark(i) {
      items.forEach(function (li, n) { li.classList.toggle('is-focus', n === i); });
      focus = i;
      if (items[i]) items[i].scrollIntoView({ block: 'nearest' });
    }
    function open() {
      menu.setAttribute('data-open', ''); btn.setAttribute('aria-expanded', 'true');
      mark(Math.max(0, Object.keys(LANGS).indexOf(lang))); list.focus();
    }
    function close(back) {
      menu.removeAttribute('data-open'); btn.setAttribute('aria-expanded', 'false'); mark(-1);
      if (back) btn.focus();
    }
    btn.addEventListener('click', function () { menu.hasAttribute('data-open') ? close() : open(); });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); open(); }
    });
    list.addEventListener('click', function (e) {
      var li = e.target.closest('li'); if (!li) return;
      setLang(li.getAttribute('data-lang')); close(true);
    });
    list.addEventListener('mousemove', function (e) {
      var li = e.target.closest('li'); if (li) mark(items.indexOf(li));
    });
    list.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); mark(Math.min(items.length - 1, focus + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); mark(Math.max(0, focus - 1)); }
      else if (e.key === 'Home') { e.preventDefault(); mark(0); }
      else if (e.key === 'End') { e.preventDefault(); mark(items.length - 1); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (items[focus]) { setLang(items[focus].getAttribute('data-lang')); close(true); } }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
      else if (e.key === 'Tab') { close(); }
    });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) close(); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    wireMenu();
    apply();
  });
})();
