/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
"use strict";define(["ojs/ojcore","jquery","ojs/ojdatasource-common"],function(t,e){t.ArrayTableDataSource=function(e,a){if(this.data=e||{},!(e instanceof Array)&&"function"!=typeof e&&"function"!=typeof e.subscribe){var r=t.TableDataSource._LOGGER_MSG._ERR_DATA_INVALID_TYPE_SUMMARY,i=t.TableDataSource._LOGGER_MSG._ERR_DATA_INVALID_TYPE_DETAIL;throw new Error(r+"\n"+i)}null!=a&&null!=a.idAttribute||t.Logger.info(t.ArrayTableDataSource._LOGGER_MSG._INFO_ARRAY_TABLE_DATASOURCE_IDATTR),t.ArrayTableDataSource.superclass.constructor.call(this,e,a),this._eventHandlers=[],this._rows={},null!=e&&void 0!==e&&(this._idAttribute=null,null!=a&&null!=a.idAttribute&&(this._idAttribute=a.idAttribute),this._data=e instanceof Array?e:e(),this._totalSize=this._data.length,this._subscribeObservableArray(e)),(null==a||"enabled"!=a.startFetch&&null!=a.startFetch)&&null!=a||(this._startFetchEnabled=!0)},t.Object.createSubclass(t.ArrayTableDataSource,t.TableDataSource,"oj.ArrayTableDataSource"),t.ArrayTableDataSource.prototype.comparator=null,t.ArrayTableDataSource.prototype.sortCriteria=null,t.ArrayTableDataSource.prototype.Init=function(){t.ArrayTableDataSource.superclass.Init.call(this)},t.ArrayTableDataSource.prototype.add=function(t,e){e=e||{},this._checkDataLoaded();var a=e.at;return this._addToRowSet(t,a,e)},t.ArrayTableDataSource.prototype.at=function(t,e){var a;return this._checkDataLoaded(),a=t<0||t>=this._rows.data.length?null:{data:this._rows.data[t],index:t,key:this._getId(this._rows.data[t])},new Promise(function(t,e){t(a)})},t.ArrayTableDataSource.prototype.change=function(e,a){a=a||{},this._checkDataLoaded();var r,i,s,n,o=a.silent,l={data:[],keys:[],indexes:[]};for(e instanceof Array||(e=[e]),r=0;r<e.length;r++)null!=(i=e[r])&&(s=this._getId(i),n=this._getInternal(s,!1),l.data.push(this._wrapWritableValue(i)),l.keys.push(s),l.indexes.push(n.index),this._rows.data[n.index]=i);return!o&&l.data.length>0&&t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.CHANGE,l),Promise.resolve(l)},t.ArrayTableDataSource.prototype.fetch=function(t){return"init"!=(t=t||{}).fetchType||this._startFetchEnabled?this._fetchInternal(t):Promise.resolve()},t.ArrayTableDataSource.prototype.get=function(t,e){return e=e||{},this._checkDataLoaded(),Promise.resolve(this._getInternal(t,!0))},t.ArrayTableDataSource.prototype.getCapability=function(t){return"full"},t.ArrayTableDataSource.prototype.remove=function(t,e){return e=e||{},this._checkDataLoaded(),this._removeInternal(t,e)},t.ArrayTableDataSource.prototype.reset=function(e,a){(a=a||{}).previousRows=this._rows;var r=a.silent;return null!=e&&(this._data=e,this._subscribeObservableArray(e),this.data=e),this._rows={},this._totalSize=0,r||t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.RESET,null),Promise.resolve()},t.ArrayTableDataSource.prototype.sort=function(e){null==e?e=this.sortCriteria:this.sortCriteria=e,this._checkDataLoaded();var a=this;return new Promise(function(r,i){e=e||{};var s=a._getComparator();a._rows.data.sort(function(e,r){return t.ArrayTableDataSource._sortFunc(e,r,s,a)}),a._sorted=!0;var n={header:e.key,direction:e.direction};t.TableDataSource.superclass.handleEvent.call(a,t.TableDataSource.EventType.SORT,n),r(n)})},t.ArrayTableDataSource.prototype.totalSize=function(){return this._totalSize},t.ArrayTableDataSource.prototype._addToRowSet=function(e,a,r){var i,s,n,o,l=(r=r||{}).silent,u={data:[],keys:[],indexes:[]};for(e instanceof Array||(e=[e]),null==a||a instanceof Array||(a=[a]),i=0;i<e.length;i++)if(null!=(n=e[i])){if(o=this._getId(n),u.data.push(this._wrapWritableValue(n)),u.keys.push(o),1==this._sorted&&this._rows.data.length>0){for(s=0;s<this._rows.data.length;s++){if(t.ArrayTableDataSource._sortFunc(n,this._rows.data[s],this._getComparator(),this)<0){this._rows.data.splice(s,0,n),u.indexes.push(s);break}if(s==this._rows.data.length-1){this._rows.data.push(n),u.indexes.push(s+1);break}}}else null==a?(this._rows.data.push(n),u.indexes.push(this._rows.data.length-1)):(this._rows.data.splice(a[i],0,n),u.indexes.push(a[i]));this._totalSize++,this._realignRowIndices()}return!l&&u.data.length>0&&t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.ADD,u),Promise.resolve(u)},t.ArrayTableDataSource.prototype._checkDataLoaded=function(){this._isDataLoaded()||(this.data instanceof Array||"function"!=typeof this.data||"function"!=typeof this.data.subscribe||(this._data=this.data()),this._rows=this._getRowArray(this._data),this._totalSize=this._data.length)},t.ArrayTableDataSource.prototype._isDataLoaded=function(){return null!=this._rows&&null!=this._rows.data},t.ArrayTableDataSource.prototype._fetchInternal=function(e){var a;e=e||{},this._startFetch(e),this._checkDataLoaded();try{a=e.pageSize>0?e.pageSize:-1,this._startIndex||(this._startIndex=0),this._startIndex=null==e.startIndex?this._startIndex:e.startIndex;var r,i,s,n=t.ArrayTableDataSource._getEndIndex(this._rows,this._startIndex,a),o=[],l=[];for(r=this._startIndex;r<=n;r++)i=this._getId(this._rows.data[r]),s=this._wrapWritableValue(this._rows.data[r]),o[r-this._startIndex]=s,l[r-this._startIndex]=i}catch(t){return this._endFetch(e,null,t),Promise.reject(t)}n<this._startIndex&&(this._startIndex=n+1),e.pageSize=a,e.startIndex=this._startIndex,e.refresh=!0;var u={data:o,keys:l,startIndex:this._startIndex};return this._endFetch(e,u,null),Promise.resolve(u)},t.ArrayTableDataSource.prototype._getInternal=function(t,a){var r,i,s,n,o=null;for(r=0;r<this._rows.data.length;r++)if(void 0!==(s=this._rows.data[r]))if(n=this._getId(s),e.isArray(n)&&e.isArray(t)){if(n.length==t.length){var l=!0;for(i=0;i<t.length;i++)if(n[i]!=t[i]){l=!1;break}if(l){o=a?{data:this._wrapWritableValue(s),key:n,index:this._rows.indexes[r]}:{data:s,key:n,index:this._rows.indexes[r]};break}}}else if(n==t){o=a?{data:this._wrapWritableValue(s),key:n,index:this._rows.indexes[r]}:{data:s,key:n,index:this._rows.indexes[r]};break}return o},t.ArrayTableDataSource.prototype._getComparator=function(){var t=this.comparator;if(null==t){var a=this.sortCriteria.key,r=this.sortCriteria.direction;"ascending"==r?t=function(t){return e.isFunction(t[a])?t[a]():t[a]}:"descending"==r&&(t=function(t,r){var i,s;return e.isFunction(t[a])?(i=t[a](),s=r[a]()):(i=t[a],s=r[a]),i===s?0:i>s?-1:1})}return t},t.ArrayTableDataSource.prototype._realignRowIndices=function(){for(var t=0;t<this._rows.data.length;t++)this._rows.indexes[t]=t},t.ArrayTableDataSource.prototype._removeInternal=function(e,a){var r,i,s,n,o=(a=a||{}).silent,l={data:[],keys:[],indexes:[]};e instanceof Array||(e=[e]);var u=[];for(r=0;r<e.length;r++)null!=(i=e[r])&&(s=this._getId(i),null!=(n=this._getInternal(s,!1))&&u.push({data:n.data,key:n.key,index:n.index}));for(u.sort(function(t,e){return t.index-e.index}),r=0;r<u.length;r++)l.data.push(u[r].data),l.keys.push(u[r].key),l.indexes.push(u[r].index);for(r=l.indexes.length-1;r>=0;r--)this._rows.data.splice(l.indexes[r],1),this._rows.indexes.splice(l.indexes[r],1),this._totalSize--;return this._realignRowIndices(),!o&&l.data.length>0&&t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.REMOVE,l),Promise.resolve(l)},t.ArrayTableDataSource.prototype._setRow=function(t,e){this._rows[t]=e,e.index=t},t.ArrayTableDataSource.prototype._startFetch=function(e){e.silent||t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.REQUEST,{startIndex:e.startIndex})},t.ArrayTableDataSource.prototype._endFetch=function(e,a,r){null!=r?t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.ERROR,r):e.silent||t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.SYNC,a)},t.ArrayTableDataSource.prototype._handleRowChange=function(e){e.startIndex=this._startIndex,t.TableDataSource.superclass.handleEvent.call(this,t.TableDataSource.EventType.CHANGE,e)},t.ArrayTableDataSource._compareKeys=function(t,e,a){if("descending"==a){if(t<e)return 1;if(e<t)return-1}else{if(t>e)return 1;if(e>t)return-1}return 0},t.ArrayTableDataSource._getEndIndex=function(t,e,a){var r=t.data.length-1;return a>0&&(r=(r=e+a-1)>t.data.length-1?t.data.length-1:r),r},t.ArrayTableDataSource._getKey=function(t,e){return"function"==typeof t[e]?t[e]():t[e]},t.ArrayTableDataSource.prototype._getRowArray=function(t){var e,a,r=t.length-1,i={};for(i.data=[],i.indexes=[],this._attributes=null,e=0;e<=r;e++){var s={},n=t[e];for(a in n)n.hasOwnProperty(a)&&(s[a]=n[a],0==e&&(null==this._attributes&&(this._attributes=[]),this._attributes.push(a)));i.data[e]=s,i.indexes[e]=e}return i},t.ArrayTableDataSource.prototype._getId=function(a){var r,i=this._getIdAttr(a);if(e.isArray(i)){var s;for(r=[],s=0;s<i.length;s++){if(!(i[s]in a)){var n=t.Translations.applyParameters(t.ArrayTableDataSource._LOGGER_MSG._ERR_ARRAY_TABLE_DATASOURCE_IDATTR_NOT_IN_ROW,[i[s]]);throw new Error(n)}r[s]=t.ArrayTableDataSource._getKey(a,i[s])}}else{if(!(i in a)){n=t.Translations.applyParameters(t.ArrayTableDataSource._LOGGER_MSG._ERR_ARRAY_TABLE_DATASOURCE_IDATTR_NOT_IN_ROW,[i]);throw new Error(n)}r=t.ArrayTableDataSource._getKey(a,i)}return r},t.ArrayTableDataSource.prototype._getIdAttr=function(t){if(null!=this._idAttribute)return this._idAttribute;var e;if(null==this._attributes)for(e in this._attributes=[],t)t.hasOwnProperty(e)&&this._attributes.push(e);return this._attributes.hasOwnProperty("id")?"id":this._attributes},t.ArrayTableDataSource._sortFunc=function(a,r,i,s){var n,o,l,u,c=s.sortCriteria.direction;if(e.isFunction(i)){if(1===i.length){n=i.call(s,a),o=i.call(s,r);var h=t.StringUtils.isString(n)?n.split(","):[n],d=t.StringUtils.isString(o)?o.split(","):[o];for(l=0;l<h.length;l++)if(0!==(u=t.ArrayTableDataSource._compareKeys(h[l],d[l],c)))return u;return 0}return i.call(s,a,r)}if(t.StringUtils.isString(i)){var _=i.split(",");for(l=0;l<_.length;l++)if(n=t.ArrayTableDataSource._getKey(a,_[l]),o=t.ArrayTableDataSource._getKey(r,_[l]),0!==(u=t.ArrayTableDataSource._compareKeys(n,o,c)))return u}return 0},t.ArrayTableDataSource.prototype._subscribeObservableArray=function(t){if(!(t instanceof Array)){var e=this;t.subscribe(function(t){if(e._isDataLoaded()){var a,r=[],i=[];for(a=0;a<t.length;a++)"deleted"===t[a].status&&r.push(t[a].value);for(e.remove(r,null),r=[],i=[],a=0;a<t.length;a++)"added"===t[a].status&&(r.push(t[a].value),i.push(t[a].index));e.add(r,{at:i})}},null,"arrayChange")}},t.ArrayTableDataSource.prototype._wrapWritableValue=function(e){var a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t.ArrayTableDataSource._defineProperty(r,e,i[a]);return r},t.ArrayTableDataSource._defineProperty=function(t,e,a){Object.defineProperty(t,a,{get:function(){return e[a]},set:function(t){e[a]=t},enumerable:!0})},t.ArrayTableDataSource._LOGGER_MSG={_INFO_ARRAY_TABLE_DATASOURCE_IDATTR:"idAttribute option has not been specified. Will default to using 'id' if the field exists. If not, will use all the fields.",_ERR_ARRAY_TABLE_DATASOURCE_IDATTR_NOT_IN_ROW:"Specified idAttribute {0} not in row data. Please ensure all specified idAttribute fields are in the row data or do not specify idAttribute and all fields will be used as id."}});