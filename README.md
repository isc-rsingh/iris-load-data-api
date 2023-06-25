# IRIS LOAD DATA REST API

REST API for loading data into InterSystems IRIS.

Depends upon https://github.com/bdeboe/isc-sql-utils for introspecting CSV files

## Key endpoints

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