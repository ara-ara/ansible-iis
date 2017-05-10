# Ansible IIS Webserver Demo

## Purpose
The code within is divided into two section. First is a simple PHP based website that retrieves user input regarding website information. This info is grabbed, written to a YAML file, and then passed to Ansible which handles the actual logic of setting up the web server. The Ansible output is written to a `test/results/output`. It can be checked for any inconsistencies.

## How To Use
Once the website is availble on a Unix box, users will be greeted with a form to create a new site. It will look as follows:
<div style="text-align:center"><a href="img/website_initial.png" alt="website_initial"></a></div>
## Limitations
The Ansible code assumes a particular destination server currently. Thus, the hosts file and group_vars files must be altered to run this playbook on a different server.

Additionally, some of the website seems to have issues in Chrome but works fine in Firefox. I've not yet made it cross platform. Please be sure to use Firefox for now.

## Future Work
1. Currently the website does not offer highly restrictive form monitoring to guarantee an acceptable YAML file is produced. Checking for valid input is a need in the future.
2. The current implementation does not involve server creation itself. In the future this could be attached to a Cloud Formation template to both deploy a server and configure the IIS Webserver on the box itself.
3. There are arguably some areas to improve efficiency. The website for example could process more things server side rather than client side via JavaScript. 
4. The Ansible code currently uses a few work arounds as the Windows management modules are not fully featured yet. It would be preferable to switch to supported modules in the future when they can accommodate the same tasks.