/// REST API for loading data into InterSystems IRIS.
/// Depends upon https://github.com/bdeboe/isc-sql-utils for introspecting CSV files
Class rsingh.sqlutil.SqlUtil Extends %CSP.REST
{

Parameter HandleCorsRequest = 1;

Parameter CONTENTTYPE = "application/json";

XData UrlMap [ XMLNamespace = "http://www.intersystems.com/urlmap" ]
{
<Routes>
    <Route Url="/columns" Method="POST" Call="InferColumnList" />
    <Route Url="/createtable" Method="POST" Call="CreateTable" />
    <Route Url="/load" Method="POST" Call="LoadData" />
</Routes>
}

/// Returns a list of column names with data types using
/// https://github.com/bdeboe/isc-sql-utils to infer the schema.
/// Example body:
/// {
///     "from": {
///         "file": {
///             "path": "/Users/rsingh/Downloads/iris.csv",
///             "columnseparator": "\t"
///         }
///     },
///     "verbose": 1,
///     "readlines": 0
/// }
ClassMethod InferColumnList()
{
    set obj = ##class(%DynamicObject).%FromJSON(%request.Content)
    if obj.%Get("from").%IsDefined("filepath") {
        set path = obj.%Get("from").%Get("filepath")
        #; set params = %JSON.Formatter.FormatToString(%request.Content, .params)
        #; write { "params": (params)}.%ToJSON()
        set collist = ##class(bdb.sql.InferSchema).InferColumnList(path, obj)
        #; make the column listing into a nice JSON object
        set resp = []
        set collb = $LISTFROMSTRING(collist, ",")
        set ptr=0
        while $LISTNEXT(collb, ptr, val) {
            set v = {}
            set v.srcname = $PIECE($zstrip(val, "<>W"), " ", 1)
            set type = $PIECE($zstrip(val, "<>W"), " ", 2)
            #; if type has (
            if $FIND(type, "(") {
                set v.type = $PIECE(type, "(", 1)
                set v.length = $PIECE($PIECE(type, "(", 2), ")", 1)
            }
            else {
                set v.type = type
                set v.length = 0
            }
            do resp.%Push(v)
        }

        write {"fields": (resp)}.%ToJSON()
    }
    else {
        set %response.Status = ..#HTTP400BADREQUEST
        write {"error": "Missing path"}.%ToJSON()
    }
    Quit $$$OK
}

/// Munges a JSON configuration file into an InterSystems IRIS
/// <code><a href="https://docs.intersystems.com/irislatest/csp/docbook/DocBook.UI.Page.cls?KEY=RSQL_loaddata">LOAD DATA</a></code>
/// statement and executes it.
ClassMethod LoadData()
{
    set obj = ##class(%DynamicObject).%FromJSON(%request.Content)
    if obj.%Get("from").%IsDefined("filepath") {
        set fields = obj.%Get("fields")
        set tablename = obj.%Get("tablename")
        set path = obj.%Get("from").%Get("filepath")
        set cmd = "LOAD BULK DATA FROM FILE '"_path_"'"
        set cmd = cmd_" COLUMNS ("_..getColumns(fields, 1, 0)_")"
        set cmd = cmd_" INTO "_tablename_" ("_..getColumns(fields, 0, 1)_")"
        set cmd = cmd_" VALUES ("_..getColumns(fields, 0, 0)_")"
        set cmd = cmd_" USING '"_obj.%ToJSON()_"'"
        #; write {"sql": (cmd)}.%ToJSON()
        set rs = ##class(%SQL.Statement).%ExecDirect(, cmd)
        if rs.%SQLCODE '= 0 {
            set %response.Status = ..#HTTP500INTERNALSERVERERROR
            write {"error": (rs.%Message)}.%ToJSON()
            #; write {"error": {"error": (rs.%Message), "status": "internal server error", "statusText": "internal server error"}}.%ToJSON()
        }
        else {
            write {"response": { "status": 0, "message": ("Data loaded into "_tablename)}}.%ToJSON()
        }
    }
    else {
        set %response.Status = ..#HTTP400BADREQUEST
        write {"error": "Missing path"}.%ToJSON()
    }
    Quit $$$OK
}

/// Munges the <code>fields</code> object of a JSON configuration file into an
/// InterSystems IRIS <code>CREATE TABLE</code> statement and executes it.
ClassMethod CreateTable()
{
    set obj = ##class(%DynamicObject).%FromJSON(%request.Content)
    if obj.%IsDefined("fields") & obj.%IsDefined("tablename") {
        #; create CREATE TABLE command
        set fields = obj.%Get("fields")
        set tablename = obj.%Get("tablename")
        set sql = "CREATE TABLE "_tablename_" ("
        set sourcecols = ..getColumns(fields, 1, 1)
        set sql = sql_sourcecols_")"
        #; execute CREATE TABLE command
        #; write {"sql": (sql)}.%ToJSON()
        set rs = ##class(%SQL.Statement).%ExecDirect(, sql)
        if rs.%SQLCODE '= 0 {
            set %response.Status = ..#HTTP500INTERNALSERVERERROR
            set m = rs.%Message
            write {"error": (rs.%Message)}.%ToJSON()
            #; write {"error": {"error": (m), "status": (rs.%SQLCODE), "statusText": "internal server error"}}.%ToJSON()
            #; write {"sql": (sql)}.%ToJSON()
        }
        else {
            write {"response": { "status": 0, "message": ("Table "_tablename_" created")}}.%ToJSON()
        }
    }
    else {
        set %response.Status = ..#HTTP400BADREQUEST
        write {"error": "Missing fields and/or destination table name"}.%ToJSON()
    }
    Quit $$$OK
}

/// Transforms the fields object of a JSON configuration file into
/// a comma-separated list of column names and optional, data types with constraints.
ClassMethod getColumns(fields As %DynamicObject, includetype = 0, dest = 0) As %String
{
    set colspecs = ""
    set i = fields.%GetIterator()
    while i.%GetNext(.key, .value) {
        set colspec = ", "
        set name = value.%Get("srcname")
        if dest {
            if value.%IsDefined("destname") set name = value.%Get("destname")
        }
        set colspec = colspec_name
        if includetype {
            set type = value.%Get("type")
            if dest {
                if value.%IsDefined("destdatatype") set type = value.%Get("destdatatype")
            }
            if value.%Get("length") set type = type_"("_value.%Get("length")_")"
            set colspec = colspec_" "_type
        }
        set colspecs = colspecs_colspec
    }
    Quit $EXTRACT(colspecs, 3, $LENGTH(colspecs))
}

}
