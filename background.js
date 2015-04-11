/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function(launchData) {
  chrome.app.window.create(
    'index.html',
    {
      id: 'mainWindow',
      bounds: {width: 800, height: 600}
    },
    onWindowCreated
  );
});

var webview;
var appWin;

function onWindowCreated(win) {
  appWin = win;
  
  // Listen for window load
  appWin.contentWindow.onload = function() {
    webview = appWin.contentWindow.document.querySelector('webview');
    
    // Resize the webview when the window resizes
    appWin.onBoundsChanged.addListener(onBoundsChanged);
    
    // Initialize the webview size once on launch
    onBoundsChanged();
    
    /*// Inject callback to sync title
    webview.addEventListener('contentload', function() {
      console.log('contentload!');
      webview.executeScript({
        code: "window.addEventListener('message', function(e) {"
            + "  e.source.postMessage(document.title, '*');"
            + "  setInterval(function() {"
            + "    e.source.postMessage(document.title, e.origin);"
            + "  }, 250);"
            + "});"
      });
      
      webview.contentWindow.postMessage('syncTitle', '*');
    });
    
    // Sync title
    appWin.contentWindow.addEventListener('message', function(e) {
      console.log('got event!');
      appWin.contentWindow.document.title = e.data;
      console.log('title=', e.data);
    });*/
  };
}

function onBoundsChanged() {
  webview.style.height = appWin.innerBounds.height + 'px';
  webview.style.width = appWin.innerBounds.width + 'px';
}
