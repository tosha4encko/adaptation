from django.http import HttpResponse
from .models import TBProfile

import requests
from lxml import html
import re

def geodom_synch(request):
    synch_from_geonet()
    return HttpResponse("synchronize successful ")


def synch_from_geonet():
    url = r'http://geonet:6448/company/structure.php?set_filter_structure=Y&structure_UF_DEPARTMENT=400&filter=Y&set_filter=Y'
    html_text = requests.get(url).text

    tree = html.fromstring(html_text)

    name = tree.xpath('//div[@class="bx-user-name"]')
    post = tree.xpath('//div[@class="bx-user-post"]')
    image = tree.xpath('//div[@class="bx-user-image"]')

    properties = tree.xpath('//div[@class="bx-user-properties"]')

    for (name, post, image, properties) in zip(name, post, image, properties):
        post_user = post.text_content().strip()
        image = 'http://geonet:6448/'+re.search(r'src="(.*?)" ', html.tostring(image, encoding='unicode')).group(1)
        mail = re.search(r'E-Mail: \n(.*?)\t', properties.text_content()).group(1)
        area = re.search(r'Подразделения: \n(.*?)\t', properties.text_content()).group(1)

        username = re.search(r'(.*?) (.*)', name.text_content().strip())
        first_name = username[1]
        last_name = username[2]

        phone = re.search(r'(Телефон: |Мобильный: )\n(.*?)\t', properties.text_content()).group(2).strip()
        phone = re.sub(r' |-| - ',  '', phone)
        if (phone[0] == '+'):
            city_code = phone[3:6]
            phone = phone[7:15]
        else:
            city_code = phone[2:5]
            phone = phone[6:14]

        prof = TBProfile(post = post_user,
                         subdivisions = area,
                         mail = mail,
                         image_url = image,
                         first_name = first_name,
                         last_name = last_name,
                         username = first_name,
                         city_code = city_code,
                         phone = phone)
        prof.save()
