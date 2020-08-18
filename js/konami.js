function onKonamiCode(cb) {
    var input = '';
    var key = '38384040373937396665';
    document.addEventListener('keydown', function (e) {
      input += ("" + e.keyCode);
      if (input === key) {
        return cb();
      }
      if (!key.indexOf(input)) return;
      input = ("" + e.keyCode);
    });
  }
  
  onKonamiCode(function () {
    if (PlayState.konamiCodeUsed) {
        console.log("Heeeeyyy, you already used this!");
    } else {
        console.log("Konami code detected!");
            
        PlayState.spawnCoin(PlayState.game.cache.getJSON(`level:${PlayState.level}`).konamiCoin);
        PlayState.sfx.coin.play();
        PlayState.konamiCodeUsed = true;
    }
  })