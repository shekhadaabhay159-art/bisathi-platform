import re

with open(r'C:\Users\Abhay\.gemini\antigravity-ide\brain\81cbd8e7-f230-4885-9596-e7dfd19fd002\.system_generated\steps\210\content.md', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

matches = re.findall(r'href=["\'](https?://[^"\']+)["\']', text)
cert_links = set()
for m in matches:
    if any(k in m.lower() for k in ['product-certification', 'scheme', 'conformity', 'fmcs', 'crs']):
        cert_links.add(m)

print(f"Certification related links ({len(cert_links)}):")
for l in sorted(cert_links):
    print(l)
