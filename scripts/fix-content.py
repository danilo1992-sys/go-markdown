#!/usr/bin/env python3
import os, glob

for f in glob.glob('src/content/*.md'):
    name = os.path.basename(f)
    new_name = name
    for ch in ['¿', '?', 'á', 'é', 'í', 'ó', 'ú', 'ñ', 'Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ']:
        new_name = new_name.replace(ch, '')
    new_name = ' '.join(new_name.split())
    if new_name != name:
        os.rename(f, os.path.join('src/content', new_name))
        print(f'Renamed: {name} -> {new_name}')

# Clean Modulo Time frontmatter
mod_file = 'src/content/Modulo Time.md'
if os.path.exists(mod_file):
    with open(mod_file, 'r') as fh:
        lines = fh.readlines()
    cleaned = [l for l in lines if not any(l.startswith(p) for p in ['id:', 'aliases:', '  - ', 'tags:'])]
    with open(mod_file, 'w') as fh:
        fh.writelines(cleaned)
    print('Cleaned Modulo Time.md frontmatter')
