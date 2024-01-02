---
layout: post
title: "4G Failover on OPNSense"
---

For Christmas this year, santa brought me a few toys - a
[router mini PC](router) to install OPNSense on.

In addition to throwing my home network into a complete shambles for a week, I was also determined
to play around with the 4G failover capability so that in the *unlikely* event my internet falls over
I'll still have some amount of connectivity.

[router]: https://www.aliexpress.com/item/1005006036859811.html

## A valiant first attempt

My first problem was getting the SIM working in the router at all. The machine has two SIM slot, one for 4G and one for 5G, so it was just a case of popping a SIM in right? ... not quite.

Diligently following [the OPNSense wiki](cellular-modem-wiki) will have you try to run `cu` to determine the 4G modem that will be configured. `cu` will connect to a device over serial, and allow you to control it (eg to issue commands to the SIM/modem).

But when I would do so, all I was met with is an un-responsive terminal which I'd have to escape from with `<enter>~.`.

```
> cu -l /dev/cuau0
Connected

*** crickets ***
```

After much digging, I found that my machine has SIM *slots* but does **not** actually have
a modem installed 🤦

[cellular-modem-wiki]: https://docs.opnsense.org/manual/how-tos/cellular.html

## The cellular modem

Right, so first up then is to find a cellular modem. Taking a closer look at the (very light) documentation, I had two options.

- Mini PCIe, which is wired up to the "4G" SIM slot
- M.2, which is wired up to the "5G" SIM slot

I thought I may as well set up a 5G modem - it's 2024, and I have got a strong 5G signal in my apartment so may as well future proof myself!

That was until I discovered that 5G modems are NZ$600+... *maybe we stick with 4G then?*

Next up was figuring out what model of 4G modem would work best for me here in NZ. Most will support specific bands only, meaning you'll want to buy the model that supports at minimum the same LTE bands that your telco supports. Generally, these will fall into different regions like North America, EMEA, APAC etc.

I will be using 2degrees, which are the below, but wikipedia also keeps [a list](lte-bands-wiki) of each network's bands in use.

| Band | Freq. (MHz) |
|------|-------|
| B1   | 2100  |
| B3   | 1800  |
| B8   | 900   |
| B28  | 700   |

I eventually whittled down my options based on the required bands, availability on AliExpress, and price and landed on [the EM7430 chip](EM7430) from Sierra Wireless.

But of course things are never that easy. EM7430 is an M.2 chip, so it'll be wired up the the "5G" SIM as mentioned above. M.2 comes in a variety of sizes and it just so happens that the EM740 has a length of 42mm but my board only supports M.2 chips with a length of 52mm.

So now I need to find an adaptor to "stretch" out the chip to fit. Well, it seems most people going this route don't have a SIM slot hardwired to their board because the vast majority of chips (at least on AliExpress) come with a built-in SIM slot. I could only find one or two which didn't, and these instead had an extension that would knock into the M.2 storage on my board instead.

So I ended up finding a [Mini PCIe to M.2 adaptor](mpcie-m2-adaptor) that would do the trick - meaning I'll end up using the "4G" SIM slot anyway! I just needed to snap off the 52mm M.2 sticking out from the top.

Finally, if I wanted to get signal I'll need a pair of antennas - so I also picked up (a U.FL to RP-SMA cable)[rpsma-ufl] that can screw into holes in the back of the case. Luckily I have got a couple spare RP-SMA antennas from an old Wifi card, so no need to buy those.

[lte-bands-wiki]: https://en.wikipedia.org/wiki/List_of_LTE_networks
[EM7430]: https://www.aliexpress.com/item/32955935199.html
[mpcie-m2-adaptor]: https://www.aliexpress.com/item/1005005974346335.html
[rpsma-ufl]: https://www.aliexpress.com/item/32806195194.html