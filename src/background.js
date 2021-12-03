/**
 background.js
 KC3改 Background Service Worker.

 https://developer.chrome.com/docs/extensions/mv3/service_workers

 See Manifest File [manifest.json] under "background" > "service_worker"
**/
const window = self;

// FIXME: non-ES module dependencies to be loaded
// no way for now to load classic scripts in service worker
// https://github.com/w3c/ServiceWorker/issues/1356
/*
	"assets/js/global.js",
	"assets/js/jquery.min.js",
	"assets/js/Dexie.min.js",
	"library/objects/Messengers.js",
	"library/objects/Quest.js",
	"library/objects/Screenshot.js",
	"library/managers/ConfigManager.js",
	"library/managers/QuestManager.js",
	"library/modules/ChromeSync.js",
	"library/modules/QuestSync/Background.js",
	"library/modules/QuestSync/Sync.js",
	"library/modules/Database.js",
	"library/modules/Log/Log.js",
	"library/modules/Log/Background.js",
	"library/modules/ImageExport.js",
	"library/modules/Master.js",
	"library/modules/RemodelDb.js",
	"library/modules/Meta.js",
	"library/modules/Translation.js",
	"library/modules/Service.js"
*/

// copy-paste from Service.js
window.KC3Service = {
};

chrome.runtime.onInstalled.addListener(() => {
	console.info("KC3改 Background Service Worker installing...");
});

chrome.runtime.onSuspend.addListener(() => {
	console.info("KC3改 Background Service Worker suspending...");
});

chrome.runtime.onMessage.addListener(function(request, sender, callback){
	// Check if message is intended for this script
	if( (request.identifier || false) == "kc3_service"){
		// Log message contents and sender for debugging
		//console.debug(request.action, { "Request": request, "Sender": sender });
		
		// Check requested action is supported
		if(typeof window.KC3Service[ request.action ] != "undefined"){
			// Execute and pass callback to function
			window.KC3Service[ request.action ](request, sender, callback);
			return true; // dual-async response
		}else{
			// Unknown action
			callback({ success: false });
		}
	
	}
});

console.info("KC3改 Background Service Worker loaded");
