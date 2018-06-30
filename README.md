## Hydra version 0.0.1-alpha
Hydra is the Content Management System (CMS) for the data layer that can be used on the Interplanetary File System (IPFS).

## Installation

This program requires Node 6+, or any higher version.

Download Hydra
```
git clone https://github.com/tjappo/hydra-cms.git && cd hydra-cms
```

Install dependencies
```
npm install
```

Build the files
```
npm run build
```

## Installation on IPFS

Edit the `dist/index.html` file by adding this to the `<head>` tag 

```
<!--- Base Tag -->
<script>
    var base = '';
    var parts = window.location.pathname.split('/');
    parts.forEach(function(part, pos){
        if (part === 'ipfs' || part === 'ipns') {
            base = parts.slice(0, pos+2).join('/');
        }
    });
    document.write('<base href="'+ base + '/" />');
</script>
```

Edit all `/static` paths to relative `./static` paths

Upload the `dist` folder to Phantom   

## Usage

Open `index.html`, and start using the program.

## Authors
- Jasper Hu (Shift Team)

## License

Copyright © 2018 Shift

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/ShiftNrg/hydra/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.
