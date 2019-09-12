
import unittest
import os
import sys
import re
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support import expected_conditions as Expected
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import WebDriverWait

BaseURL = os.environ.get('BaseURL')

class ChromeSpec(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        options = Options()
        options.add_argument('-headless')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--no-sandbox')
        cls.driver = Chrome(executable_path='/usr/local/bin/chromedriver', options=options)
        cls.driver.implicitly_wait(10)

    @classmethod
    def classTearDown(cls):
        cls.driver.quit()

    def waitOnHeader(self):
        # Need to wait for the header to finish loading/wrapping the content. Otherwise a div
        # will cover links and throw a click exception. Unfortunately, this will
        # be sensitive to changes in https://github.com/ndlib/drapes
        try:
            WebDriverWait(self.driver, 10).until(Expected.presence_of_element_located((By.CLASS_NAME, "hesburgh-wrapped")))
        except TimeoutException:
            self.fail("Timed out waiting for header to load")

    def test_home_link(self):
        driver = self.driver
        driver.get(BaseURL + '/')

        self.waitOnHeader()

        found_element = driver.find_element_by_link_text('Maps and Plans Collection')
        found_element.click()

        self.assertEqual(driver.current_url, BaseURL + '/')


    def test_search_content(self):
        driver = self.driver
        driver.get(BaseURL + '/')

        self.waitOnHeader()

        found_element = driver.find_element_by_id('search')
        found_element.click()

        found_content = driver.find_element_by_id('content')
        self.assertEqual(driver.current_url, BaseURL + '/?utf8=%E2%9C%93&search_field=all_fields&q=')


suite = unittest.TestLoader().loadTestsFromTestCase(ChromeSpec)
result = unittest.TextTestRunner(verbosity=2).run(suite)
sys.exit(not result.wasSuccessful())
