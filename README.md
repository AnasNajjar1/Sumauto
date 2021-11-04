# Getting Started with Sumauto front App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Using Redux DevTools browser extension is highly recommend !


## Available Scripts

In the project directory, you can run:

### `npm run start:inMemory`

Runs the app in the development mode. standalone inMemory version.
Thats means no API are required, data is populated by fakes json stubs in ``app/src/redux/startupScript.ts``






### `npm start:staging`

connect to autobiz staging API
Runs the app in the development mode.


### `npm start:prod`

connect to autobiz prod API
Runs the app in the development mode.


## Run sumauto app iframe 


This project is built to be iframed by multiple clients websites.

V1 version has 3 clients :
- autocasion
- autoscout24
- unauto

You can simulate parents websites with clients interfaces[http://localhost:3000/tests.html](http://localhost:3000/tests.html) 


With inMemory mode, some fakes record are implemented and accessible :

1. A record **without appointment** (uid: "aaa")
   
direct link :
http://localhost:3000/autocasion/sale/record/aaa
or iframed page
http://localhost:3000/autocasion-sale.html?sif_page=record&sif_recordUid=aaa

2. A record **with appointment** (uid: "bbb")
   
direct link :
http://localhost:3000/autocasion/sale/record/bbb
or iframed page
http://localhost:3000/autocasion-sale.html?sif_page=record&sif_recordUid=bbb


3. An **expired** record (uid: "ccc")
   
direct link :
http://localhost:3000/autocasion/sale/record/ccc
or iframed page
http://localhost:3000/autocasion-sale.html?sif_page=record&sif_recordUid=ccc

4. An record with an **unquotable vehicle** (uid: "ddd")
   
direct link :
http://localhost:3000/autocasion/sale/record/ddd
or iframed page
http://localhost:3000/autocasion-sale.html?sif_page=record&sif_recordUid=ddd


## Files architecture

This project is influenced by the clean architecture : 

https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html


**UseCases** : The purpose of a use case is to serve a user's use case of the system. For example, "turn light on" or "send email to tenant".

**Gateways** : The responsibility of a gateway is to adapt an IO mechanism for your Use Cases.


---

# Client integration setup (unauto / autocasion / autoscout24)

Sumauto iframes are autoresized iframes using [iFrame Resizer V4 library](https://github.com/davidjbradshaw/iframe-resizer) and enable automatic height resizing.

Each site should have 2 landing pages, each landing pages will host a sumauto iframe with some parameters.


Warning : Landing pages should not have a fixed header (css position: fixed)

#Installation : 

#### HTML iframe code
in your HTML code insert this code where you want to intergrate the iframe with an unique HTML id attribute (for exemple : "sumauto_iframe").
```
<iframe id="YOUR_IFRAME_ID"></iframe>
```
You can add CSS style to your this iframe, selecting the id or adding a class to this iframe. 

> The iframe is resizeable, that means you should not restrict the height of the iframe with directive like height or max-height. 

> The iframe has per default 100% width. it will have the same width as his parent container.

For exemple, the ``#sumauto_iframe`` will have 980px with the code below
```
<style type="text/css">.container{width:980px;}</style>
<div class="container">
    <iframe id="sumauto_iframe"></iframe>
</div>
```

#### Javascript iframe code
insert the sumauto script  just before your  ``</body>`` closing tag

```
<script src="https://sumauto.autobiz.com/parentIframe.js"></script></div>
<script>
    launchIframe('sumauto_iframe','https://sumauto.autobiz.com/YOUR-IDENTIFIER', 'JOURNEY-TYPE');
</script>
```

parameter | Type | Required | Accepted values
------ | ---- | ------- | -----------
YOUR-IDENTIFIER | string | true |  "autoscout24" or "autocasion" or "unoauto" 
JOURNEY-TYPE |  string | true | "sale" or "valuation" 



For exemple autocasion has 2 Landing pages, 

- one with the valuation journey

```
<html>
    <body>
        <iframe id="sumauto_iframe"></iframe>
        <script src="https://sumauto.autobiz.com/parentIframe.js"></script></div>
        <script>
            launchIframe('sumauto_iframe','https://sumauto.autobiz.com/autoscout24','valuation');
        </script>
    </body>
</html>
```

- one with the sale journey

```
<html>
    <body>
        <iframe id="sumauto_iframe"></iframe>
        <script src="https://sumauto.autobiz.com/parentIframe.js"></script></div>
        <script>
            launchIframe('sumauto_iframe','https://sumauto.autobiz.com/autoscout24','sale');
        </script>
    </body>
</html>
```


### Others pages

During the worflow, emails will be sent to the users with direct urls to particular steps of the iframe

- ``YOUR_LP_URL?sif_page=unsubscribe`` will redirect to the unsubscribe page
- ``YOUR_LP_URL?sif_page=record&sif_recordUid=RECORD_UID`` will redirect to the record page (confirmation page or appointment page, ... according to the record state)

### Landing pages exemples

Landing pages exemple can be found temporary at this url
https://sumauto.autobiz.com/tests.html