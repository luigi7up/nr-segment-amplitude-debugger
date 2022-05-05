# nr-segment-amplitude-debugger
A simple JS that shows all events being fired by the Tessen library (all Segment analytics.track AND analytics.page events)

# Installation
Although running this code could be done by copying and pasting it into the Chrome console or even by turning it into a plugin, I've decided to use the plugin called Temepermonkey that allows us to run any JS code we decide to load

NOTE: The code will only run in the https://staging-one.newrelic.com/ 

1. Install [Temeprmonkey chrome extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
2. Once installed pin its icon to the browser top bar it so that you can turn it on an off as you like
3. Click on the Tampermonkey icon in the browser and from the menu select Create new script
4. Copy and paste the whole JS code found in the nr-segment-amplitude-debugger.js instead of the code that you see
5. File > Save
6. Navigate to https://staging-one.newrelic.com/ and you should see a small pink reckangle appearing in the right hand side 


