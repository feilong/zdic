#!/usr/bin/env python

import os
from mvpa2.suite import *

for folder in os.listdir('URLs'):
    if folder == '.DS_Store':
        os.remove(os.path.join('URLs', '.DS_Store'))
        continue
    # d = {}
    for fname in os.listdir(os.path.join('URLs', folder)):
        # with open(os.path.join('URLs', folder, fname), 'r') as f:
            # url = f.read()
            # d[fname] = url
        os.remove(os.path.join('URLs', folder, fname))
    # h5save('grouped_URLs/%s.hdf5.gz'%folder, d, compression='gzip')
    os.rmdir(os.path.join('URLs', folder))
