# Benpai Web Utilities (webutils)

## What is webutils?

webutils is a simple, minimal-dependency package that provides utilities for web development. It is designed to be a simple, easy-to-use package that provides a variety of utilities for web development.

> [!IMPORTANT]
> This package is still in development, and is not yet ready for production use. Use at your own risk.
>
> This package also lacks error handling in some areas, and may not work as expected in all cases.
>
> Future versions may include more features, and simplify the process of setting up the system.

## Installation

```bash
npm install @therealbenpai/webutils
```

## Usage

There are mutiple classes that are available to be used.

The main code is housed in [index.js](./index.js).

The type definitions are housed in [defs.d.ts](./@types/defs.d.ts).

## Contributing

To contribute to the project, do the following steps:

First, you need to install [Node.js](https://nodejs.org/) and [npm](https://npmjs.com).

To install node, run the following command:

Windows:

```powershell
# Install Git
winget install --id Git.Git -e --source winget

# Install Node.js
Set-ExecutionPolicy Bypass -Scope Process -Force;
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072;
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'));
choco install nodejs
```

MacOS:

```bash
brew install node npm git
```

Linux:

```bash
# Ubuntu
sudo apt update
sudo apt install nodejs npm git -y
# Fedora / Red Hat
sudo dnf install nodejs npm git -y
# Arch
sudo pacman -Sy nodejs npm git
# openSUSE
sudo zypper install nodejs npm git -y
# CentOS
sudo yum install nodejs npm git -y
```

Then, clone the repository and run the following commands:

```bash
# cloning the repository
git clone "https://github.com/therealbenpai/WebUtils.git"
cd zdcors
```

In your Javascript file, simply add the following code to be able to access the package:

```javascript
const WebUtils = require('@therealbenpai/webutils');
```
