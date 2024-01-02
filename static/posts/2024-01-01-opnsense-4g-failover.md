---
layout: post
title: "4G Failover on OPNSense"
---

For Christmas this year, santa brought me a few toys - a
[router mini PC](Router) to install OPNSense on.

In addition to throwing my home network into a complete shambles for a week, I was also determined
to play around with the 4G failover capability so that in the *unlikely* event my internet falls over
I'll still have some amount of connectivity.

[Router]: https://www.aliexpress.com/item/1005006036859811.html

## A valiant first attempt

My first problem was getting the SIM working in the router at all. The machine has two SIM slot, one for 4G and one for 5G, so it was just a case of popping a SIM in right? ... not quite.

Diligently following [the OPNSense wiki](Cellular Modem Wiki) will have you try to run `cu` to determine the 4G modem that will be configured. `cu` will connect to a device over serial, and allow you to control it (eg to issue commands to the SIM/modem).

But when I would do so, all I was met with is an un-responsive terminal which I'd have to escape from with `<enter>~.`.

```
> cu -l /dev/cuau0
Connected

*** crickets ***
```

After much digging, I found that my machine has SIM *slots* but does **not** actually have
a modem installed 🤦

[Cellular Modem Wiki]: https://docs.opnsense.org/manual/how-tos/cellular.html

## The cellular modem

Right, so first up then is to find a cellular modem. Taking a closer look at the (very light) documentation, I had two options.

- Mini PCIe, which is wired up to the "4G" SIM slot
- M.2, which is wired up to the "5G" SIM slot

I thought I may as well set up a 5G modem - it's 2024, and I have got a strong 5G signal in my apartment so may as well future proof myself!

That was until I discovered that 5G modems NZ$600+ a pop... *maybe we stick with 4G then?*

