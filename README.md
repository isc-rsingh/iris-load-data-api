# IRIS Data Loading app and REST API

This application facilitates CSV file input into IRIS and IRIS for Health, providing a front-end client to the LOAD DATA SQL command. Takes as input a CSV file, infers data types, and allows the user to edit column names and data types.

The repository includes an Angular application and a data loading REST API that uses <a href="https://github.com/bdeboe/isc-sql-utils">IRIS SQL Utilities</a> for introspecting CSV files.

> **Warning**
> This only works for CSV files on the same file system as IRIS itself. Uploading the CSV file to a remote server is a desired future feature.

## Application Installation

- Edit `src/environments/environments.ts` to match your install of the <a href="https://github.com/isc-rsingh/iris-load-data-api">data loading REST API</a>
- Execute `ng build` (if needed, <a href="https://angular.io/guide/setup-local">set up Angular</a>)
- If installing in IRIS...
  - go into dist/proto folder and make sure base reads as follows:
  ```
  <base href="/csp/dataloadapp/">
  ```
  - in an IRIS session, run `zpm install <path to this directory>`, or set up a CSP application in IRIS and copy all files in the `dist/proto` directory to that location.
- If installing in an external web server...
  - copy all files in the `dist/proto` directory to the web server

## REST endpoints

### POST /columns

Returns a list of column names with data types using  https://github.com/bdeboe/isc-sql-utils to infer the schema.

Example body:
```json
{
    "from": {
        "file": {
            "path": "/Users/rsingh/Downloads/iris.csv",
            "columnseparator": "\t"
        }
    },
    "verbose": 1,
    "readlines": 0
}
```

### POST /createtable
    
Takes the <code>fields</code> object of a JSON configuration file into an InterSystems IRIS <code>CREATE TABLE</code> statement and executes it.

Example body:
```json
{
  "tablename": "SQLUser.dataexport",
  "fields": [
    {
      "srcname": "care_site_id",
      "type": "BIGINT",
      "length": 0
    },
    {
      "srcname": "care_site_name",
      "type": "VARCHAR",
      "length": "1"
    },
    {
      "srcname": "place_of_service_concept_id",
      "type": "BIGINT",
      "length": 0,
      "destdatatype": "INT"
    },
    {
      "srcname": "location_id",
      "type": "VARCHAR",
      "length": "1"
    },
    {
      "srcname": "care_site_source_value",
      "type": "VARCHAR",
      "length": "11"
    },
    {
      "srcname": "place_of_service_source_value",
      "type": "VARCHAR",
      "length": "48"
    }
  ]
}
```

### POST /load

Munges a JSON configuration file into an InterSystems IRIS 
<code><a href="https://docs.intersystems.com/irislatest/csp/docbook/DocBook.UI.Page.cls?KEY=RSQL_loaddata">LOAD DATA</a></code> statement and executes it.

Example body:
```json
{
  "from": {
    "file": {
      "header": true,
      "skip": 0,
      "columnseparator": ","
    },
    "filepath": "/Users/rsingh/Downloads/dataexport.csv"
  },
  "tablename": "SQLUser.dataexport",
  "verbose": 0,
  "charset": "UTF-8",
  "fields": [
    {
      "srcname": "care_site_id",
      "type": "BIGINT",
      "length": 10,
      "destname": "caresiteid",
      "destdatatype": "INT"
    }
  ]
}
```
