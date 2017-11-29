# MB Bot Api

A node.js application that handles the actions as triggered by DialogFlow.

## Overview

Intents in DialogFlow have an action. This backend will listen for a fullfillment call from DialogFlow. 
Based on the valus of the action it will perform the appropriate action on MB backend.


## Setup

* Unzip in desired location
* Application requires [node.js](https://nodejs.org/en/)
* Install package dependencies by calling 
```shell
npm install
```
* Environment variables:
    * **MB_HOSTNAME** Hostname of the MB ConversationAPI (Defaults to "http://dev.milkbasket.com")
* Start by calling 
```shell
npm start
```
* Import the zipfile containing the bot settings in DialogFlow
* Set endpoint for fullfillment in DialogFlow to \_hostname\_/api/order
* Connect the DialogFlow bot to facebook as described in https://dialogflow.com/docs/integrations/facebook

