#!/usr/bin/env python

import time
import codecs
import os

f = codecs.open('fetched.txt', 'w', 'utf-8')
for i in xrange(0x4e00, 0x9fff):
    ch = unichr(i)
    f.write(ch)
    cmd = 'casperjs foo2.js "%s"' % ch
    if isinstance(cmd,unicode):
        cmd = cmd.encode("UTF-8")
    print cmd
    os.system(cmd)
    time.sleep(5)
f.close()
