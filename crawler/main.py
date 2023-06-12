import time
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import os


def download_images(keyword, num_images):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
    }

    # URL
    url = f'https://www.google.com/search?q={keyword}&tbm=isch'

    # 配置ChromeDriver
    chrome_driver_path = './chromedriver.exe'
    driver = webdriver.Chrome(chrome_driver_path)
    driver.get(url)
    time.sleep(2)

    # 滚动页面
    count = 0
    while count < num_images:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        scroll_height_new = driver.execute_script("return document.body.scrollHeight;")

        # 获取页面中的图片元素
        img_elements = driver.find_elements_by_css_selector('img')

        for img_element in img_elements:
            img_url = img_element.get_attribute('src')

            if img_url and 'http' in img_url and 'google' not in img_url:
                try:
                    # 发送请求下载图片
                    response = requests.get(img_url, headers=headers)

                    # 构建保存路径和文件名
                    img_path = f'./street/'
                    if not os.path.exists(img_path):
                        os.makedirs(img_path)

                    filename = f'{img_path}/{count + 1}.jpg'

                    # 保存图片到本地
                    with open(filename, 'wb') as f:
                        f.write(response.content)

                    print(f'Downloaded image: {filename}')

                    count += 1
                    if count == num_images:
                        break

                except Exception as e:
                    print(f'Error downloading image: {img_url}')
                    print(str(e))

    driver.quit()


if __name__ == '__main__':
    keyword = 'street'
    num_images = 30

    download_images(keyword, num_images)