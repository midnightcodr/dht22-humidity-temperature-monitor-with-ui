## About
This is the complete temperature/humidity monitoring system made with DHT22 and raspberry pi. A simple web UI with streaming capability is also provided.

## Steps
1. For hardware setup, Watch [https://www.youtube.com/watch?v=IHTnU1T8ETk](https://www.youtube.com/watch?v=IHTnU1T8ETk till) till 1'48". You don't need the rest of it.


2. Download [http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz](http://www.airspayce.com/mikem/bcm2835/bcm2835-1.46.tar.gz) from [http://www.airspayce.com/mikem/bcm2835/](http://www.airspayce.com/mikem/bcm2835/), followed by:
```bash
tar xzf bcm2835-1.46.tar.gz
cd bcm2835-1.46
./configure && make && sudo make check && sudo make install
```

3. Clone this project and install node modules
```
https://github.com/midnightcodr/dht22-humidity-temperature-monitor-with-ui
cd dht22-humidity-temperature-monitor-with-ui
npm install
```

4. Run the monitor/web server
```
sudo node index.js
```
sudo privilege is required since the BCM2835 library (step 2) needs access to /open/mem.

