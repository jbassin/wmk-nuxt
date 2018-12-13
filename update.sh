#! /bin/bash

scp -r /home/jbassin/Documents/Personal/wmk-nuxt dijk:~
ssh dijkroot "service waterdeep-nuxt stop";
ssh dijk "rm -rf ~/waterdeep-nuxt";
ssh dijk "mv ~/wmk-nuxt ~/waterdeep-nuxt";
ssh dijk "cd ~/waterdeep-nuxt; yarn run build";
ssh dijkroot "service waterdeep-nuxt start";
