#!/usr/bin/env python

import urllib2
from bs4 import BeautifulSoup

# response = urllib2.urlopen('http://www.zdic.net/c/d/79/126506.htm')
# html = response.read()
# with open('foo.html', 'w') as f:
#     f.write(html)

with open('foo.html', 'r') as f:
    html = f.read()
soup = BeautifulSoup(html)
# print soup.prettify()
print soup.title.string
citm = soup.find('span', 'citm')
item = citm.find('strong').string
print item
# tab_page = soup.find(id='cd')
cd = soup.find('div', id='cd')
cjcs = cd.find('div', class_='cjcs')
# print cjcs.prettify()
for p in cjcs.find_all('p'):
    if p.find('span', class_='yxs'):
        num = int(p.find('span', class_='yxs').string.split('.')[0])
        p.find('span', class_='yxs').decompose()
        print num
        for match in p.find_all('a'):
            match.replaceWithChildren()
        for child in p.children:
            if child.string:
                s = child.string
                li = []
                wrapper = soup.new_tag('div', **{'class':'temp'})
                for i, cont in enumerate(s.split(' ')):
                    if i % 2 == 0:
                        li.append(soup.new_string(cont))
                    else:
                        t = soup.new_tag('div', **{'class':'name'})
                        t.string = cont
                        li.append(t)
                for t in li:
                    wrapper.append(t)
                child.replace_with(wrapper)
            else:
                for i, cont in enumerate(child.children):
                    if i % 2 != 0:
                        t = soup.new_tag('div', **{'class':'name'})
                        t.string = cont
                        cont.replace_with(t)
        for match in p.find_all('div', class_='temp'):
            match.replaceWithChildren()
            # if child.string:
            #     s = child.string
            # else:
            #     s = ''.join(child.contents)
            # li = []
            # for i, cont in enumerate(s.split(' ')):
            #     if i % 2 == 0:
            #         li.append(cont)
            #     else:
            #         li.append('<div class="name">'+cont+'</div>')
            # print 'li', li
            # new_child = ''.join(li)
            # print 'new_child', new_child
            # child.string.replace_with(new_child)
        # print str(new_p)
        print str(p)
# print soup.findall('span', {'class':'citm'})

