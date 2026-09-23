const DOMAINS = [
  { id: 1, domain: "claude.ai" },
  { id: 2, domain: "gemini.google.com" },
  { id: 3, domain: "chatgpt.com" },
  { id: 4, domain: "chat.deepseek.com" },
  { id: 5, domain: "grok.com" }
];

const RULE_IDS = DOMAINS.map(d => d.id);

const rules = DOMAINS.map(({ id, domain }) => ({
  id,
  priority: 1,
  action: {
    type: "redirect",
    redirect: { extensionPath: "/Shame.html" }
  },
  condition: {
    urlFilter: domain,
    resourceTypes: ["main_frame"]
  }
}));

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'activateRule') {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: RULE_IDS,
      addRules: rules
    });
    const tabPatterns = DOMAINS.map(d => `*://*.${d.domain}/*`);
    chrome.tabs.query({ url: tabPatterns }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.update(tab.id, { url: chrome.runtime.getURL("Shame.html") });
      });
    });
  } 
  else if (msg.action === 'deactivateRule') {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: RULE_IDS
    });
  }
});
