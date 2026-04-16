chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  const ruleId = 1; 
  const rule = {
    "id": 1,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
         "extensionPath": "/Shame.html"
      }
    },
    "condition": {
      "urlFilter": "claude.ai",
      "resourceTypes": ["main_frame"]
    }
  };
  const ruleId2 = 2;
  const rule2 = {
    "id": 2,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
         "extensionPath": "/Shame.html"
      }
    },
    "condition": {
      "urlFilter": "gemini.google.com",
      "resourceTypes": ["main_frame"]
    }
  };
  const ruleId3 = 3;
  const rule3 = {
    "id": 3,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
         "extensionPath": "/Shame.html"
      }
    },
    "condition": {
      "urlFilter": "chatgpt.com",
      "resourceTypes": ["main_frame"]
    }
  };
  if (msg.action === 'activateRule') {
    chrome.declarativeNetRequest.updateDynamicRules({ addRules: [rule,rule2,rule3] });
   chrome.tabs.query({ url: "*://*.chatgpt.com/*" }, (tabs) => {
     tabs.forEach(tab => {
    chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("Shame.html") });
  });
});
    chrome.tabs.query({ url: "*://*.claude.ai/*" }, (tabs) => {
     tabs.forEach(tab => {
    chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("Shame.html") });
  });
});
    chrome.tabs.query({ url: "*://*.gemini.google.com/*" }, (tabs) => {
     tabs.forEach(tab => {
    chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("Shame.html") });
  });
});
    setTimeout(() => {
 chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [ruleId,ruleId2,ruleId3] });
}, 3000);
  }
  else if (msg.action === 'deactivateRule') {
    chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: [ruleId,ruleId2,ruleId3] });
  }
});
