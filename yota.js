const ALARM_NAME = 'yota_router_alarm';
const delayInMinutes = 1;
const periodInMinutes = 5;

function update() {
  console.log('update');
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    var json = JSON.parse(xhttp.responseText);
    browser.browserAction.setBadgeText({'text': json['battery_vol_percent'] + '%'});
  };
  xhttp.open('GET', 'http://10.0.0.1/goform/goform_get_cmd_process?cmd=battery_vol_percent', true);
  xhttp.send();
}

browser.alarms.create(ALARM_NAME, {delayInMinutes, periodInMinutes});
browser.alarms.onAlarm.addListener(function(a) {
  console.log('on alarm: ' + a.name);
  if (a.name === ALARM_NAME) {
    update();
  }
});
browser.browserAction.setBadgeBackgroundColor({'color': 'blue'});
browser.browserAction.onClicked.addListener(update);
update();
