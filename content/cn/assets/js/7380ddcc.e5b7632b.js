"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[20539],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,s=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,b=p["".concat(s,".").concat(m)]||p[m]||d[m]||l;return n?a.createElement(b,i(i({ref:t},c),{},{components:n})):a.createElement(b,i({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=p;var o={};for(var s in t)hasOwnProperty.call(t,s)&&(o[s]=t[s]);o.originalType=e,o.mdxType="string"==typeof e?e:r,i[1]=o;for(var u=2;u<l;u++)i[u]=n[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},58215:function(e,t,n){var a=n(67294);t.Z=function(e){var t=e.children,n=e.hidden,r=e.className;return a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},26396:function(e,t,n){n.d(t,{Z:function(){return p}});var a=n(87462),r=n(67294),l=n(72389),i=n(79443);var o=function(){var e=(0,r.useContext)(i.Z);if(null==e)throw new Error('"useUserPreferencesContext" is used outside of "Layout" component.');return e},s=n(63616),u=n(86010),c="tabItem_vU9c";function d(e){var t,n,l,i=e.lazy,d=e.block,p=e.defaultValue,m=e.values,b=e.groupId,h=e.className,f=r.Children.map(e.children,(function(e){if((0,r.isValidElement)(e)&&void 0!==e.props.value)return e;throw new Error("Docusaurus error: Bad <Tabs> child <"+("string"==typeof e.type?e.type:e.type.name)+'>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.')})),g=null!=m?m:f.map((function(e){var t=e.props;return{value:t.value,label:t.label,attributes:t.attributes}})),k=(0,s.lx)(g,(function(e,t){return e.value===t.value}));if(k.length>0)throw new Error('Docusaurus error: Duplicate values "'+k.map((function(e){return e.value})).join(", ")+'" found in <Tabs>. Every value needs to be unique.');var v=null===p?p:null!=(t=null!=p?p:null==(n=f.find((function(e){return e.props.default})))?void 0:n.props.value)?t:null==(l=f[0])?void 0:l.props.value;if(null!==v&&!g.some((function(e){return e.value===v})))throw new Error('Docusaurus error: The <Tabs> has a defaultValue "'+v+'" but none of its children has the corresponding value. Available values are: '+g.map((function(e){return e.value})).join(", ")+". If you intend to show no default tab, use defaultValue={null} instead.");var y=o(),N=y.tabGroupChoices,T=y.setTabGroupChoices,w=(0,r.useState)(v),E=w[0],x=w[1],C=[],O=(0,s.o5)().blockElementScrollPositionUntilNextRender;if(null!=b){var _=N[b];null!=_&&_!==E&&g.some((function(e){return e.value===_}))&&x(_)}var S=function(e){var t=e.currentTarget,n=C.indexOf(t),a=g[n].value;a!==E&&(O(t),x(a),null!=b&&T(b,a))},A=function(e){var t,n=null;switch(e.key){case"ArrowRight":var a=C.indexOf(e.currentTarget)+1;n=C[a]||C[0];break;case"ArrowLeft":var r=C.indexOf(e.currentTarget)-1;n=C[r]||C[C.length-1]}null==(t=n)||t.focus()};return r.createElement("div",{className:"tabs-container"},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,u.Z)("tabs",{"tabs--block":d},h)},g.map((function(e){var t=e.value,n=e.label,l=e.attributes;return r.createElement("li",(0,a.Z)({role:"tab",tabIndex:E===t?0:-1,"aria-selected":E===t,key:t,ref:function(e){return C.push(e)},onKeyDown:A,onFocus:S,onClick:S},l,{className:(0,u.Z)("tabs__item",c,null==l?void 0:l.className,{"tabs__item--active":E===t})}),null!=n?n:t)}))),i?(0,r.cloneElement)(f.filter((function(e){return e.props.value===E}))[0],{className:"margin-vert--md"}):r.createElement("div",{className:"margin-vert--md"},f.map((function(e,t){return(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==E})}))))}function p(e){var t=(0,l.Z)();return r.createElement(d,(0,a.Z)({key:String(t)},e))}},79405:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return s},default:function(){return p},frontMatter:function(){return o},metadata:function(){return u},toc:function(){return c}});var a=n(87462),r=n(63366),l=(n(67294),n(3905)),i=(n(26396),n(58215),["components"]),o={title:"SQL DDL",summary:"In this page, we introduce how to create tables with Hudi.",toc:!0,last_modified_at:null},s=void 0,u={unversionedId:"table_management",id:"version-0.10.1/table_management",title:"SQL DDL",description:"The following are SparkSQL table management actions available:",source:"@site/versioned_docs/version-0.10.1/table_management.md",sourceDirName:".",slug:"/table_management",permalink:"/cn/docs/0.10.1/table_management",editUrl:"https://github.com/apache/hudi/tree/asf-site/website/versioned_docs/version-0.10.1/table_management.md",tags:[],version:"0.10.1",frontMatter:{title:"SQL DDL",summary:"In this page, we introduce how to create tables with Hudi.",toc:!0,last_modified_at:null},sidebar:"version-0.10.1/docs",previous:{title:"Concurrency Control",permalink:"/cn/docs/0.10.1/concurrency_control"},next:{title:"Writing Data",permalink:"/cn/docs/0.10.1/writing_data"}},c=[{value:"Spark Create Table",id:"spark-create-table",children:[{value:"Options",id:"options",children:[],level:3},{value:"Table Type",id:"table-type",children:[],level:3},{value:"Primary Key",id:"primary-key",children:[],level:3},{value:"PreCombineField",id:"precombinefield",children:[],level:3},{value:"Partitioned Table",id:"partitioned-table",children:[],level:3},{value:"Create Table for an External Hudi Table",id:"create-table-for-an-external-hudi-table",children:[],level:3},{value:"Create Table AS SELECT",id:"create-table-as-select",children:[],level:3},{value:"Set hoodie config options",id:"set-hoodie-config-options",children:[],level:3}],level:2},{value:"Spark Alter Table",id:"spark-alter-table",children:[{value:"Syntax",id:"syntax",children:[],level:3},{value:"Examples",id:"examples",children:[],level:3},{value:"Alter hoodie config options",id:"alter-hoodie-config-options",children:[],level:3},{value:"Use set command",id:"use-set-command",children:[],level:3}],level:2},{value:"Flink",id:"flink",children:[{value:"Create Table",id:"create-table",children:[],level:3},{value:"Alter Table",id:"alter-table",children:[],level:3}],level:2}],d={toc:c};function p(e){var t=e.components,n=(0,r.Z)(e,i);return(0,l.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"The following are SparkSQL table management actions available:"),(0,l.kt)("h2",{id:"spark-create-table"},"Spark Create Table"),(0,l.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,l.kt)("div",{parentName:"div",className:"admonition-heading"},(0,l.kt)("h5",{parentName:"div"},(0,l.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,l.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,l.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"note")),(0,l.kt)("div",{parentName:"div",className:"admonition-content"},(0,l.kt)("p",{parentName:"div"},"Only SparkSQL needs an explicit Create Table command. No Create Table command is required in Spark when using Scala or Python. The first batch of a ",(0,l.kt)("a",{parentName:"p",href:"/docs/writing_data"},"Write")," to a table will create the table if it does not exist."))),(0,l.kt)("h3",{id:"options"},"Options"),(0,l.kt)("p",null,"Users can set table options while creating a hudi table."),(0,l.kt)("table",null,(0,l.kt)("thead",{parentName:"table"},(0,l.kt)("tr",{parentName:"thead"},(0,l.kt)("th",{parentName:"tr",align:null},"Parameter Name"),(0,l.kt)("th",{parentName:"tr",align:null},"Description"),(0,l.kt)("th",{parentName:"tr",align:null},"(Optional/Required) : Default Value"))),(0,l.kt)("tbody",{parentName:"table"},(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"primaryKey"),(0,l.kt)("td",{parentName:"tr",align:null},"The primary key names of the table, multiple fields separated by commas."),(0,l.kt)("td",{parentName:"tr",align:null},"(Optional) : ",(0,l.kt)("inlineCode",{parentName:"td"},"id"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"type"),(0,l.kt)("td",{parentName:"tr",align:null},"The type of table to create (",(0,l.kt)("a",{parentName:"td",href:"/docs/table_types"},"read more"),"). ",(0,l.kt)("br",null)," ",(0,l.kt)("inlineCode",{parentName:"td"},"cow")," = COPY-ON-WRITE, ",(0,l.kt)("inlineCode",{parentName:"td"},"mor")," = MERGE-ON-READ."),(0,l.kt)("td",{parentName:"tr",align:null},"(Optional) : ",(0,l.kt)("inlineCode",{parentName:"td"},"cow"))),(0,l.kt)("tr",{parentName:"tbody"},(0,l.kt)("td",{parentName:"tr",align:null},"preCombineField"),(0,l.kt)("td",{parentName:"tr",align:null},"The Pre-Combine field of the table."),(0,l.kt)("td",{parentName:"tr",align:null},"(Optional) : ",(0,l.kt)("inlineCode",{parentName:"td"},"ts"))))),(0,l.kt)("p",null,'To set any custom hudi config(like index type, max parquet size, etc), see the  "Set hudi config section" .'),(0,l.kt)("h3",{id:"table-type"},"Table Type"),(0,l.kt)("p",null,"Here is an example of creating a COW table."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"-- create a non-primary key table\ncreate table if not exists hudi_table2(\n  id int, \n  name string, \n  price double\n) using hudi\noptions (\n  type = 'cow'\n);\n")),(0,l.kt)("h3",{id:"primary-key"},"Primary Key"),(0,l.kt)("p",null,"Here is an example of creating COW table with a primary key 'id'."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"-- create a managed cow table\ncreate table if not exists hudi_table0 (\n  id int, \n  name string, \n  price double\n) using hudi\noptions (\n  type = 'cow',\n  primaryKey = 'id'\n);\n")),(0,l.kt)("h3",{id:"precombinefield"},"PreCombineField"),(0,l.kt)("p",null,"Here is an example of creating an MOR external table. The ",(0,l.kt)("strong",{parentName:"p"},"preCombineField")," option\nis used to specify the preCombine field for merge."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"-- create an external mor table\ncreate table if not exists hudi_table1 (\n  id int, \n  name string, \n  price double,\n  ts bigint\n) using hudi\noptions (\n  type = 'mor',\n  primaryKey = 'id,name',\n  preCombineField = 'ts' \n);\n")),(0,l.kt)("h3",{id:"partitioned-table"},"Partitioned Table"),(0,l.kt)("p",null,"Here is an example of creating a COW partitioned table."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"create table if not exists hudi_table_p0 (\nid bigint,\nname string,\ndt string\uff0c\nhh string  \n) using hudi\noptions (\n  type = 'cow',\n  primaryKey = 'id',\n  preCombineField = 'ts'\n ) \npartitioned by (dt, hh);\n")),(0,l.kt)("h3",{id:"create-table-for-an-external-hudi-table"},"Create Table for an External Hudi Table"),(0,l.kt)("p",null,"You can create an External table using the ",(0,l.kt)("inlineCode",{parentName:"p"},"location")," statement. If an external location is not specified it is considered a managed table. You can read more about external vs managed tables ",(0,l.kt)("a",{parentName:"p",href:"https://sparkbyexamples.com/apache-hive/difference-between-hive-internal-tables-and-external-tables/"},"here"),".\nAn external table is useful if you need to read/write to/from a pre-existing hudi table."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"}," create table h_p1 using hudi \n options (\n    primaryKey = 'id',\n    preCombineField = 'ts'\n )\n partitioned by (dt)\n location '/path/to/hudi';\n")),(0,l.kt)("h3",{id:"create-table-as-select"},"Create Table AS SELECT"),(0,l.kt)("p",null,"Hudi supports CTAS(Create table as select) on spark sql. ",(0,l.kt)("br",null),"\n",(0,l.kt)("strong",{parentName:"p"},"Note:")," For better performance to load data to hudi table, CTAS uses ",(0,l.kt)("strong",{parentName:"p"},"bulk insert")," as the write operation."),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example CTAS command to create a non-partitioned COW table.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"create table h3 using hudi\nas\nselect 1 as id, 'a1' as name, 10 as price;\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example CTAS command to create a partitioned, primary key COW table.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"create table h2 using hudi\noptions (type = 'cow', primaryKey = 'id')\npartitioned by (dt)\nas\nselect 1 as id, 'a1' as name, 10 as price, 1000 as dt;\n")),(0,l.kt)("p",null,(0,l.kt)("strong",{parentName:"p"},"Example CTAS command to load data from another table.")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"# create managed parquet table \ncreate table parquet_mngd using parquet location 'file:///tmp/parquet_dataset/*.parquet';\n\n# CTAS by loading data into hudi table\ncreate table hudi_tbl using hudi location 'file:/tmp/hudi/hudi_tbl/' options ( \n  type = 'cow', \n  primaryKey = 'id', \n  preCombineField = 'ts' \n ) \npartitioned by (datestr) as select * from parquet_mngd;\n")),(0,l.kt)("h3",{id:"set-hoodie-config-options"},"Set hoodie config options"),(0,l.kt)("p",null,"You can also set the config with table options when creating table which will work for\nthe table scope only and override the config set by the SET command."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"create table if not exists h3(\n  id bigint, \n  name string, \n  price double\n) using hudi\noptions (\n  primaryKey = 'id',\n  type = 'mor',\n  ${hoodie.config.key1} = '${hoodie.config.value2}',\n  ${hoodie.config.key2} = '${hoodie.config.value2}',\n  ....\n);\n\ne.g.\ncreate table if not exists h3(\n  id bigint, \n  name string, \n  price double\n) using hudi\noptions (\n  primaryKey = 'id',\n  type = 'mor',\n  hoodie.cleaner.fileversions.retained = '20',\n  hoodie.keep.max.commits = '20'\n);\n")),(0,l.kt)("h2",{id:"spark-alter-table"},"Spark Alter Table"),(0,l.kt)("h3",{id:"syntax"},"Syntax"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"-- Alter table name\nALTER TABLE oldTableName RENAME TO newTableName\n\n-- Alter table add columns\nALTER TABLE tableIdentifier ADD COLUMNS(colAndType (,colAndType)*)\n\n-- Alter table column type\nALTER TABLE tableIdentifier CHANGE COLUMN colName colName colType\n")),(0,l.kt)("h3",{id:"examples"},"Examples"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"alter table h0 rename to h0_1;\n\nalter table h0_1 add columns(ext0 string);\n\nalter table h0_1 change column id id bigint;\n")),(0,l.kt)("h3",{id:"alter-hoodie-config-options"},"Alter hoodie config options"),(0,l.kt)("p",null,"You can also alter the write config for a table by the ",(0,l.kt)("strong",{parentName:"p"},"ALTER SERDEPROPERTIES")),(0,l.kt)("p",null,"Example:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"}," alter table h3 set serdeproperties (hoodie.keep.max.commits = '10') \n")),(0,l.kt)("h3",{id:"use-set-command"},"Use set command"),(0,l.kt)("p",null,"You can use the ",(0,l.kt)("strong",{parentName:"p"},"set")," command to set any custom hudi's config, which will work for the\nwhole spark session scope."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"set hoodie.insert.shuffle.parallelism = 100;\nset hoodie.upsert.shuffle.parallelism = 100;\nset hoodie.delete.shuffle.parallelism = 100;\n")),(0,l.kt)("h2",{id:"flink"},"Flink"),(0,l.kt)("h3",{id:"create-table"},"Create Table"),(0,l.kt)("p",null,"The following is a Flink example to create a table. ",(0,l.kt)("a",{parentName:"p",href:"/docs/flink-quick-start-guide"},"Read the Flink Quick Start")," guide for more examples."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE TABLE hudi_table2(\n  id int, \n  name string, \n  price double\n)\nWITH (\n'connector' = 'hudi',\n'path' = 's3://bucket-name/hudi/',\n'table.type' = 'MERGE_ON_READ' -- this creates a MERGE_ON_READ table, by default is COPY_ON_WRITE\n);\n")),(0,l.kt)("h3",{id:"alter-table"},"Alter Table"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-sql"},"alter table h0 rename to h0_1;\n")))}p.isMDXComponent=!0}}]);