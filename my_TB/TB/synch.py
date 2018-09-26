from .models import TBProfile, Project

from django.contrib.gis.geos import Point
import random
from pathlib import Path
import requests
from lxml import html
import re
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist

def synch_from_geonet():
    url = r'http://geonet:6448/company/structure.php?set_filter_structure=Y&structure_UF_DEPARTMENT=400&filter=Y&set_filter=Y'
    html_text = requests.get(url).text

    tree = html.fromstring(html_text)

    name = tree.xpath('//div[@class="bx-user-name"]')
    post = tree.xpath('//div[@class="bx-user-post"]')
    image_ = tree.xpath('//div[@class="bx-user-image"]')

    properties = tree.xpath('//div[@class="bx-user-properties"]')

    for (name, post, image_, properties) in zip(name, post, image_, properties):
        post_user = post.text_content().strip()

        image = 'http://geonet:6448/'+re.search(r'src="(.*?)" ', html.tostring(image_, encoding='unicode')).group(1)
        mail = re.search(r'E-Mail: \n(.*?)\t', properties.text_content()).group(1)
        area = re.search(r'Подразделения: \n(.*?)\t', properties.text_content()).group(1)

        username = re.search(r'(.*?) (.*)', name.text_content().strip())
        last_name = username[1]
        first_name= username[2]
        phone = re.search(r'(Телефон: |Мобильный: )\n(.*?)\t', properties.text_content()).group(2).strip()
        phone = re.sub(r' |-| - ',  '', phone)
        if (phone[0] == '+'):
            city_code = phone[3:6]
            phone = phone[7:15]
        else:
            city_code = phone[2:5]
            phone = phone[6:14]
        r = requests.get(image)
        path = settings.MEDIA_ROOT + '/{}'.format(image.split('/')[-1])
        target = Path(path)
        target.write_bytes(r.content)
        prof = TBProfile(username = last_name,
                         post = post_user,
                         subdivisions = area,
                         mail = mail,
                         first_name = first_name,
                         last_name = last_name,
                         city_code = city_code,
                         phone = phone,
                         locaton=random_point())
        prof.image = image.split('/')[-1]
        try:
            TBProfile.objects.get(username = last_name).delete()
            prof.save()
        except ObjectDoesNotExist:
            prof.save()


def synch_from_ORISI():
    url = r'http://192.168.200.10:11111/'
    html_text = requests.get(url).text
    tree = html.fromstring(html_text)

    table_col = tree.xpath('//tr[@class="landing"]')

    for obj in table_col:
        text = html.tostring(obj, encoding='unicode').encode('raw-unicode-escape')
        fields = re.findall(r'<td>(.*?)</td>', text.decode('utf-8'))
        if (len(fields) == 8 and fields[4] != '---' and fields[5] != '---'):
            name = re.search(r'>(.*?)<', fields[0]).group(1).strip()
            repos = fields[4].strip()
            proj = Project(name=name, repos=repos)
            try:
                Project.objects.get(name=name).delete()
                proj.save()
            except ObjectDoesNotExist:
                proj.save()


            develops = fields[5]
            develops = develops.split(',')
            for develop in develops:
                try:
                    username = develop.strip().split(' ')
                    try:
                        prof = TBProfile.objects.get(username=username[0])
                    except:
                        prof = TBProfile.objects.get(username=username[1])
                    proj.develop.add(prof)
                except:
                    continue

def random_point():
    lat = 39.72
    lon = 47.23

    lat += (random.randint(0, 250) - 125)/1000
    lon += (random.randint(0, 100) - 50)/1000

    return Point(lat, lon)

