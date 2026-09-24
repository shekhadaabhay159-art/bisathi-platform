import os
import re
from html.parser import HTMLParser

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_script = False
        self.in_style = False
        self.text = []

    def handle_starttag(self, tag, attrs):
        if tag in ['script', 'style', 'nav', 'header', 'footer']:
            self.in_script = True
        if tag in ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'li', 'tr']:
            self.text.append('\n')

    def handle_endtag(self, tag):
        if tag in ['script', 'style', 'nav', 'header', 'footer']:
            self.in_script = False
        if tag in ['p', 'h1', 'h2', 'h3', 'h4', 'li', 'tr']:
            self.text.append('\n')

    def handle_data(self, data):
        if not self.in_script:
            d = data.strip()
            if d:
                self.text.append(d + ' ')

def extract_file(path):
    if not os.path.exists(path):
        return ""
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    parser = TextExtractor()
    parser.feed(html)
    full_text = ''.join(parser.text)
    # Clean up blank lines
    lines = [l.strip() for l in full_text.split('\n') if l.strip()]
    return '\n'.join(lines)

overview = extract_file(r'C:\Users\Abhay\.gemini\antigravity-ide\brain\81cbd8e7-f230-4885-9596-e7dfd19fd002\.system_generated\steps\238\content.md')
process = extract_file(r'C:\Users\Abhay\.gemini\antigravity-ide\brain\81cbd8e7-f230-4885-9596-e7dfd19fd002\.system_generated\steps\240\content.md')
compulsory = extract_file(r'C:\Users\Abhay\.gemini\antigravity-ide\brain\81cbd8e7-f230-4885-9596-e7dfd19fd002\.system_generated\steps\242\content.md')
fee = extract_file(r'C:\Users\Abhay\.gemini\antigravity-ide\brain\81cbd8e7-f230-4885-9596-e7dfd19fd002\.system_generated\steps\244\content.md')

with open('knowledge/bis_product_certification_overview.txt', 'w', encoding='utf-8') as f:
    f.write(overview)

with open('knowledge/bis_product_certification_process.txt', 'w', encoding='utf-8') as f:
    f.write(process)

with open('knowledge/bis_compulsory_certification.txt', 'w', encoding='utf-8') as f:
    f.write(compulsory)

with open('knowledge/bis_certification_fees.txt', 'w', encoding='utf-8') as f:
    f.write(fee)

print("Saved official BIS extracted knowledge files:")
print("- knowledge/bis_product_certification_overview.txt")
print("- knowledge/bis_product_certification_process.txt")
print("- knowledge/bis_compulsory_certification.txt")
print("- knowledge/bis_certification_fees.txt")
