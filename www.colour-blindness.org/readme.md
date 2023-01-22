# Visionary website

The Visionary project aims to find solutions to fix colors problems on the web. Currently the project put on the table 2 solutions : a Chrome extension and a guide for webdesigners.

This is the repository of the end-users website of the project.

This website is currently available here https://colour-blindness.org/

All information about Visionary: https://github.com/visionary-be/visionary 

## License : GNU General Public License v3.0
[Read the license](./COPYING).

## Installation

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


### Prerequisites

* **Backend** : the website is made in PHP with the MVC framework [FatFree](https://fatfreeframework.com/3.6/home)
* **Frontend** : the website is made with the CSS Framework [UIKit(v2)](https://getuikit.com/) (compile in SCSS)

```
Check the folder `./src`
```

### Installing

* Update/install FatFree

```
In the folder `./src`  :  `composer update `
```
* Launch Gulp

```
1. Locally go to the root folder of the repository `cd ~/path/to/folder`
2. Install Gulp `npm install gulp -g`
3. Install Gulp locally `npm install gulp --save-dev`
4. Instal specific modules (check the gulfile.js for more info) `npm install --save-dev`
5. Launch Gulp (will create a fresh version of the website into the /build folder and will launch browsersync) `gulp`
```

## Running the tests

Just save files, Gulp will look at the changes and compile a fresh version into the /build folder


## Deployment

Add a file called `project.json` on the root and add the lines :

```
{
	"project_name": "Visionary Website",
	"project_slug": "visionary-website",
	"mamp_install": "visionary.loc",
	"src_dir": "src/",
	"build_dir": "build/",

	"___comment": "// The git branch to commit to",
	"git_branch": "development",

	"___comment": "// ",
	"git_token" : "",

	"___comment": "// FTP for deployment",
	"ftp_host" : "myhost",
	"ftp_port" : "",
	"ftp_user": "username",
	"ftp_pass": "password",
	"ftp_remote_path": "www/to/path/public/"
}
```

Fill in fields for the FTP deployment. Then release.

```
`gulp release`
```

## Built With

* [FatFree](http://www.dropwizard.io/1.0.2/docs/) - MVC Framework
* [UIKit](https://maven.apache.org/) - CSS Framework
* [Gulp](https://gulpjs.com/) - A toolkit for automating tasks in your development workflow

## Authors

* **Alexandre Plennevaux** - *Coordinator, developer*
* **Saria Hatoum** - *Developer*
* **Benoit Vanderose** - *Developer*
* **Benoit Vrins** - *UX/UI Designer*

See also the list of [partners](https://www.colour-blindness.org/about) who participated in this project.
