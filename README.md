# Fare Calculation System

This TypeScript-based fare calculation system implements a metro fare engine for the fictional MoysterCard payment system. The solution calculates commuter fares based on zone travel patterns, peak/off-peak timing, and intelligent capping rules.

The system processes journey data containing timestamps and zone information, applying business rules for peak hours (weekdays 7:00-10:30 & 17:00-20:00, weekends 9:00-11:00 & 18:00-22:00) with different fare structures for zone combinations 1-1, 1-2, and 2-2.

## How to Run
Install Dependencies
Run ```npm install``` to install all required packages.


Run Calculation
Use ```npm start``` to calculate fares from your journey data.


## Input Requirements
Create a ```journeys.json``` file in the root directory with your journey data.

Each journey should include:

dateTime: The journey timestamp in ISO format

fromZone: Starting zone (1 or 2)

toZone: Destination zone (1 or 2)

## Testing
Run Test Suite
Execute ```npm test``` to run the test suite.



