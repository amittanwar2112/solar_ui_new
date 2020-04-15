import requests

links = (  ('theme.css', 'https://www.solarpro.online/assets/stylesheets/theme.css'),  
        ('default.css', 'https://www.solarpro.online/assets/stylesheets/skins/default.css'),     
        ('theme.css', 'https://www.solarpro.online/assets/stylesheets/theme.css'),
        ('default.css', 'https://www.solarpro.online/assets/stylesheets/custom.css'),
        ('custom.css', 'https://www.solarpro.online/assets/stylesheets/custom.css'),
        ('modernizr.js', 'https://www.solarpro.online/assets/vendor/modernizr/modernizr.js'),
        ('tui-time-picker.css', 'https://www.solarpro.online/assets/stylesheets/tui-time-picker.css')
        )



if __name__ == "__main__":
    for link in links:
        file_name = link[0]
        url       = link[1]

        response = requests.get(url)
        content  = response.content
        content  = str(content)

        with open(file_name, 'w') as file:
            file.write(content) 

#  sudo apt-get install python-pip
#  pip install requests

