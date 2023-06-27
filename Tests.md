

## Test B

tab-separated, no header

do ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/omop/omop_atlas_webapi/iris/data/care_site.csv","{""from"":{""file"":{""header"":false,""skip"":0,""columnseparator"":""\t""},""filepath"":""/Users/rsingh/workspace/omop/omop_atlas_webapi/iris/data/care_site.csv""},""tablename"":""SQLUser.care_site"",""verbose"":1,""charset"":""utf-8""}")

Output:

06/26/2023 10:29:56 - INFO: Reading file '/Users/rsingh/workspace/omop/omop_atlas_webapi/iris/data/care_site.csv'
06/26/2023 10:29:56 - INFO: Read 200 nonempty lines for sampling
06/26/2023 10:29:56 - INFO: Parsing lines using supplied column separator '	'
06/26/2023 10:29:56 - INFO: No header in this file
06/26/2023 10:29:56 - ERROR: Unexpected error occured: ERROR #5002: ObjectScript error: <UNDEFINED>zScanFile+221^bdb.sql.InferSchema.1 *header


## Misc tests


### Look-up1

write ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/community/data/omop/1_Look-up1.csv","{""from"":{""file"":{""header"":true,""skip"":1,""columnseparator"":"";""},""filepath"":""/Users/rsingh/workspace/community/data/omop/1_Look-up1.csv""},""tablename"":""SQLUser.Look-up1"",""verbose"":0,""charset"":""utf-8""}")


### DOMAIN

write ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/community/data/omop/DOMAIN.csv","{""from"":{""file"":{""header"":true,""skip"":0,""columnseparator"":"",""}},""tablename"":""SQLUser.domain"",""verbose"":1,""charset"":""utf-8""}")


### care_site tab

write ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/community/data/omop/care_site.csv","{""from"":{""file"":{""header"":false,""skip"":0,""columnseparator"":""\t""},""filepath"":""/Users/rsingh/workspace/community/data/omop/care_site.csv""},""tablename"":""SQLUser.care_site_comma"",""verbose"":1,""charset"":""utf-8""}")

### care_site comma 

write ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/community/data/omop/care_site_comma.csv","{""from"":{""file"":{""header"":false,""skip"":0,""columnseparator"":"",""},""filepath"":""/Users/rsingh/workspace/community/data/omop/care_site_comma.csv""},""tablename"":""SQLUser.care_site_comma"",""verbose"":1,""charset"":""utf-8""}")

### Allergy1

write ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/community/data/omop/Allergy1.csv","{""from"":{""file"":{""header"":true,""skip"":1,""columnseparator"":"";""},""filepath"":""/Users/rsingh/workspace/community/data/omop/Allery1.csv""},""tablename"":""SQLUser.Allergy1"",""verbose"":0,""charset"":""utf-8""}")

### Test no header
write ##class(bdb.sql.InferSchema).InferColumnList("/Users/rsingh/workspace/community/data/test.csv","{""from"":{""file"":{""header"":false,""skip"":1,""columnseparator"":"",""},""filepath"":""/Users/rsingh/workspace/community/data/omop/test.csv""},""tablename"":""SQLUser.testcsv"",""verbose"":0,""charset"":""utf-8""}")
