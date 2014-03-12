#!/usr/bin/env python

import time
import codecs
import os

with codecs.open('fetched.txt', 'r', 'utf-8') as f:
    fetched = f.read()

with codecs.open('fetched.txt', 'a', 'utf-8') as f:
    for i in xrange(0x4e00, 0x9fff):
        ch = unichr(i)
        if ch in fetched:
            print ch, 'in fetched list'
            continue
        if os.path.exists('URLs/%s'%ch):
            print ch, 'already fetched'
            f.write(ch)
            continue
        cmd = 'casperjs foo2.js "%s"' % ch
        if isinstance(cmd,unicode):
            cmd = cmd.encode("UTF-8")
        print time.strftime('%Y-%m-%d, %H:%M:%S')
        print ch, i - 0x4e00
        print cmd
        os.system(cmd)
        f.write(ch)
        time.sleep(5)

